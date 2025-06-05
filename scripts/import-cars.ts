#!/usr/bin/env node

/*
 * Car Import Script
 * 
 * This script imports car data from a CSV file into the car-tracker database.
 * It can target either local or remote Cloudflare D1 database environments.
 * 
 * Usage:
 *   npm run import-cars [options]
 *   
 * Options:
 *   --file=<path>     Path to CSV file (default: data/cars-mock.csv)
 *   --clear           Clear existing data before import
 *   --dry-run         Validate data without inserting into database
 *   --remote          Target remote database (default: local)
 * 
 * Examples:
 * 
 *   # Import to local database with default file
 *   npm run import-cars
 * 
 *   # Import to local database with custom file and clear existing data
 *   npm run import-cars -- --file=data/my-cars.csv --clear
 * 
 *   # Validate data without importing (dry run)
 *   npm run import-cars -- --dry-run
 * 
 *   # Import to remote database (production)
 *   npm run import-cars -- --remote --clear
 * 
 *   # Import custom file to remote database
 *   npm run import-cars -- --file=data/production-cars.csv --remote --clear
 * 
 * CSV Format:
 *   The CSV file should contain columns: id, make, model, color, licensePlate
 *   All fields are required and id must be a number.
 * 
 * Prerequisites:
 *   - Wrangler CLI must be installed and authenticated
 *   - For remote imports, ensure you have proper permissions
 */

import { execSync } from 'child_process';
import { createReadStream } from 'fs';
import { resolve } from 'path';
import csv from 'csv-parser';

// Type for CSV row data
interface CSVCarData {
  id: string;
  make: string;
  model: string;
  color: string;
  licensePlate: string;
}

// Command line arguments
const args = process.argv.slice(2);
const flags = {
  file: args.find(arg => arg.startsWith('--file='))?.split('=')[1] || 'data/cars-mock.csv',
  clear: args.includes('--clear'),
  dryRun: args.includes('--dry-run'),
  remote: args.includes('--remote')
};

async function validateRow(row: CSVCarData, rowNumber: number): Promise<{ valid: boolean; errors: string[] }> {
  const errors: string[] = [];
  
  // Check required fields
  if (!row.id || row.id.trim() === '') {
    errors.push(`Row ${rowNumber}: ID is required`);
  } else if (isNaN(parseInt(row.id))) {
    errors.push(`Row ${rowNumber}: ID must be a number`);
  }
  
  if (!row.make || row.make.trim() === '') {
    errors.push(`Row ${rowNumber}: Make is required`);
  }
  
  if (!row.model || row.model.trim() === '') {
    errors.push(`Row ${rowNumber}: Model is required`);
  }
  
  if (!row.color || row.color.trim() === '') {
    errors.push(`Row ${rowNumber}: Color is required`);
  }
  
  if (!row.licensePlate || row.licensePlate.trim() === '') {
    errors.push(`Row ${rowNumber}: License plate is required`);
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

function executeD1Command(command: string): string {
  const remoteFlag = flags.remote ? '--remote' : '--local';
  const fullCommand = `npx wrangler d1 execute car-tracker-db ${remoteFlag} --command "${command}"`;
  try {
    return execSync(fullCommand, { encoding: 'utf8' });
  } catch (error: any) {
    throw new Error(`D1 command failed: ${error.message}`);
  }
}

async function clearExistingData() {
  console.log('🗑️  Clearing existing car data...');
  
  try {
    // Delete in order due to foreign key constraints
    executeD1Command('DELETE FROM status_history_entries;');
    executeD1Command('DELETE FROM cars;');
    console.log('✅ Existing data cleared');
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
}

async function importCars() {
  const filePath = resolve(flags.file);
  console.log(`📁 Reading CSV file: ${filePath}`);
  
  if (flags.dryRun) {
    console.log('🔍 DRY RUN MODE - No data will be inserted');
  }
  
  const cars: Array<{ id: number; make: string; model: string; color: string; licensePlate: string }> = [];
  const errors: string[] = [];
  let rowNumber = 0;
  
  return new Promise<void>((resolve, reject) => {
    createReadStream(filePath)
      .pipe(csv())
      .on('data', async (row: CSVCarData) => {
        rowNumber++;
        
        const validation = await validateRow(row, rowNumber);
        if (!validation.valid) {
          errors.push(...validation.errors);
          return;
        }
        
        cars.push({
          id: parseInt(row.id),
          make: row.make.trim(),
          model: row.model.trim(),
          color: row.color.trim(),
          licensePlate: row.licensePlate.trim()
        });
      })
      .on('end', async () => {
        if (errors.length > 0) {
          console.error('❌ Validation errors found:');
          errors.forEach(error => console.error(`   ${error}`));
          reject(new Error(`${errors.length} validation errors found`));
          return;
        }
        
        console.log(`✅ Parsed ${cars.length} valid car records`);
        
        if (!flags.dryRun) {
          try {
            if (flags.clear) {
              await clearExistingData();
            }
            
            console.log('📥 Importing cars to database...');
            
            // Insert cars in batches
            const batchSize = 50;
            let imported = 0;
            
            for (let i = 0; i < cars.length; i += batchSize) {
              const batch = cars.slice(i, i + batchSize);
              
              // Create SQL INSERT statements for this batch
              const carInserts = batch.map(car => 
                `INSERT INTO cars (id, make, model, color, license_plate) VALUES (${car.id}, '${car.make.replace(/'/g, "''")}', '${car.model.replace(/'/g, "''")}', '${car.color.replace(/'/g, "''")}', '${car.licensePlate.replace(/'/g, "''")}');`
              ).join(' ');
              
              const historyInserts = batch.map(car => 
                `INSERT INTO status_history_entries (car_id, status) VALUES (${car.id}, 'PRE_ARRIVAL');`
              ).join(' ');
              
              // Execute batch inserts
              executeD1Command(carInserts);
              executeD1Command(historyInserts);
              
              imported += batch.length;
              console.log(`   📊 Imported ${imported}/${cars.length} cars...`);
            }
            
            console.log(`✅ Successfully imported ${imported} cars`);
            
            // Show some statistics
            try {
              const statsResult = executeD1Command('SELECT make, COUNT(*) as count FROM cars GROUP BY make ORDER BY count DESC LIMIT 5;');
              console.log('\n📊 Import Statistics:');
              console.log(`   Total cars: ${imported}`);
              console.log('   Statistics from database:', statsResult);
            } catch (error) {
              console.log('\n📊 Import Statistics:');
              console.log(`   Total cars: ${imported}`);
            }
            
          } catch (error) {
            console.error('❌ Database error:', error);
            reject(error);
            return;
          }
        } else {
          console.log('🔍 DRY RUN COMPLETE - Data validated successfully');
        }
        
        resolve();
      })
      .on('error', (error) => {
        console.error('❌ Error reading CSV file:', error);
        reject(error);
      });
  });
}

async function main() {
  try {
    console.log('🚗 Car Import Script (Direct D1)');
    console.log(`   File: ${flags.file}`);
    console.log(`   Clear existing data: ${flags.clear}`);
    console.log(`   Dry run: ${flags.dryRun}`);
    console.log(`   Target: ${flags.remote ? 'Remote' : 'Local'} database`);
    console.log('');
    
    await importCars();
    
    console.log('\n🎉 Import completed successfully!');
  } catch (error) {
    console.error('\n💥 Import failed:', error);
    process.exit(1);
  }
}

void main(); 