import { AdUnit, MobileAd } from '../../components/AdSense';
import { ADSENSE_CONFIG } from '../../lib/adsense';
'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  worldTimeZones, 
  convertTimezone, 
  getCurrentTimeInTimezone, 
  getWorldClockCities,
  getPopularTimezonePairs,
  detectUserTimezone,
  formatTimeWithDay,
  isValidTimeFormat,
  TimeZoneData,
  TimeConversion
} from '@/lib/timezone';
import { ClockIcon, GlobeAltIcon, ArrowRightIcon, CalendarIcon } from '@heroicons/react/24/outline';
import MobileBackButton from '@/components/MobileBackButton';

export default function TimezoneConverter() {
  const [fromTime, setFromTime] = useState('12:00');
  const [fromTimezone, setFromTimezone] = useState<TimeZoneData>(worldTimeZones[0]);
  const [toTimezone, setToTimezone] = useState<TimeZoneData>(worldTimeZones.find(tz => tz.abbreviation === 'EST') || worldTimeZones[1]);
  const [result, setResult] = useState<TimeConversion | null>(null);
  const [worldClock, setWorldClock] = useState(getWorldClockCities());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [error, setError] = useState('');
  const [isConverting, setIsConverting] = useState(false);

  // Auto-detect user timezone on mount
  useEffect(() => {
    const detected = detectUserTimezone();
    if (detected.timezone) {
      setFromTimezone(detected.timezone);
    }
  }, []);

  // Real-time world clock updates
  useEffect(() => {
    const updateClock = () => {
      setWorldClock(getWorldClockCities());
      setCurrentDate(new Date());
    };

    updateClock(); // Initial update
    const interval = setInterval(updateClock, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  // Real-time conversion with debouncing
  const performConversion = useCallback(() => {
    if (!isValidTimeFormat(fromTime)) {
      setError('Please enter a valid time in HH:MM format');
      setResult(null);
      setIsConverting(false);
      return;
    }

    setIsConverting(true);
    try {
      const conversion = convertTimezone(
        fromTime,
        fromTimezone.offset,
        toTimezone.offset,
        currentDate
      );
      setResult(conversion);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
      setResult(null);
    } finally {
      setTimeout(() => setIsConverting(false), 200); // Small delay for better UX
    }
  }, [fromTime, fromTimezone, toTimezone, currentDate]);

  // Debounced conversion
  useEffect(() => {
    setIsConverting(true);
    const timer = setTimeout(performConversion, 150);
    return () => clearTimeout(timer);
  }, [performConversion]);

  // Quick timezone selection
  const setQuickTimezone = (timezone: TimeZoneData, isFrom: boolean) => {
    if (isFrom) {
      setFromTimezone(timezone);
    } else {
      setToTimezone(timezone);
    }
  };

  // Swap timezones
  const swapTimezones = () => {
    const temp = fromTimezone;
    setFromTimezone(toTimezone);
    setToTimezone(temp);
  };

  // Popular timezone pairs
  const popularPairs = getPopularTimezonePairs();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <main className="container mx-auto px-4 py-6 sm:py-8 mobile-container">
        <div className="max-w-6xl mx-auto">
          {/* Mobile Back Button */}
          <div className="md:hidden mb-4">
            <MobileBackButton fallbackUrl="/" />
          </div>

          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 mobile-title-enhanced">
              🌍 Timezone Converter & World Clock
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mobile-subtitle-enhanced">
              Convert time between timezones worldwide with real-time accuracy
            </p>
          </div>

          {/* Main Converter */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 mobile-card-enhanced">
            {/* Error Message */}
            {error && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg mobile-error-enhanced">
                <div className="text-red-700 text-sm sm:text-base">{error}</div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* From Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <ClockIcon className="w-4 h-4 inline mr-1" />
                  From Time
                </label>
                <input
                  type="time"
                  value={fromTime}
                  onChange={(e) => setFromTime(e.target.value)}
                  className="mobile-input-enhanced w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-3 sm:mb-4"
                />
                
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <GlobeAltIcon className="w-4 h-4 inline mr-1" />
                  From Timezone
                </label>
                <select
                  value={fromTimezone.abbreviation}
                  onChange={(e) => {
                    const tz = worldTimeZones.find(t => t.abbreviation === e.target.value);
                    if (tz) setFromTimezone(tz);
                  }}
                  className="mobile-select-enhanced w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {worldTimeZones.map((tz) => (
                    <option key={`${tz.abbreviation}-${tz.offset}`} value={tz.abbreviation}>
                      {tz.abbreviation} (UTC{tz.offset >= 0 ? '+' : ''}{tz.offset}) - {tz.cities[0]}
                    </option>
                  ))}
                </select>

                <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600">
                  Current time: {getCurrentTimeInTimezone(fromTimezone.offset)}
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex items-center justify-center order-last lg:order-none">
                <button
                  onClick={swapTimezones}
                  className="mobile-touch-feedback p-2 sm:p-3 border-2 border-purple-200 rounded-full hover:border-purple-400 hover:bg-purple-50 transition-all transform hover:scale-110 active:scale-95"
                  title="Swap timezones"
                  aria-label="Swap timezones"
                >
                  <ArrowRightIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </button>
              </div>

              {/* To Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <GlobeAltIcon className="w-4 h-4 inline mr-1" />
                  To Timezone
                </label>
                <select
                  value={toTimezone.abbreviation}
                  onChange={(e) => {
                    const tz = worldTimeZones.find(t => t.abbreviation === e.target.value);
                    if (tz) setToTimezone(tz);
                  }}
                  className="mobile-select-enhanced w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-3 sm:mb-4"
                >
                  {worldTimeZones.map((tz) => (
                    <option key={`${tz.abbreviation}-${tz.offset}`} value={tz.abbreviation}>
                      {tz.abbreviation} (UTC{tz.offset >= 0 ? '+' : ''}{tz.offset}) - {tz.cities[0]}
                    </option>
                  ))}
                </select>
                
                <div className="p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg mobile-result-enhanced">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center text-sm sm:text-base">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    Converted Time:
                  </h3>
                  <div className="text-lg font-bold text-purple-700">
                    {result
                      ? formatTimeWithDay(result)
                      : '--'}
                  </div>
                </div>

                <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600">
                  Current time: {getCurrentTimeInTimezone(toTimezone.offset)}
                </div>
              </div>
            </div>
          </div>

          {/* Popular Timezone Pairs */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 mobile-card-enhanced">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 mobile-subtitle-enhanced">Popular Timezone Conversions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {popularPairs.map((pair, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setFromTimezone(pair.from);
                    setToTimezone(pair.to);
                  }}
                  className="mobile-touch-feedback p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all text-left transform hover:scale-105 active:scale-95"
                >
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">{pair.description}</div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">
                    {pair.from.abbreviation} → {pair.to.abbreviation}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* World Clock */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mobile-card-enhanced">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center mobile-subtitle-enhanced">
              <GlobeAltIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              World Clock
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {worldClock.map((clock, index) => (
                <div
                  key={index}
                  className="mobile-card p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border hover:shadow-md transition-all cursor-pointer mobile-fade-in"
                  onClick={() => setQuickTimezone(clock.timezone, false)}
                >
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900">{clock.city}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {clock.timezone.abbreviation} (UTC{clock.timezone.offset >= 0 ? '+' : ''}{clock.timezone.offset})
                    </p>
                    <p className="text-2xl font-bold text-purple-600">{clock.currentTime}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {clock.timezone.abbreviation} - {clock.timezone.cities[0]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-500">
              Click any city to use as target timezone • Updates every second
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}