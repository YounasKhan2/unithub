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

export default function TimezoneConverter() {
  const [fromTime, setFromTime] = useState('12:00');
  const [fromTimezone, setFromTimezone] = useState<TimeZoneData>(worldTimeZones[0]);
  const [toTimezone, setToTimezone] = useState<TimeZoneData>(worldTimeZones.find(tz => tz.abbreviation === 'EST') || worldTimeZones[1]);
  const [result, setResult] = useState<TimeConversion | null>(null);
  const [worldClock, setWorldClock] = useState(getWorldClockCities());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [error, setError] = useState('');

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
      return;
    }

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
    }
  }, [fromTime, fromTimezone, toTimezone, currentDate]);

  // Debounced conversion
  useEffect(() => {
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
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Timezone Converter & World Clock
            </h1>
            <p className="text-xl text-gray-600">
              Convert time between timezones worldwide with real-time accuracy
            </p>
          </div>

          {/* Main Converter */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid lg:grid-cols-3 gap-8">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {worldTimeZones.map((tz) => (
                    <option key={`${tz.abbreviation}-${tz.offset}`} value={tz.abbreviation}>
                      {tz.abbreviation} (UTC{tz.offset >= 0 ? '+' : ''}{tz.offset}) - {tz.cities[0]}
                    </option>
                  ))}
                </select>

                <div className="mt-3 text-sm text-gray-600">
                  Current time: {getCurrentTimeInTimezone(fromTimezone.offset)}
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex items-center justify-center">
                <button
                  onClick={swapTimezones}
                  className="p-3 border-2 border-purple-200 rounded-full hover:border-purple-400 hover:bg-purple-50 transition-colors"
                  title="Swap timezones"
                >
                  <ArrowRightIcon className="w-6 h-6 text-purple-600" />
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
                >
                  {worldTimeZones.map((tz) => (
                    <option key={`${tz.abbreviation}-${tz.offset}`} value={tz.abbreviation}>
                      {tz.abbreviation} (UTC{tz.offset >= 0 ? '+' : ''}{tz.offset}) - {tz.cities[0]}
                    </option>
                  ))}
                </select>
                
                <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    Converted Time:
                  </h3>
                  {error ? (
                    <p className="text-red-600">{error}</p>
                  ) : result ? (
                    <div>
                      <p className="text-2xl font-bold text-purple-600">
                        {formatTimeWithDay(result)}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Time difference: {result.timeDifference >= 0 ? '+' : ''}{result.timeDifference} hours
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500">Enter time to see conversion</p>
                  )}
                </div>

                <div className="mt-3 text-sm text-gray-600">
                  Current time: {getCurrentTimeInTimezone(toTimezone.offset)}
                </div>
              </div>
            </div>
          </div>

          {/* Popular Timezone Pairs */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Timezone Conversions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularPairs.map((pair, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setFromTimezone(pair.from);
                    setToTimezone(pair.to);
                  }}
                  className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-left"
                >
                  <div className="font-semibold text-gray-900">{pair.description}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {pair.from.abbreviation} → {pair.to.abbreviation}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* World Clock */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <GlobeAltIcon className="w-6 h-6 mr-2" />
              World Clock
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {worldClock.map((clock, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
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