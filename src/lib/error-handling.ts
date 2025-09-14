// Enhanced error handling and retry utilities
export interface RetryOptions {
  maxRetries: number;
  delay: number;
  backoffFactor: number;
  timeout: number;
}

export interface ErrorResponse {
  success: false;
  error: string;
  code?: string;
  retryAfter?: number;
}

export interface SuccessResponse<T> {
  success: true;
  data: T;
  cached?: boolean;
  timestamp?: number;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// Default retry configuration
const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  maxRetries: 3,
  delay: 1000,
  backoffFactor: 2,
  timeout: 10000
};

// Network error detection
function isNetworkError(error: any): boolean {
  return (
    !navigator.onLine ||
    error.code === 'NETWORK_ERROR' ||
    error.message?.includes('fetch') ||
    error.message?.includes('network') ||
    error.name === 'NetworkError'
  );
}

// Timeout wrapper for fetch requests
function fetchWithTimeout(url: string, options: RequestInit = {}, timeout: number): Promise<Response> {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      reject(new Error('Request timeout'));
    }, timeout);

    fetch(url, { ...options, signal: controller.signal })
      .then(resolve)
      .catch(reject)
      .finally(() => clearTimeout(timeoutId));
  });
}

// Enhanced retry mechanism with exponential backoff
export async function retryOperation<T>(
  operation: () => Promise<T>,
  options: Partial<RetryOptions> = {}
): Promise<T> {
  const config = { ...DEFAULT_RETRY_OPTIONS, ...options };
  let lastError: Error = new Error('Operation failed');

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      const result = await operation();
      return result;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // Don't retry on the last attempt
      if (attempt === config.maxRetries) {
        break;
      }

      // Calculate delay with exponential backoff
      const delay = config.delay * Math.pow(config.backoffFactor, attempt);
      
      // Add jitter to prevent thundering herd
      const jitter = Math.random() * 0.1 * delay;
      const totalDelay = delay + jitter;

      console.warn(`Attempt ${attempt + 1} failed, retrying in ${totalDelay}ms:`, lastError.message);
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, totalDelay));
    }
  }

  throw lastError;
}

// Enhanced fetch with retry and error handling
export async function fetchWithRetry<T>(
  url: string,
  options: RequestInit = {},
  retryOptions: Partial<RetryOptions> = {}
): Promise<ApiResponse<T>> {
  try {
    const config = { ...DEFAULT_RETRY_OPTIONS, ...retryOptions };
    
    const response = await retryOperation(async () => {
      const res = await fetchWithTimeout(url, options, config.timeout);
      
      if (!res.ok) {
        const errorText = await res.text().catch(() => 'Unknown error');
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }
      
      return res;
    }, retryOptions);

    const data = await response.json();
    
    return {
      success: true,
      data,
      timestamp: Date.now()
    };
    
  } catch (error) {
    console.error('Fetch operation failed:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return {
      success: false,
      error: errorMessage,
      code: isNetworkError(error) ? 'NETWORK_ERROR' : 'API_ERROR'
    };
  }
}

// Local storage cache with expiration
export class CacheManager {
  private static instance: CacheManager;
  private readonly prefix = 'unit_converter_';

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  set<T>(key: string, data: T, expirationMinutes: number = 10): void {
    try {
      const item = {
        data,
        expiration: Date.now() + (expirationMinutes * 60 * 1000)
      };
      localStorage.setItem(this.prefix + key, JSON.stringify(item));
    } catch (error) {
      console.warn('Failed to cache data:', error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.prefix + key);
      if (!item) return null;

      const { data, expiration } = JSON.parse(item);
      
      if (Date.now() > expiration) {
        this.remove(key);
        return null;
      }

      return data;
    } catch (error) {
      console.warn('Failed to retrieve cached data:', error);
      return null;
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(this.prefix + key);
    } catch (error) {
      console.warn('Failed to remove cached data:', error);
    }
  }

  clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }
}

