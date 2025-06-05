#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { join } from 'path';

// Define car data type
interface CarData {
  id: number;
  make: string;
  model: string;
  color: string;
  licensePlate: string;
}

// Realistic vehicle data
const makes = [
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes-Benz', 
  'Audi', 'Volkswagen', 'Hyundai', 'Kia', 'Mazda', 'Subaru', 'Lexus', 
  'Infiniti', 'Acura', 'Cadillac', 'Buick', 'GMC', 'Ram'
];

const modelsByMake: Record<string, string[]> = {
  'Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Prius', 'Tacoma', 'Tundra', 'Sienna'],
  'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey', 'Ridgeline', 'HR-V', 'Passport'],
  'Ford': ['F-150', 'Escape', 'Explorer', 'Mustang', 'Focus', 'Fusion', 'Edge', 'Expedition'],
  'Chevrolet': ['Silverado', 'Equinox', 'Malibu', 'Traverse', 'Tahoe', 'Suburban', 'Camaro', 'Cruze'],
  'Nissan': ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Titan', 'Versa', 'Murano', 'Armada'],
  'BMW': ['3 Series', '5 Series', 'X3', 'X5', 'X1', 'X7', '7 Series', '4 Series'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE', 'S-Class', 'A-Class', 'CLA', 'GLS'],
  'Audi': ['A4', 'A6', 'Q5', 'Q7', 'A3', 'Q3', 'A8', 'Q8'],
  'Volkswagen': ['Jetta', 'Passat', 'Tiguan', 'Atlas', 'Golf', 'Arteon', 'ID.4', 'Taos'],
  'Hyundai': ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Accent', 'Palisade', 'Veloster', 'Kona'],
  'Kia': ['Forte', 'Optima', 'Sorento', 'Sportage', 'Rio', 'Telluride', 'Soul', 'Stinger'],
  'Mazda': ['Mazda3', 'Mazda6', 'CX-5', 'CX-9', 'MX-5 Miata', 'CX-3', 'CX-30', 'CX-50'],
  'Subaru': ['Outback', 'Forester', 'Impreza', 'Legacy', 'Crosstrek', 'Ascent', 'WRX', 'BRZ'],
  'Lexus': ['ES', 'RX', 'NX', 'GX', 'IS', 'LS', 'LX', 'UX'],
  'Infiniti': ['Q50', 'Q60', 'QX60', 'QX80', 'QX50', 'Q70', 'QX30', 'Q30'],
  'Acura': ['TLX', 'MDX', 'RDX', 'ILX', 'NSX', 'TLX Type S', 'MDX Type S', 'Integra'],
  'Cadillac': ['Escalade', 'XT5', 'XT6', 'CT5', 'CT4', 'XT4', 'CT6', 'ATS'],
  'Buick': ['Enclave', 'Encore', 'Envision', 'LaCrosse', 'Regal', 'Verano', 'Cascada', 'Encore GX'],
  'GMC': ['Sierra', 'Acadia', 'Terrain', 'Yukon', 'Canyon', 'Savana', 'Suburban', 'AT4'],
  'Ram': ['1500', '2500', '3500', 'ProMaster', 'ProMaster City', 'Chassis Cab', 'Classic', 'TRX']
};

const colors = [
  'White', 'Black', 'Gray', 'Silver', 'Blue', 'Red', 'Green', 'Brown', 
  'Gold', 'Yellow', 'Orange', 'Purple', 'Beige', 'Maroon', 'Navy'
];

// Color distribution (more realistic weighting)
const colorWeights = [
  { color: 'White', weight: 25 },
  { color: 'Black', weight: 20 },
  { color: 'Gray', weight: 15 },
  { color: 'Silver', weight: 15 },
  { color: 'Blue', weight: 8 },
  { color: 'Red', weight: 7 },
  { color: 'Green', weight: 3 },
  { color: 'Brown', weight: 2 },
  { color: 'Gold', weight: 2 },
  { color: 'Yellow', weight: 1 },
  { color: 'Orange', weight: 1 },
  { color: 'Purple', weight: 0.5 },
  { color: 'Beige', weight: 0.3 },
  { color: 'Maroon', weight: 0.1 },
  { color: 'Navy', weight: 0.1 }
];

function getWeightedRandomColor(): string {
  const totalWeight = colorWeights.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const item of colorWeights) {
    random -= item.weight;
    if (random <= 0) {
      return item.color;
    }
  }
  
  return 'White'; // fallback
}

function generateLicensePlate(): string {
  // Generate format like ABC123 (3 letters + 3 numbers)
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  
  let plate = '';
  
  // 3 letters
  for (let i = 0; i < 3; i++) {
    plate += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  
  // 3 numbers
  for (let i = 0; i < 3; i++) {
    plate += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  
  return plate;
}

function generateCarData(count: number): CarData[] {
  const cars: CarData[] = [];
  const usedPlates = new Set<string>();
  
  for (let i = 1; i <= count; i++) {
    const make = makes[Math.floor(Math.random() * makes.length)] as string;
    const models = modelsByMake[make] as string[];
    const model = models[Math.floor(Math.random() * models.length)] as string;
    const color = getWeightedRandomColor();
    
    // Ensure unique license plate
    let licensePlate: string;
    do {
      licensePlate = generateLicensePlate();
    } while (usedPlates.has(licensePlate));
    
    usedPlates.add(licensePlate);
    
    cars.push({
      id: i,
      make,
      model,
      color,
      licensePlate
    });
  }
  
  return cars;
}

function generateCSV(cars: CarData[]): string {
  const header = 'id,make,model,color,licensePlate\n';
  const rows = cars.map(car => 
    `${car.id},${car.make},${car.model},${car.color},${car.licensePlate}`
  ).join('\n');
  
  return header + rows;
}

// Generate 150 cars as specified in the requirements
const cars = generateCarData(150);
const csvContent = generateCSV(cars);

// Write to data/cars-mock.csv
const outputPath = join(process.cwd(), 'data', 'cars-mock.csv');
writeFileSync(outputPath, csvContent, 'utf8');

console.log(`✅ Generated ${cars.length} mock cars and saved to ${outputPath}`);
console.log(`📊 Sample data:`);
console.log(`   Makes: ${new Set(cars.map(c => c.make)).size} unique makes`);
console.log(`   Models: ${new Set(cars.map(c => c.model)).size} unique models`);
console.log(`   Colors: ${new Set(cars.map(c => c.color)).size} unique colors`);
console.log(`   License plates: ${new Set(cars.map(c => c.licensePlate)).size} unique plates`);

// Show a few examples
console.log(`\n🚗 Sample cars:`);
cars.slice(0, 5).forEach(car => {
  console.log(`   ${car.id}: ${car.color} ${car.make} ${car.model} (${car.licensePlate})`);
}); 