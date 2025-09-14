// Timezone utilities with real-time world clock support
export interface TimeZoneData {
  name: string;
  offset: number; // UTC offset in hours
  cities: string[];
  abbreviation: string;
  country?: string;
  region?: string;
}

// Comprehensive timezone database
export const worldTimeZones: TimeZoneData[] = [
  // UTC and GMT
  { name: 'UTC', offset: 0, abbreviation: 'UTC', cities: ['Greenwich'], country: 'UK', region: 'Europe' },
  { name: 'GMT', offset: 0, abbreviation: 'GMT', cities: ['London', 'Dublin', 'Lisbon'], country: 'UK', region: 'Europe' },
  
  // Americas - Eastern
  { name: 'EST', offset: -5, abbreviation: 'EST', cities: ['New York', 'Toronto', 'Miami'], country: 'US', region: 'Americas' },
  { name: 'EDT', offset: -4, abbreviation: 'EDT', cities: ['New York (DST)', 'Toronto (DST)'], country: 'US', region: 'Americas' },
  
  // Americas - Central
  { name: 'CST', offset: -6, abbreviation: 'CST', cities: ['Chicago', 'Dallas', 'Mexico City'], country: 'US', region: 'Americas' },
  { name: 'CDT', offset: -5, abbreviation: 'CDT', cities: ['Chicago (DST)', 'Dallas (DST)'], country: 'US', region: 'Americas' },
  
  // Americas - Mountain
  { name: 'MST', offset: -7, abbreviation: 'MST', cities: ['Denver', 'Phoenix', 'Salt Lake City'], country: 'US', region: 'Americas' },
  { name: 'MDT', offset: -6, abbreviation: 'MDT', cities: ['Denver (DST)', 'Salt Lake City (DST)'], country: 'US', region: 'Americas' },
  
  // Americas - Pacific
  { name: 'PST', offset: -8, abbreviation: 'PST', cities: ['Los Angeles', 'San Francisco', 'Seattle'], country: 'US', region: 'Americas' },
  { name: 'PDT', offset: -7, abbreviation: 'PDT', cities: ['Los Angeles (DST)', 'San Francisco (DST)'], country: 'US', region: 'Americas' },
  
  // Americas - Other
  { name: 'AST', offset: -4, abbreviation: 'AST', cities: ['Halifax', 'Puerto Rico', 'Dominican Republic'], country: 'CA', region: 'Americas' },
  { name: 'NST', offset: -3.5, abbreviation: 'NST', cities: ['St. Johns'], country: 'CA', region: 'Americas' },
  { name: 'AKST', offset: -9, abbreviation: 'AKST', cities: ['Anchorage', 'Fairbanks'], country: 'US', region: 'Americas' },
  { name: 'HST', offset: -10, abbreviation: 'HST', cities: ['Honolulu', 'Hilo'], country: 'US', region: 'Americas' },
  
  // South America
  { name: 'BRT', offset: -3, abbreviation: 'BRT', cities: ['São Paulo', 'Rio de Janeiro', 'Brasília'], country: 'BR', region: 'Americas' },
  { name: 'ART', offset: -3, abbreviation: 'ART', cities: ['Buenos Aires', 'Córdoba'], country: 'AR', region: 'Americas' },
  { name: 'CLT', offset: -4, abbreviation: 'CLT', cities: ['Santiago', 'Valparaíso'], country: 'CL', region: 'Americas' },
  { name: 'COT', offset: -5, abbreviation: 'COT', cities: ['Bogotá', 'Medellín'], country: 'CO', region: 'Americas' },
  { name: 'PET', offset: -5, abbreviation: 'PET', cities: ['Lima', 'Arequipa'], country: 'PE', region: 'Americas' },
  
  // Europe
  { name: 'CET', offset: 1, abbreviation: 'CET', cities: ['Paris', 'Berlin', 'Rome', 'Madrid'], country: 'DE', region: 'Europe' },
  { name: 'CEST', offset: 2, abbreviation: 'CEST', cities: ['Paris (DST)', 'Berlin (DST)', 'Rome (DST)'], country: 'DE', region: 'Europe' },
  { name: 'EET', offset: 2, abbreviation: 'EET', cities: ['Cairo', 'Helsinki', 'Athens', 'Kiev'], country: 'EG', region: 'Europe' },
  { name: 'EEST', offset: 3, abbreviation: 'EEST', cities: ['Helsinki (DST)', 'Athens (DST)'], country: 'FI', region: 'Europe' },
  { name: 'WET', offset: 0, abbreviation: 'WET', cities: ['Casablanca', 'Reykjavik'], country: 'MA', region: 'Europe' },
  
  // Russia and Eastern Europe
  { name: 'MSK', offset: 3, abbreviation: 'MSK', cities: ['Moscow', 'St. Petersburg', 'Volgograd'], country: 'RU', region: 'Europe' },
  { name: 'SAMT', offset: 4, abbreviation: 'SAMT', cities: ['Samara'], country: 'RU', region: 'Europe' },
  { name: 'YEKT', offset: 5, abbreviation: 'YEKT', cities: ['Yekaterinburg'], country: 'RU', region: 'Asia' },
  { name: 'OMST', offset: 6, abbreviation: 'OMST', cities: ['Omsk'], country: 'RU', region: 'Asia' },
  { name: 'KRAT', offset: 7, abbreviation: 'KRAT', cities: ['Krasnoyarsk'], country: 'RU', region: 'Asia' },
  { name: 'IRKT', offset: 8, abbreviation: 'IRKT', cities: ['Irkutsk'], country: 'RU', region: 'Asia' },
  { name: 'YAKT', offset: 9, abbreviation: 'YAKT', cities: ['Yakutsk'], country: 'RU', region: 'Asia' },
  { name: 'VLAT', offset: 10, abbreviation: 'VLAT', cities: ['Vladivostok'], country: 'RU', region: 'Asia' },
  { name: 'MAGT', offset: 11, abbreviation: 'MAGT', cities: ['Magadan'], country: 'RU', region: 'Asia' },
  { name: 'PETT', offset: 12, abbreviation: 'PETT', cities: ['Petropavlovsk-Kamchatsky'], country: 'RU', region: 'Asia' },
  
  // Middle East
  { name: 'IST', offset: 2, abbreviation: 'IST', cities: ['Jerusalem', 'Tel Aviv'], country: 'IL', region: 'Asia' },
  { name: 'TRT', offset: 3, abbreviation: 'TRT', cities: ['Istanbul', 'Ankara'], country: 'TR', region: 'Asia' },
  { name: 'AST', offset: 3, abbreviation: 'AST', cities: ['Riyadh', 'Kuwait City'], country: 'SA', region: 'Asia' },
  { name: 'GST', offset: 4, abbreviation: 'GST', cities: ['Dubai', 'Abu Dhabi', 'Muscat'], country: 'AE', region: 'Asia' },
  { name: 'IRST', offset: 3.5, abbreviation: 'IRST', cities: ['Tehran', 'Isfahan'], country: 'IR', region: 'Asia' },
  { name: 'AFT', offset: 4.5, abbreviation: 'AFT', cities: ['Kabul'], country: 'AF', region: 'Asia' },
  
  // South Asia
  { name: 'PKT', offset: 5, abbreviation: 'PKT', cities: ['Karachi', 'Lahore', 'Islamabad'], country: 'PK', region: 'Asia' },
  { name: 'IST', offset: 5.5, abbreviation: 'IST', cities: ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata'], country: 'IN', region: 'Asia' },
  { name: 'NPT', offset: 5.75, abbreviation: 'NPT', cities: ['Kathmandu'], country: 'NP', region: 'Asia' },
  { name: 'BST', offset: 6, abbreviation: 'BST', cities: ['Dhaka', 'Chittagong'], country: 'BD', region: 'Asia' },
  { name: 'BTT', offset: 6, abbreviation: 'BTT', cities: ['Thimphu'], country: 'BT', region: 'Asia' },
  { name: 'LKT', offset: 5.5, abbreviation: 'LKT', cities: ['Colombo', 'Kandy'], country: 'LK', region: 'Asia' },
  { name: 'MVT', offset: 5, abbreviation: 'MVT', cities: ['Malé'], country: 'MV', region: 'Asia' },
  
  // Southeast Asia
  { name: 'ICT', offset: 7, abbreviation: 'ICT', cities: ['Bangkok', 'Ho Chi Minh City', 'Phnom Penh'], country: 'TH', region: 'Asia' },
  { name: 'WIB', offset: 7, abbreviation: 'WIB', cities: ['Jakarta', 'Bandung'], country: 'ID', region: 'Asia' },
  { name: 'WITA', offset: 8, abbreviation: 'WITA', cities: ['Makassar', 'Denpasar'], country: 'ID', region: 'Asia' },
  { name: 'WIT', offset: 9, abbreviation: 'WIT', cities: ['Jayapura'], country: 'ID', region: 'Asia' },
  { name: 'SGT', offset: 8, abbreviation: 'SGT', cities: ['Singapore'], country: 'SG', region: 'Asia' },
  { name: 'MYT', offset: 8, abbreviation: 'MYT', cities: ['Kuala Lumpur', 'George Town'], country: 'MY', region: 'Asia' },
  { name: 'PHT', offset: 8, abbreviation: 'PHT', cities: ['Manila', 'Cebu'], country: 'PH', region: 'Asia' },
  { name: 'BNT', offset: 8, abbreviation: 'BNT', cities: ['Bandar Seri Begawan'], country: 'BN', region: 'Asia' },
  { name: 'MMT', offset: 6.5, abbreviation: 'MMT', cities: ['Yangon', 'Mandalay'], country: 'MM', region: 'Asia' },
  
  // East Asia
  { name: 'CST', offset: 8, abbreviation: 'CST', cities: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen'], country: 'CN', region: 'Asia' },
  { name: 'JST', offset: 9, abbreviation: 'JST', cities: ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama'], country: 'JP', region: 'Asia' },
  { name: 'KST', offset: 9, abbreviation: 'KST', cities: ['Seoul', 'Busan', 'Incheon'], country: 'KR', region: 'Asia' },
  { name: 'PYNT', offset: 9, abbreviation: 'PYNT', cities: ['Pyongyang'], country: 'KP', region: 'Asia' },
  { name: 'TPE', offset: 8, abbreviation: 'TPE', cities: ['Taipei', 'Kaohsiung'], country: 'TW', region: 'Asia' },
  { name: 'HKT', offset: 8, abbreviation: 'HKT', cities: ['Hong Kong'], country: 'HK', region: 'Asia' },
  { name: 'MNT', offset: 8, abbreviation: 'MNT', cities: ['Ulaanbaatar'], country: 'MN', region: 'Asia' },
  
  // Australia and Oceania
  { name: 'AWST', offset: 8, abbreviation: 'AWST', cities: ['Perth', 'Fremantle'], country: 'AU', region: 'Oceania' },
  { name: 'ACST', offset: 9.5, abbreviation: 'ACST', cities: ['Adelaide', 'Darwin'], country: 'AU', region: 'Oceania' },
  { name: 'AEST', offset: 10, abbreviation: 'AEST', cities: ['Sydney', 'Melbourne', 'Brisbane'], country: 'AU', region: 'Oceania' },
  { name: 'AEDT', offset: 11, abbreviation: 'AEDT', cities: ['Sydney (DST)', 'Melbourne (DST)'], country: 'AU', region: 'Oceania' },
  { name: 'NZST', offset: 12, abbreviation: 'NZST', cities: ['Auckland', 'Wellington', 'Christchurch'], country: 'NZ', region: 'Oceania' },
  { name: 'NZDT', offset: 13, abbreviation: 'NZDT', cities: ['Auckland (DST)', 'Wellington (DST)'], country: 'NZ', region: 'Oceania' },
  { name: 'FJT', offset: 12, abbreviation: 'FJT', cities: ['Suva', 'Nadi'], country: 'FJ', region: 'Oceania' },
  { name: 'NCT', offset: 11, abbreviation: 'NCT', cities: ['Nouméa'], country: 'NC', region: 'Oceania' },
  { name: 'VUT', offset: 11, abbreviation: 'VUT', cities: ['Port Vila'], country: 'VU', region: 'Oceania' },
  { name: 'SBT', offset: 11, abbreviation: 'SBT', cities: ['Honiara'], country: 'SB', region: 'Oceania' },
  { name: 'PGT', offset: 10, abbreviation: 'PGT', cities: ['Port Moresby'], country: 'PG', region: 'Oceania' },
  
  // Africa
  { name: 'WAT', offset: 1, abbreviation: 'WAT', cities: ['Lagos', 'Accra', 'Dakar'], country: 'NG', region: 'Africa' },
  { name: 'CAT', offset: 2, abbreviation: 'CAT', cities: ['Cairo', 'Johannesburg', 'Harare'], country: 'EG', region: 'Africa' },
  { name: 'EAT', offset: 3, abbreviation: 'EAT', cities: ['Nairobi', 'Addis Ababa', 'Dar es Salaam'], country: 'KE', region: 'Africa' },
  { name: 'SAST', offset: 2, abbreviation: 'SAST', cities: ['Cape Town', 'Durban', 'Pretoria'], country: 'ZA', region: 'Africa' },
  { name: 'MUT', offset: 4, abbreviation: 'MUT', cities: ['Port Louis'], country: 'MU', region: 'Africa' },
  
  // Atlantic
  { name: 'AZOT', offset: -1, abbreviation: 'AZOT', cities: ['Azores'], country: 'PT', region: 'Atlantic' },
  { name: 'CVT', offset: -1, abbreviation: 'CVT', cities: ['Praia'], country: 'CV', region: 'Atlantic' },
];

export interface TimeConversion {
  sourceTime: string;
  targetTime: string;
  dayOffset: number; // -1, 0, or 1 for previous day, same day, next day
  timeDifference: number; // in hours
}

// Convert time between timezones
export function convertTimezone(
  time: string, // HH:MM format
  fromOffset: number,
  toOffset: number,
  date?: Date // Optional specific date, defaults to today
): TimeConversion {
  const baseDate = date || new Date();
  const [hours, minutes] = time.split(':').map(Number);
  
  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error('Invalid time format. Use HH:MM');
  }
  
  // Create UTC time from source timezone
  const utcTime = new Date(baseDate);
  utcTime.setUTCHours(hours - fromOffset, minutes, 0, 0);
  
  // Convert to target timezone
  const targetDate = new Date(utcTime.getTime());
  const targetHours = targetDate.getUTCHours() + toOffset;
  const targetMinutes = targetDate.getUTCMinutes();
  
  // Handle day overflow/underflow
  let finalHours = targetHours;
  let dayOffset = 0;
  
  if (finalHours >= 24) {
    finalHours -= 24;
    dayOffset = 1;
  } else if (finalHours < 0) {
    finalHours += 24;
    dayOffset = -1;
  }
  
  const targetTime = `${finalHours.toString().padStart(2, '0')}:${targetMinutes.toString().padStart(2, '0')}`;
  const timeDifference = toOffset - fromOffset;
  
  return {
    sourceTime: time,
    targetTime,
    dayOffset,
    timeDifference
  };
}

// Get current time in a specific timezone
export function getCurrentTimeInTimezone(offset: number): string {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const timezoneTime = new Date(utc + (offset * 3600000));
  
  return timezoneTime.toTimeString().slice(0, 5);
}

// Get timezone by abbreviation
export function getTimezoneByAbbreviation(abbreviation: string): TimeZoneData | undefined {
  return worldTimeZones.find(tz => tz.abbreviation.toLowerCase() === abbreviation.toLowerCase());
}

// Get timezone by offset
export function getTimezonesByOffset(offset: number): TimeZoneData[] {
  return worldTimeZones.filter(tz => tz.offset === offset);
}

// Get timezones by region
export function getTimezonesByRegion(region: string): TimeZoneData[] {
  return worldTimeZones.filter(tz => tz.region?.toLowerCase() === region.toLowerCase());
}

// Get popular timezone pairs for quick conversion
export function getPopularTimezonePairs(): Array<{
  from: TimeZoneData;
  to: TimeZoneData;
  description: string;
}> {
  return [
    {
      from: worldTimeZones.find(tz => tz.abbreviation === 'EST')!,
      to: worldTimeZones.find(tz => tz.abbreviation === 'GMT')!,
      description: 'US East Coast to London'
    },
    {
      from: worldTimeZones.find(tz => tz.abbreviation === 'PST')!,
      to: worldTimeZones.find(tz => tz.abbreviation === 'EST')!,
      description: 'US West to East Coast'
    },
    {
      from: worldTimeZones.find(tz => tz.abbreviation === 'CST' && tz.country === 'CN')!,
      to: worldTimeZones.find(tz => tz.abbreviation === 'EST')!,
      description: 'China to US East Coast'
    },
    {
      from: worldTimeZones.find(tz => tz.abbreviation === 'JST')!,
      to: worldTimeZones.find(tz => tz.abbreviation === 'PST')!,
      description: 'Japan to US West Coast'
    },
    {
      from: worldTimeZones.find(tz => tz.abbreviation === 'CET')!,
      to: worldTimeZones.find(tz => tz.abbreviation === 'EST')!,
      description: 'Central Europe to US East'
    },
    {
      from: worldTimeZones.find(tz => tz.abbreviation === 'AEST')!,
      to: worldTimeZones.find(tz => tz.abbreviation === 'GMT')!,
      description: 'Australia to London'
    },
  ];
}

// World clock data for major cities
export function getWorldClockCities(): Array<{
  city: string;
  timezone: TimeZoneData;
  currentTime: string;
}> {
  const majorCities = [
    { city: 'New York', timezone: worldTimeZones.find(tz => tz.abbreviation === 'EST')! },
    { city: 'London', timezone: worldTimeZones.find(tz => tz.abbreviation === 'GMT')! },
    { city: 'Tokyo', timezone: worldTimeZones.find(tz => tz.abbreviation === 'JST')! },
    { city: 'Sydney', timezone: worldTimeZones.find(tz => tz.abbreviation === 'AEST')! },
    { city: 'Los Angeles', timezone: worldTimeZones.find(tz => tz.abbreviation === 'PST')! },
    { city: 'Dubai', timezone: worldTimeZones.find(tz => tz.abbreviation === 'GST')! },
    { city: 'Singapore', timezone: worldTimeZones.find(tz => tz.abbreviation === 'SGT')! },
    { city: 'Mumbai', timezone: worldTimeZones.find(tz => tz.abbreviation === 'IST' && tz.country === 'IN')! },
  ];
  
  return majorCities.map(({ city, timezone }) => ({
    city,
    timezone,
    currentTime: getCurrentTimeInTimezone(timezone.offset)
  }));
}

// Auto-detect user's timezone (approximate)
export function detectUserTimezone(): { offset: number; timezone?: TimeZoneData } {
  const now = new Date();
  const userOffset = -now.getTimezoneOffset() / 60;
  
  // Try to find a matching timezone
  const matchingTimezone = worldTimeZones.find(tz => tz.offset === userOffset);
  
  return {
    offset: userOffset,
    timezone: matchingTimezone
  };
}

// Format time with day indicator
export function formatTimeWithDay(conversion: TimeConversion): string {
  let timeString = conversion.targetTime;
  
  if (conversion.dayOffset === 1) {
    timeString += ' (+1 day)';
  } else if (conversion.dayOffset === -1) {
    timeString += ' (-1 day)';
  }
  
  return timeString;
}

// Validate time format
export function isValidTimeFormat(time: string): boolean {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
}