// Offline detection and fallback strategies
export class OfflineManager {
  private static instance: OfflineManager;
  private isOnline: boolean = navigator.onLine;
  private listeners: Array<(isOnline: boolean) => void> = [];

  static getInstance(): OfflineManager {
    if (!OfflineManager.instance) {
      OfflineManager.instance = new OfflineManager();
    }
    return OfflineManager.instance;
  }

  constructor() {
    // Only add event listeners in browser environment
    if (typeof window !== 'undefined') {
      // Listen for online/offline events
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.notifyListeners();
      });

      window.addEventListener('offline', () => {
        this.isOnline = false;
        this.notifyListeners();
      });
    }
  }

  getStatus(): boolean {
    // Return true by default on server-side (assume online)
    if (typeof window === 'undefined') {
      return true;
    }
    return this.isOnline;
  }

  onStatusChange(callback: (isOnline: boolean) => void): void {
    this.listeners.push(callback);
  }

  private notifyListeners(): void {
    this.listeners.forEach(callback => callback(this.isOnline));
  }
}

// Rate limiting for API calls
export class RateLimiter {
  private calls: Map<string, number[]> = new Map();

  isAllowed(key: string, maxCalls: number, windowMs: number): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;

    if (!this.calls.has(key)) {
      this.calls.set(key, []);
    }

    const callTimes = this.calls.get(key)!;
    
    // Remove old calls outside the window
    const recentCalls = callTimes.filter(time => time > windowStart);
    this.calls.set(key, recentCalls);

    if (recentCalls.length >= maxCalls) {
      return false;
    }

    // Add current call
    recentCalls.push(now);
    return true;
  }

  getNextAllowedTime(key: string, maxCalls: number, windowMs: number): number {
    const callTimes = this.calls.get(key) || [];
    if (callTimes.length < maxCalls) {
      return 0;
    }

    const oldestCall = callTimes[0];
    return oldestCall + windowMs;
  }
}

// User-friendly error messages
export function getErrorMessage(error: string, code?: string): string {
  switch (code) {
    case 'NETWORK_ERROR':
      return 'Network connection failed. Please check your internet connection and try again.';
    case 'API_ERROR':
      if (error.includes('429')) {
        return 'Too many requests. Please wait a moment before trying again.';
      }
      if (error.includes('500')) {
        return 'Service temporarily unavailable. Please try again later.';
      }
      if (error.includes('timeout')) {
        return 'Request timed out. Please check your connection and try again.';
      }
      return 'Service error occurred. Please try again later.';
    case 'VALIDATION_ERROR':
      return 'Invalid input. Please check your data and try again.';
    default:
      return error || 'An unexpected error occurred. Please try again.';
  }
}

// Debounced function utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Performance monitoring
export class PerformanceMonitor {
  private static measurements: Map<string, number[]> = new Map();

  static startMeasurement(label: string): () => number {
    const startTime = performance.now();
    
    return () => {
      const duration = performance.now() - startTime;
      
      if (!this.measurements.has(label)) {
        this.measurements.set(label, []);
      }
      
      const measurements = this.measurements.get(label)!;
      measurements.push(duration);
      
      // Keep only last 100 measurements
      if (measurements.length > 100) {
        measurements.shift();
      }
      
      return duration;
    };
  }

  static getAverageTime(label: string): number {
    const measurements = this.measurements.get(label);
    if (!measurements || measurements.length === 0) return 0;
    
    return measurements.reduce((sum, time) => sum + time, 0) / measurements.length;
  }

  static getStats(label: string): { avg: number; min: number; max: number; count: number } {
    const measurements = this.measurements.get(label) || [];
    
    if (measurements.length === 0) {
      return { avg: 0, min: 0, max: 0, count: 0 };
    }
    
    const avg = measurements.reduce((sum, time) => sum + time, 0) / measurements.length;
    const min = Math.min(...measurements);
    const max = Math.max(...measurements);
    
    return { avg, min, max, count: measurements.length };
  }
}