// Measurement conversion utilities with high precision
export interface MeasurementUnit {
  name: string;
  symbol: string;
  factor?: number; // Conversion factor to base unit (not applicable for temperature)
  aliases?: string[];
}

export interface MeasurementCategory {
  name: string;
  baseUnit: string;
  units: Record<string, MeasurementUnit>;
  precision: number; // Number of decimal places for results
}

// Comprehensive measurement categories with precise conversion factors
export const measurementCategories: Record<string, MeasurementCategory> = {
  length: {
    name: 'Length',
    baseUnit: 'meter',
    precision: 6,
    units: {
      // Metric units
      kilometer: { name: 'Kilometer', symbol: 'km', factor: 1000 },
      meter: { name: 'Meter', symbol: 'm', factor: 1 },
      centimeter: { name: 'Centimeter', symbol: 'cm', factor: 0.01 },
      millimeter: { name: 'Millimeter', symbol: 'mm', factor: 0.001 },
      micrometer: { name: 'Micrometer', symbol: 'μm', factor: 0.000001 },
      nanometer: { name: 'Nanometer', symbol: 'nm', factor: 0.000000001 },
      
      // Imperial/US units
      mile: { name: 'Mile', symbol: 'mi', factor: 1609.344 },
      yard: { name: 'Yard', symbol: 'yd', factor: 0.9144 },
      foot: { name: 'Foot', symbol: 'ft', factor: 0.3048 },
      inch: { name: 'Inch', symbol: 'in', factor: 0.0254 },
      
      // Nautical units
      nautical_mile: { name: 'Nautical Mile', symbol: 'nmi', factor: 1852 },
      
      // Other units
      light_year: { name: 'Light Year', symbol: 'ly', factor: 9460730472580800 },
      astronomical_unit: { name: 'Astronomical Unit', symbol: 'AU', factor: 149597870700 },
    }
  },
  
  weight: {
    name: 'Weight',
    baseUnit: 'kilogram',
    precision: 8,
    units: {
      // Metric units
      metric_ton: { name: 'Metric Ton', symbol: 't', factor: 1000 },
      kilogram: { name: 'Kilogram', symbol: 'kg', factor: 1 },
      gram: { name: 'Gram', symbol: 'g', factor: 0.001 },
      milligram: { name: 'Milligram', symbol: 'mg', factor: 0.000001 },
      microgram: { name: 'Microgram', symbol: 'μg', factor: 0.000000001 },
      
      // Imperial/US units
      long_ton: { name: 'Long Ton (UK)', symbol: 'long tn', factor: 1016.0469088 },
      short_ton: { name: 'Short Ton (US)', symbol: 'short tn', factor: 907.18474 },
      pound: { name: 'Pound', symbol: 'lb', factor: 0.45359237 },
      ounce: { name: 'Ounce', symbol: 'oz', factor: 0.028349523125 },
      stone: { name: 'Stone', symbol: 'st', factor: 6.35029318 },
      
      // Troy units
      troy_pound: { name: 'Troy Pound', symbol: 'lb t', factor: 0.3732417216 },
      troy_ounce: { name: 'Troy Ounce', symbol: 'oz t', factor: 0.0311034768 },
      
      // Other units
      carat: { name: 'Carat', symbol: 'ct', factor: 0.0002 },
    }
  },
  
  temperature: {
    name: 'Temperature',
    baseUnit: 'celsius',
    precision: 4,
    units: {
      celsius: { name: 'Celsius', symbol: '°C' },
      fahrenheit: { name: 'Fahrenheit', symbol: '°F' },
      kelvin: { name: 'Kelvin', symbol: 'K' },
      rankine: { name: 'Rankine', symbol: '°R' },
      delisle: { name: 'Delisle', symbol: '°De' },
      newton: { name: 'Newton', symbol: '°N' },
      reaumur: { name: 'Réaumur', symbol: '°Ré' },
      romer: { name: 'Rømer', symbol: '°Rø' },
    }
  },
  
  volume: {
    name: 'Volume',
    baseUnit: 'liter',
    precision: 8,
    units: {
      // Metric units
      kiloliter: { name: 'Kiloliter', symbol: 'kL', factor: 1000 },
      liter: { name: 'Liter', symbol: 'L', factor: 1 },
      deciliter: { name: 'Deciliter', symbol: 'dL', factor: 0.1 },
      centiliter: { name: 'Centiliter', symbol: 'cL', factor: 0.01 },
      milliliter: { name: 'Milliliter', symbol: 'mL', factor: 0.001 },
      
      // Cubic units
      cubic_meter: { name: 'Cubic Meter', symbol: 'm³', factor: 1000 },
      cubic_centimeter: { name: 'Cubic Centimeter', symbol: 'cm³', factor: 0.001 },
      cubic_millimeter: { name: 'Cubic Millimeter', symbol: 'mm³', factor: 0.000001 },
      
      // US liquid units
      us_gallon: { name: 'US Gallon', symbol: 'gal (US)', factor: 3.785411784 },
      us_quart: { name: 'US Quart', symbol: 'qt (US)', factor: 0.946352946 },
      us_pint: { name: 'US Pint', symbol: 'pt (US)', factor: 0.473176473 },
      us_cup: { name: 'US Cup', symbol: 'cup (US)', factor: 0.2365882365 },
      us_fluid_ounce: { name: 'US Fluid Ounce', symbol: 'fl oz (US)', factor: 0.0295735296875 },
      us_tablespoon: { name: 'US Tablespoon', symbol: 'tbsp (US)', factor: 0.01478676484375 },
      us_teaspoon: { name: 'US Teaspoon', symbol: 'tsp (US)', factor: 0.00492892161458 },
      
      // Imperial units
      imperial_gallon: { name: 'Imperial Gallon', symbol: 'gal (UK)', factor: 4.54609 },
      imperial_quart: { name: 'Imperial Quart', symbol: 'qt (UK)', factor: 1.1365225 },
      imperial_pint: { name: 'Imperial Pint', symbol: 'pt (UK)', factor: 0.56826125 },
      imperial_fluid_ounce: { name: 'Imperial Fluid Ounce', symbol: 'fl oz (UK)', factor: 0.0284130625 },
      
      // Other units
      barrel_oil: { name: 'Oil Barrel', symbol: 'bbl', factor: 158.987294928 },
      barrel_us: { name: 'US Barrel', symbol: 'bbl (US)', factor: 119.240471196 },
    }
  },
  
  area: {
    name: 'Area',
    baseUnit: 'square_meter',
    precision: 8,
    units: {
      // Metric units
      square_kilometer: { name: 'Square Kilometer', symbol: 'km²', factor: 1000000 },
      hectare: { name: 'Hectare', symbol: 'ha', factor: 10000 },
      are: { name: 'Are', symbol: 'a', factor: 100 },
      square_meter: { name: 'Square Meter', symbol: 'm²', factor: 1 },
      square_centimeter: { name: 'Square Centimeter', symbol: 'cm²', factor: 0.0001 },
      square_millimeter: { name: 'Square Millimeter', symbol: 'mm²', factor: 0.000001 },
      
      // Imperial/US units
      square_mile: { name: 'Square Mile', symbol: 'mi²', factor: 2589988.110336 },
      acre: { name: 'Acre', symbol: 'ac', factor: 4046.8564224 },
      square_yard: { name: 'Square Yard', symbol: 'yd²', factor: 0.83612736 },
      square_foot: { name: 'Square Foot', symbol: 'ft²', factor: 0.09290304 },
      square_inch: { name: 'Square Inch', symbol: 'in²', factor: 0.00064516 },
    }
  },
  
  speed: {
    name: 'Speed',
    baseUnit: 'meter_per_second',
    precision: 6,
    units: {
      // Metric units
      meter_per_second: { name: 'Meter per Second', symbol: 'm/s', factor: 1 },
      kilometer_per_hour: { name: 'Kilometer per Hour', symbol: 'km/h', factor: 0.277777778 },
      
      // Imperial/US units
      mile_per_hour: { name: 'Mile per Hour', symbol: 'mph', factor: 0.44704 },
      foot_per_second: { name: 'Foot per Second', symbol: 'ft/s', factor: 0.3048 },
      
      // Other units
      knot: { name: 'Knot', symbol: 'kn', factor: 0.514444444 },
      mach: { name: 'Mach', symbol: 'M', factor: 343 }, // At sea level, 20°C
    }
  },
  
  energy: {
    name: 'Energy',
    baseUnit: 'joule',
    precision: 6,
    units: {
      // SI units
      kilojoule: { name: 'Kilojoule', symbol: 'kJ', factor: 1000 },
      joule: { name: 'Joule', symbol: 'J', factor: 1 },
      
      // Calories
      kilocalorie: { name: 'Kilocalorie', symbol: 'kcal', factor: 4184 },
      calorie: { name: 'Calorie', symbol: 'cal', factor: 4.184 },
      
      // Electrical units
      kilowatt_hour: { name: 'Kilowatt Hour', symbol: 'kWh', factor: 3600000 },
      watt_hour: { name: 'Watt Hour', symbol: 'Wh', factor: 3600 },
      
      // Other units
      btu: { name: 'British Thermal Unit', symbol: 'BTU', factor: 1055.05585262 },
      foot_pound: { name: 'Foot-Pound', symbol: 'ft⋅lbf', factor: 1.3558179483314004 },
      erg: { name: 'Erg', symbol: 'erg', factor: 0.0000001 },
    }
  }
};

