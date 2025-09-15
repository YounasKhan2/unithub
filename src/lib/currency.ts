import { 
  fetchWithRetry, 
  CacheManager, 
  OfflineManager, 
  RateLimiter,
  ApiResponse,
  getErrorMessage 
} from './error-handling';

// Currency API utilities
export interface CurrencyData {
  code: string;
  name: string;
  symbol: string;
  flag?: string;
}

export interface ExchangeRates {
  base: string;
  rates: Record<string, number>;
  lastUpdated: string;
}

// Comprehensive list of world currencies
export const worldCurrencies: CurrencyData[] = [
  // Cryptocurrencies
  { code: 'BTC', name: 'Bitcoin', symbol: '₿', flag: '🟠' },
  { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', flag: '🔷' },
  { code: 'BNB', name: 'Binance Coin', symbol: 'BNB', flag: '🟡' },
  { code: 'ADA', name: 'Cardano', symbol: 'ADA', flag: '🔵' },
  { code: 'SOL', name: 'Solana', symbol: 'SOL', flag: '🟣' },
  { code: 'XRP', name: 'Ripple', symbol: 'XRP', flag: '🔴' },
  { code: 'DOT', name: 'Polkadot', symbol: 'DOT', flag: '⚫' },
  { code: 'DOGE', name: 'Dogecoin', symbol: 'DOGE', flag: '🐕' },
  { code: 'AVAX', name: 'Avalanche', symbol: 'AVAX', flag: '❄️' },
  { code: 'SHIB', name: 'Shiba Inu', symbol: 'SHIB', flag: '🐶' },
  { code: 'MATIC', name: 'Polygon', symbol: 'MATIC', flag: '🟪' },
  { code: 'UNI', name: 'Uniswap', symbol: 'UNI', flag: '🦄' },
  { code: 'LINK', name: 'Chainlink', symbol: 'LINK', flag: '🔗' },
  { code: 'LTC', name: 'Litecoin', symbol: 'Ł', flag: '⚪' },
  { code: 'BCH', name: 'Bitcoin Cash', symbol: 'BCH', flag: '🟢' },
  
  // Major Currencies
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound Sterling', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  
  // Asian Currencies
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
  { code: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$', flag: '🇹🇼' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩' },
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: '₨', flag: '🇱🇰' },
  
  // Middle East & Africa
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: '﷼', flag: '🇶🇦' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', flag: '🇰🇼' },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب', flag: '🇧🇭' },
  { code: 'OMR', name: 'Omani Rial', symbol: '﷼', flag: '🇴🇲' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
  { code: 'IRR', name: 'Iranian Rial', symbol: '﷼', flag: '🇮🇷' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: '£', flag: '🇪🇬' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', flag: '🇬🇭' },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م.', flag: '🇲🇦' },
  { code: 'TND', name: 'Tunisian Dinar', symbol: 'د.ت', flag: '🇹🇳' },
  
  // European Currencies
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei', flag: '🇷🇴' },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', flag: '🇧🇬' },
  { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn', flag: '🇭🇷' },
  { code: 'RSD', name: 'Serbian Dinar', symbol: 'din', flag: '🇷🇸' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺' },
  { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴', flag: '🇺🇦' },
  
  // American Currencies
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$', flag: '🇦🇷' },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$', flag: '🇨🇱' },
  { code: 'COP', name: 'Colombian Peso', symbol: '$', flag: '🇨🇴' },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/', flag: '🇵🇪' },
  { code: 'UYU', name: 'Uruguayan Peso', symbol: '$', flag: '🇺🇾' },
  { code: 'BOB', name: 'Bolivian Boliviano', symbol: 'Bs', flag: '🇧🇴' },
  { code: 'PYG', name: 'Paraguayan Guarani', symbol: '₲', flag: '🇵🇾' },
  { code: 'VES', name: 'Venezuelan Bolívar', symbol: 'Bs', flag: '🇻🇪' },
  
  // Oceania & Other
  { code: 'FJD', name: 'Fijian Dollar', symbol: 'FJ$', flag: '🇫🇯' },
  { code: 'PGK', name: 'Papua New Guinea Kina', symbol: 'K', flag: '🇵🇬' },
  { code: 'TOP', name: 'Tongan Paʻanga', symbol: 'T$', flag: '🇹🇴' },
  { code: 'WST', name: 'Samoan Tala', symbol: 'WS$', flag: '🇼🇸' },
  { code: 'VUV', name: 'Vanuatu Vatu', symbol: 'VT', flag: '🇻🇺' },
];

// Exchange rate API configuration
const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest';
const FALLBACK_API_URL = 'https://api.fxratesapi.com/latest';

// Rate limiting: 1000 calls per hour
const rateLimiter = new RateLimiter();
const cache = CacheManager.getInstance();
const offlineManager = OfflineManager.getInstance();

// Fallback exchange rates (approximate, updated periodically)
const FALLBACK_RATES: Record<string, number> = {
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.0,
  AUD: 1.35,
  CAD: 1.25,
  CHF: 0.92,
  CNY: 6.45,
  INR: 74.5,
  BRL: 5.2,
  RUB: 73.5,
  KRW: 1180.0,
  MXN: 20.1,
  SGD: 1.35,
  NZD: 1.42,
  ZAR: 14.8,
  TRY: 8.5,
  AED: 3.67,
  SAR: 3.75,
  THB: 31.5,
  IDR: 14300.0
};

export async function fetchExchangeRates(baseCurrency: string = 'USD'): Promise<ApiResponse<ExchangeRates>> {
  const cacheKey = `exchange_rates_${baseCurrency}`;
  
  // Check cache first
  const cachedRates = cache.get<ExchangeRates>(cacheKey);
  if (cachedRates) {
    return {
      success: true,
      data: cachedRates,
      cached: true,
      timestamp: Date.now()
    };
  }

  // Check rate limiting
  if (!rateLimiter.isAllowed('exchange_api', 100, 3600000)) { // 100 calls per hour
    const nextAllowed = rateLimiter.getNextAllowedTime('exchange_api', 100, 3600000);
    const waitTime = Math.ceil((nextAllowed - Date.now()) / 60000);
    
    return {
      success: false,
      error: `Rate limit exceeded. Please try again in ${waitTime} minutes.`,
      code: 'RATE_LIMIT',
      retryAfter: nextAllowed
    };
  }

  // Check if offline
  if (!offlineManager.getStatus()) {
    const fallbackRates = getFallbackRates(baseCurrency);
    return {
      success: true,
      data: fallbackRates,
      cached: true,
      timestamp: Date.now()
    };
  }

  try {
    // Try primary API first
    let response = await fetchWithRetry<{ rates: Record<string, number> }>(
      `${API_BASE_URL}/${baseCurrency}`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Unit-Converter-SaaS/1.0'
        }
      },
      { maxRetries: 2, delay: 1000 }
    );

    // If primary API fails, try fallback
    if (!response.success) {
      response = await fetchWithRetry<{ rates: Record<string, number> }>(
        `${FALLBACK_API_URL}?base=${baseCurrency}`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Unit-Converter-SaaS/1.0'
          }
        },
        { maxRetries: 1, delay: 500 }
      );
    }

    if (response.success) {
      const exchangeRates: ExchangeRates = {
        base: baseCurrency,
        rates: response.data.rates,
        lastUpdated: new Date().toISOString()
      };
      
      // Cache the rates for 10 minutes
      cache.set(cacheKey, exchangeRates, 10);
      
      return {
        success: true,
        data: exchangeRates,
        timestamp: Date.now()
      };
    } else {
      // Use fallback rates if both APIs fail
      const fallbackRates = getFallbackRates(baseCurrency);
      console.warn('Using fallback exchange rates due to API failure:', response.error);
      
      return {
        success: true,
        data: fallbackRates,
        cached: true,
        timestamp: Date.now()
      };
    }
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    
    // Return fallback rates as last resort
    const fallbackRates = getFallbackRates(baseCurrency);
    return {
      success: true,
      data: fallbackRates,
      cached: true,
      timestamp: Date.now()
    };
  }
}

