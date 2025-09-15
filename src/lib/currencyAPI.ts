'use client';

interface ExchangeRateResponse {
  base: string;
  rates: Record<string, number>;
  date: string;
}

interface CurrencyAPIResponse {
  success: boolean;
  data: ExchangeRateResponse;
  error?: string;
}

class CurrencyAPI {
  private static instance: CurrencyAPI;
  private cache: Map<string, { data: ExchangeRateResponse; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

  static getInstance(): CurrencyAPI {
    if (!CurrencyAPI.instance) {
      CurrencyAPI.instance = new CurrencyAPI();
    }
    return CurrencyAPI.instance;
  }

  private apis = [
    {
      name: 'ExchangeRate-API',
      url: (base: string) => `https://api.exchangerate-api.com/v4/latest/${base}`,
      transform: (data: any, baseCode?: string) => ({
        base: data.base,
        rates: data.rates,
        date: data.date
      })
    },
    {
      name: 'Fixer.io',
      url: (base: string) => `https://api.fixer.io/latest?base=${base}`,
      transform: (data: any, baseCode?: string) => ({
        base: data.base,
        rates: data.rates,
        date: data.date
      })
    },
    {
      name: 'CurrencyAPI',
      url: (base: string) => `https://api.currencyapi.com/v3/latest?apikey=YOUR_API_KEY&base_currency=${base}`,
      transform: (data: any, baseCode?: string) => ({
        base: baseCode || data.base,
        rates: Object.fromEntries(
          Object.entries(data.data).map(([key, value]: [string, any]) => [key, value.value])
        ),
        date: new Date().toISOString().split('T')[0]
      })
    }
  ];

  private fallbackRates: Record<string, Record<string, number>> = {
    USD: {
      EUR: 0.85,
      GBP: 0.73,
      JPY: 110.0,
      CAD: 1.25,
      AUD: 1.35,
      CHF: 0.92,
      CNY: 6.45,
      INR: 74.5,
      BRL: 5.2,
      KRW: 1180.0,
      MXN: 20.5,
      SGD: 1.35,
      NZD: 1.42,
      ZAR: 14.8,
      SEK: 8.6,
      NOK: 8.8,
      DKK: 6.3,
      PLN: 3.9,
      CZK: 21.5,
      HUF: 295.0
    }
  };

  private getCacheKey(base: string): string {
    return `rates_${base}`;
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_DURATION;
  }

  private async fetchFromAPI(base: string, apiIndex = 0): Promise<ExchangeRateResponse> {
    if (apiIndex >= this.apis.length) {
      throw new Error('All APIs failed');
    }

    const api = this.apis[apiIndex];
    
    try {
      const response = await fetch(api.url(base), {
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-cache'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const transformedData = api.transform(data, base);
      
      console.log(`✅ Currency rates fetched from ${api.name}`);
      return transformedData;
    } catch (error) {
      console.warn(`❌ ${api.name} failed:`, error);
      
      // Try next API
      return this.fetchFromAPI(base, apiIndex + 1);
    }
  }

  private generateFallbackRates(base: string): ExchangeRateResponse {
    const baseRates = this.fallbackRates[base];
    
    if (baseRates) {
      return {
        base,
        rates: { ...baseRates, [base]: 1 },
        date: new Date().toISOString().split('T')[0]
      };
    }

    // If base currency is not USD, convert through USD
    const usdRates = this.fallbackRates.USD;
    const baseToUsd = Object.entries(usdRates).find(([currency]) => currency === base)?.[1];
    
    if (baseToUsd) {
      const rates: Record<string, number> = { [base]: 1 };
      
      // Convert all rates relative to the base currency
      for (const [currency, usdRate] of Object.entries(usdRates)) {
        if (currency !== base) {
          rates[currency] = usdRate / baseToUsd;
        }
      }
      
      // Add USD rate
      rates.USD = 1 / baseToUsd;
      
      return {
        base,
        rates,
        date: new Date().toISOString().split('T')[0]
      };
    }

    // Ultimate fallback - assume it's USD equivalent
    return {
      base,
      rates: { ...this.fallbackRates.USD, [base]: 1 },
      date: new Date().toISOString().split('T')[0]
    };
  }

  async getExchangeRates(base: string): Promise<CurrencyAPIResponse> {
    const cacheKey = this.getCacheKey(base);
    const cached = this.cache.get(cacheKey);

    // Return cached data if valid
    if (cached && this.isCacheValid(cached.timestamp)) {
      return {
        success: true,
        data: cached.data
      };
    }

    try {
      // Try to fetch from APIs
      const data = await this.fetchFromAPI(base);
      
      // Cache the result
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return {
        success: true,
        data
      };
    } catch (error) {
      console.warn('All APIs failed, using fallback rates');
      
      // Use fallback rates
      const fallbackData = this.generateFallbackRates(base);
      
      return {
        success: false,
        data: fallbackData,
        error: 'Using offline rates - API unavailable'
      };
    }
  }

  async convertCurrency(
    amount: number, 
    from: string, 
    to: string
  ): Promise<{
    convertedAmount: number;
    rate: number;
    isLive: boolean;
    error?: string;
  }> {
    try {
      const response = await this.getExchangeRates(from);
      const rate = response.data.rates[to];

      if (!rate) {
        throw new Error(`Exchange rate not available for ${from} to ${to}`);
      }

      return {
        convertedAmount: amount * rate,
        rate,
        isLive: response.success,
        error: response.error
      };
    } catch (error) {
      throw new Error(`Currency conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get popular currency pairs with live rates
  async getPopularRates(): Promise<Record<string, number>> {
    try {
      const usdRates = await this.getExchangeRates('USD');
      const popularCurrencies = ['EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY'];
      
      const rates: Record<string, number> = {};
      for (const currency of popularCurrencies) {
        if (usdRates.data.rates[currency]) {
          rates[`USD/${currency}`] = usdRates.data.rates[currency];
        }
      }
      
      return rates;
    } catch (error) {
      console.error('Failed to fetch popular rates:', error);
      return {};
    }
  }

  // Clear cache (useful for testing or forced refresh)
  clearCache(): void {
    this.cache.clear();
  }
}

// Export singleton instance
export const currencyAPI = CurrencyAPI.getInstance();

// Export types
export type { ExchangeRateResponse, CurrencyAPIResponse };