// High-precision conversion function
export function convertMeasurement(
  value: number,
  fromUnit: string,
  toUnit: string,
  category: string
): { result: number; precision: number } {
  const categoryData = measurementCategories[category];
  
  if (!categoryData) {
    throw new Error(`Category "${category}" not found`);
  }
  
  const fromUnitData = categoryData.units[fromUnit];
  const toUnitData = categoryData.units[toUnit];
  
  if (!fromUnitData || !toUnitData) {
    throw new Error(`Unit not found in category "${category}"`);
  }
  
  let result: number;
  
  // Special handling for temperature conversions
  if (category === 'temperature') {
    result = convertTemperature(value, fromUnit, toUnit);
  } else {
    // Standard linear conversion using factors
    const fromFactor = fromUnitData.factor!;
    const toFactor = toUnitData.factor!;
    result = (value * fromFactor) / toFactor;
  }
  
  return {
    result,
    precision: categoryData.precision
  };
}

// Temperature conversion with all supported scales
function convertTemperature(value: number, from: string, to: string): number {
  if (from === to) return value;
  
  // First convert to Celsius as the intermediate unit
  let celsius: number;
  
  switch (from) {
    case 'celsius':
      celsius = value;
      break;
    case 'fahrenheit':
      celsius = (value - 32) * 5/9;
      break;
    case 'kelvin':
      celsius = value - 273.15;
      break;
    case 'rankine':
      celsius = (value - 491.67) * 5/9;
      break;
    case 'delisle':
      celsius = 100 - value * 2/3;
      break;
    case 'newton':
      celsius = value * 100/33;
      break;
    case 'reaumur':
      celsius = value * 5/4;
      break;
    case 'romer':
      celsius = (value - 7.5) * 40/21;
      break;
    default:
      throw new Error(`Unknown temperature unit: ${from}`);
  }
  
  // Then convert from Celsius to target unit
  switch (to) {
    case 'celsius':
      return celsius;
    case 'fahrenheit':
      return celsius * 9/5 + 32;
    case 'kelvin':
      return celsius + 273.15;
    case 'rankine':
      return (celsius + 273.15) * 9/5;
    case 'delisle':
      return (100 - celsius) * 3/2;
    case 'newton':
      return celsius * 33/100;
    case 'reaumur':
      return celsius * 4/5;
    case 'romer':
      return celsius * 21/40 + 7.5;
    default:
      throw new Error(`Unknown temperature unit: ${to}`);
  }
}