function getFallbackRates(baseCurrency: string): ExchangeRates {
  // Convert fallback rates to the requested base currency
  const usdRate = FALLBACK_RATES[baseCurrency] || 1;
  const convertedRates: Record<string, number> = {};
  
  if (baseCurrency === 'USD') {
    convertedRates.USD = 1;
    Object.entries(FALLBACK_RATES).forEach(([currency, rate]) => {
      convertedRates[currency] = rate;
    });
  } else {
    convertedRates.USD = 1 / usdRate;
    Object.entries(FALLBACK_RATES).forEach(([currency, rate]) => {
      if (currency !== baseCurrency) {
        convertedRates[currency] = rate / usdRate;
      }
    });
  }
  
  return {
    base: baseCurrency,
    rates: convertedRates,
    lastUpdated: new Date().toISOString()
  };
}

export async function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<ApiResponse<{ result: number; rate: number; lastUpdated: string }>> {
  if (amount <= 0) {
    return {
      success: false,
      error: 'Amount must be greater than 0',
      code: 'VALIDATION_ERROR'
    };
  }

  if (fromCurrency === toCurrency) {
    return {
      success: true,
      data: {
        result: amount,
        rate: 1,
        lastUpdated: new Date().toISOString()
      }
    };
  }

  try {
    const ratesResponse = await fetchExchangeRates(fromCurrency);
    
    if (!ratesResponse.success) {
      return {
        success: false,
        error: getErrorMessage(ratesResponse.error, ratesResponse.code),
        code: ratesResponse.code
      };
    }

    const rates = ratesResponse.data;
    const rate = rates.rates[toCurrency];
    
    if (!rate) {
      return {
        success: false,
        error: `Exchange rate not available for ${toCurrency}`,
        code: 'CURRENCY_NOT_FOUND'
      };
    }

    const result = parseFloat((amount * rate).toFixed(2));
    
    return {
      success: true,
      data: {
        result,
        rate,
        lastUpdated: rates.lastUpdated
      }
    };
    
  } catch (error) {
    console.error('Currency conversion failed:', error);
    
    return {
      success: false,
      error: getErrorMessage(error instanceof Error ? error.message : 'Conversion failed'),
      code: 'CONVERSION_ERROR'
    };
  }
}

export function getCurrencyByCode(code: string): CurrencyData | undefined {
  return worldCurrencies.find(currency => currency.code === code);
}

export function getPopularCurrencies(): CurrencyData[] {
  const popularCodes = ['BTC', 'ETH', 'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY'];
  return popularCodes.map(code => getCurrencyByCode(code)!).filter(Boolean);
}

export function getCryptocurrencies(): CurrencyData[] {
  const cryptoCodes = ['BTC', 'ETH', 'BNB', 'ADA', 'SOL', 'XRP', 'DOT', 'DOGE', 'AVAX', 'SHIB', 'MATIC', 'UNI', 'LINK', 'LTC', 'BCH'];
  return cryptoCodes.map(code => getCurrencyByCode(code)!).filter(Boolean);
}

export function getFiatCurrencies(): CurrencyData[] {
  return worldCurrencies.filter(currency => !['BTC', 'ETH', 'BNB', 'ADA', 'SOL', 'XRP', 'DOT', 'DOGE', 'AVAX', 'SHIB', 'MATIC', 'UNI', 'LINK', 'LTC', 'BCH'].includes(currency.code));
}