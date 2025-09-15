'use client';

interface CryptoPriceResponse {
  [key: string]: {
    usd: number;
    eur?: number;
    btc?: number;
  };
}

interface CryptoAPIResponse {
  success: boolean;
  data: Record<string, number>;
  error?: string;
}

class CryptoAPI {
  private static instance: CryptoAPI;
  private cache: Map<string, { data: Record<string, number>; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes for crypto (more volatile)

  static getInstance(): CryptoAPI {
    if (!CryptoAPI.instance) {
      CryptoAPI.instance = new CryptoAPI();
    }
    return CryptoAPI.instance;
  }

  // Cryptocurrency mapping for API calls
  private cryptoMap: Record<string, string> = {
    'BTC': 'bitcoin',
    'ETH': 'ethereum',
    'BNB': 'binancecoin',
    'ADA': 'cardano',
    'SOL': 'solana',
    'XRP': 'ripple',
    'DOT': 'polkadot',
    'DOGE': 'dogecoin',
    'AVAX': 'avalanche-2',
    'SHIB': 'shiba-inu',
    'MATIC': 'matic-network',
    'UNI': 'uniswap',
    'LINK': 'chainlink',
    'LTC': 'litecoin',
    'BCH': 'bitcoin-cash'
  };

  // Fallback crypto prices (in USD)
  private fallbackPrices: Record<string, number> = {
    'BTC': 45000,
    'ETH': 3000,
    'BNB': 300,
    'ADA': 0.5,
    'SOL': 100,
    'XRP': 0.6,
    'DOT': 25,
    'DOGE': 0.08,
    'AVAX': 35,
    'SHIB': 0.000025,
    'MATIC': 0.8,
    'UNI': 15,
    'LINK': 20,
    'LTC': 150,
    'BCH': 400
  };

  private apis = [
    {
      name: 'CoinGecko',
      url: (cryptoIds: string) => `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=usd,eur,btc`,
      transform: (data: CryptoPriceResponse) => {
        const prices: Record<string, number> = {};
        
        // Convert crypto ID back to symbol and get USD price
        Object.entries(data).forEach(([cryptoId, priceData]) => {
          const symbol = Object.entries(this.cryptoMap).find(([sym, id]) => id === cryptoId)?.[0];
          if (symbol && priceData.usd) {
            prices[symbol] = priceData.usd;
          }
        });
        
        return prices;
      }
    },
    {
      name: 'CoinCap',
      url: (cryptoIds: string) => `https://api.coincap.io/v2/assets`,
      transform: (data: any) => {
        const prices: Record<string, number> = {};
        
        if (data.data && Array.isArray(data.data)) {
          data.data.forEach((asset: any) => {
            const symbol = asset.symbol?.toUpperCase();
            if (symbol && this.cryptoMap[symbol] && asset.priceUsd) {
              prices[symbol] = parseFloat(asset.priceUsd);
            }
          });
        }
        
        return prices;
      }
    }
  ];

  private getCacheKey(): string {
    return 'crypto_prices';
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_DURATION;
  }

  private async fetchFromAPI(apiIndex = 0): Promise<Record<string, number>> {
    if (apiIndex >= this.apis.length) {
      throw new Error('All crypto APIs failed');
    }

    const api = this.apis[apiIndex];
    
    try {
      let url: string;
      
      if (api.name === 'CoinGecko') {
        const cryptoIds = Object.values(this.cryptoMap).join(',');
        url = api.url(cryptoIds);
      } else {
        url = api.url('');
      }

      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-cache'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const transformedData = api.transform(data);
      
      console.log(`✅ Crypto prices fetched from ${api.name}`);
      return transformedData;
    } catch (error) {
      console.warn(`❌ ${api.name} failed:`, error);
      
      // Try next API
      return this.fetchFromAPI(apiIndex + 1);
    }
  }

  async getCryptoPrices(): Promise<CryptoAPIResponse> {
    const cacheKey = this.getCacheKey();
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
      const data = await this.fetchFromAPI();
      
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
      console.warn('All crypto APIs failed, using fallback prices');
      
      return {
        success: false,
        data: this.fallbackPrices,
        error: 'Using offline prices - Crypto APIs unavailable'
      };
    }
  }