// Get formatted result with appropriate precision
export function formatResult(value: number, precision: number): string {
  if (Math.abs(value) >= 1000000) {
    return value.toExponential(3);
  }
  
  const fixed = value.toFixed(precision);
  // Remove trailing zeros and decimal point if not needed
  return fixed.replace(/\.?0+$/, '');
}

// Real-time conversion function with debouncing support
export function convertRealTime(
  amount: string,
  fromUnit: string,
  toUnit: string,
  category: string
): { result: string; error?: string } {
  try {
    const numAmount = parseFloat(amount);
    
    if (!amount || isNaN(numAmount)) {
      return { result: '' };
    }
    
    if (fromUnit === toUnit) {
      return { result: formatResult(numAmount, measurementCategories[category].precision) };
    }
    
    const conversion = convertMeasurement(numAmount, fromUnit, toUnit, category);
    return { result: formatResult(conversion.result, conversion.precision) };
    
  } catch (error) {
    return { 
      result: '', 
      error: error instanceof Error ? error.message : 'Conversion error' 
    };
  }
}

// Get common conversion examples for a category
export function getCommonConversions(category: string): Array<{
  from: string;
  to: string;
  example: string;
  description: string;
}> {
  const examples: Record<string, Array<any>> = {
    length: [
      { from: 'meter', to: 'foot', example: '1 m = 3.28 ft', description: 'Meter to Foot' },
      { from: 'kilometer', to: 'mile', example: '1 km = 0.62 mi', description: 'Kilometer to Mile' },
      { from: 'inch', to: 'centimeter', example: '1 in = 2.54 cm', description: 'Inch to Centimeter' },
      { from: 'yard', to: 'meter', example: '1 yd = 0.91 m', description: 'Yard to Meter' },
    ],
    weight: [
      { from: 'kilogram', to: 'pound', example: '1 kg = 2.20 lb', description: 'Kilogram to Pound' },
      { from: 'gram', to: 'ounce', example: '1 g = 0.035 oz', description: 'Gram to Ounce' },
      { from: 'pound', to: 'kilogram', example: '1 lb = 0.45 kg', description: 'Pound to Kilogram' },
      { from: 'metric_ton', to: 'pound', example: '1 t = 2204 lb', description: 'Metric Ton to Pound' },
    ],
    temperature: [
      { from: 'celsius', to: 'fahrenheit', example: '0°C = 32°F', description: 'Freezing Point' },
      { from: 'celsius', to: 'fahrenheit', example: '100°C = 212°F', description: 'Boiling Point' },
      { from: 'fahrenheit', to: 'celsius', example: '98.6°F = 37°C', description: 'Body Temperature' },
      { from: 'kelvin', to: 'celsius', example: '273K = 0°C', description: 'Absolute Zero Reference' },
    ],
    volume: [
      { from: 'liter', to: 'us_gallon', example: '1 L = 0.26 gal', description: 'Liter to US Gallon' },
      { from: 'us_gallon', to: 'liter', example: '1 gal = 3.79 L', description: 'US Gallon to Liter' },
      { from: 'us_cup', to: 'milliliter', example: '1 cup = 237 mL', description: 'Cup to Milliliter' },
      { from: 'us_fluid_ounce', to: 'milliliter', example: '1 fl oz = 30 mL', description: 'Fluid Ounce to Milliliter' },
    ],
  };
  
  return examples[category] || [];
}