  async convertCrypto(
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
      const response = await this.getCryptoPrices();
      
      const fromPrice = response.data[from];
      const toPrice = response.data[to];

      if (!fromPrice) {
        throw new Error(`Price not available for ${from}`);
      }

      if (!toPrice) {
        throw new Error(`Price not available for ${to}`);
      }

      // Convert: from crypto -> USD -> to crypto
      const rate = fromPrice / toPrice;
      const convertedAmount = amount * rate;

      return {
        convertedAmount,
        rate,
        isLive: response.success,
        error: response.error
      };
    } catch (error) {
      throw new Error(`Crypto conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async convertCryptoToFiat(
    amount: number,
    cryptoSymbol: string,
    fiatSymbol: string
  ): Promise<{
    convertedAmount: number;
    rate: number;
    isLive: boolean;
    error?: string;
  }> {
    try {
      const response = await this.getCryptoPrices();
      const cryptoPrice = response.data[cryptoSymbol];

      if (!cryptoPrice) {
        throw new Error(`Price not available for ${cryptoSymbol}`);
      }

      // For now, we'll assume fiat conversion through USD
      // In a real implementation, you'd also fetch fiat rates
      let rate = cryptoPrice;
      
      // Convert to other fiat currencies using approximate rates
      if (fiatSymbol === 'EUR') {
        rate = cryptoPrice * 0.85; // Approximate USD to EUR
      } else if (fiatSymbol === 'GBP') {
        rate = cryptoPrice * 0.73; // Approximate USD to GBP
      }

      return {
        convertedAmount: amount * rate,
        rate,
        isLive: response.success,
        error: response.error
      };
    } catch (error) {
      throw new Error(`Crypto to fiat conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async convertFiatToCrypto(
    amount: number,
    fiatSymbol: string,
    cryptoSymbol: string
  ): Promise<{
    convertedAmount: number;
    rate: number;
    isLive: boolean;
    error?: string;
  }> {
    try {
      const response = await this.getCryptoPrices();
      const cryptoPrice = response.data[cryptoSymbol];

      if (!cryptoPrice) {
        throw new Error(`Price not available for ${cryptoSymbol}`);
      }

      // Convert fiat to USD first (approximate)
      let usdAmount = amount;
      if (fiatSymbol === 'EUR') {
        usdAmount = amount / 0.85;
      } else if (fiatSymbol === 'GBP') {
        usdAmount = amount / 0.73;
      }

      const rate = 1 / cryptoPrice;
      const convertedAmount = usdAmount * rate;

      return {
        convertedAmount,
        rate,
        isLive: response.success,
        error: response.error
      };
    } catch (error) {
      throw new Error(`Fiat to crypto conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get top crypto prices for display
  async getTopCryptoPrices(): Promise<Record<string, number>> {
    try {
      const response = await this.getCryptoPrices();
      const topCryptos = ['BTC', 'ETH', 'BNB', 'ADA', 'SOL'];
      
      const prices: Record<string, number> = {};
      for (const crypto of topCryptos) {
        if (response.data[crypto]) {
          prices[crypto] = response.data[crypto];
        }
      }
      
      return prices;
    } catch (error) {
      console.error('Failed to fetch top crypto prices:', error);
      return {};
    }
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
  }

  // Check if a currency is a cryptocurrency
  isCryptocurrency(symbol: string): boolean {
    return symbol in this.cryptoMap;
  }
}

// Export singleton instance
export const cryptoAPI = CryptoAPI.getInstance();

// Export types
export type { CryptoPriceResponse, CryptoAPIResponse };