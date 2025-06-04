# Phase 2: Core Data & Basic UI - Implementation Plan

## Overview
Phase 2 establishes the data foundation for the Car Tracker application by setting up the database schema, creating mock data, and implementing data import functionality.

## Tasks Breakdown

### Task 1: Set up Prisma and define SQLite schema

#### 1.1 Prisma Installation & Configuration
- Install Prisma CLI and client packages
- Install Prisma D1 driver adapter for Cloudflare deployment
- Initialize Prisma in the project
- Configure Prisma to use SQLite database for local development
- Configure Prisma for Cloudflare D1 deployment using driver adapter
- Set up `prisma.config.ts` for D1 migration support (Early Access feature)

#### 1.2 Database Schema Design

Based on the PRD requirements, we need to design tables for:

**Cars Table:**
```prisma
model Car {
  id               Int       @id // Unique identifier for lookup
  make             String    // Vehicle make (e.g., "Toyota")
  model            String    // Vehicle model (e.g., "Camry")
  color            String    // Vehicle color (e.g., "Red")
  licensePlate     String    // License plate number
  currentStatus    Status    @default(PRE_ARRIVAL)
  registrationTime DateTime? // When status changed to REGISTERED
  serviceStartTime DateTime? // When status changed to ON_DECK
  completionTime   DateTime? // When status changed to DONE
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt
  
  // Relationship to status history
  statusHistory    StatusHistoryEntry[]
}

enum Status {
  PRE_ARRIVAL // Data loaded, car not yet arrived
  REGISTERED  // Car arrived and checked in
  ON_DECK     // Oil change in progress
  DONE        // Service complete, ready for pickup
}

model StatusHistoryEntry {
  id        Int      @id @default(autoincrement())
  carId     Int
  status    Status
  timestamp DateTime @default(now())
  
  // Relationship back to car
  car       Car      @relation(fields: [carId], references: [id], onDelete: Cascade)
  
  @@index([carId])
}
```

#### 1.3 Prisma Configuration Files
- `prisma/schema.prisma` - Main schema definition
- `prisma.config.ts` - D1 adapter configuration for migrations (Early Access)
- Environment variables for database URLs and D1 credentials
- Migration strategy for development vs production

### Task 2: Mock data in CSV

#### 2.1 CSV File Structure
Create `data/cars-mock.csv` with the following columns:
```csv
id,make,model,color,licensePlate
1,Toyota,Camry,Blue,ABC123
2,Honda,Civic,Red,XYZ789
3,Ford,F-150,White,DEF456
...
```

#### 2.2 Mock Data Requirements
- **Volume:** 100-150 car records to simulate realistic event size
- **Variety:** Mix of common vehicle makes/models/colors
- **Realistic Data:** 
  - License plates in valid format (3 letters + 3 numbers or state-specific formats)
  - Common vehicle makes: Toyota, Honda, Ford, Chevrolet, Nissan, etc.
  - Popular models for each make
  - Realistic color distribution (white, black, gray, silver most common)
- **ID Strategy:** Sequential integers starting from 1 for easy lookup

#### 2.3 Data Generation Approach
- Create a script to generate realistic mock data programmatically
- Ensure no duplicate license plates
- Validate data format before saving to CSV

### Task 3: Data import script to load from CSV

#### 3.1 Import Script Requirements
- Read CSV file and parse data
- Validate each row before database insertion
- Handle duplicate IDs gracefully
- Clear existing data before import (for development/testing)
- Provide progress feedback during import
- Error handling and reporting

#### 3.2 Script Implementation (`scripts/import-cars.ts`)
```typescript
// Pseudo-code structure:
- Parse CSV using a CSV library
- Validate each row (required fields, format checks)
- Connect to database via Prisma
- Optional: Clear existing car data
- Batch insert car records
- Create initial status history entry for each car
- Report success/failure statistics
```

#### 3.3 Script Usage
- Command line interface: `npm run import-cars`
- Optional flags:
  - `--file path/to/cars.csv` (default to `data/cars-mock.csv`)
  - `--clear` (clear existing data first)
  - `--dry-run` (validate without inserting)

## Implementation Steps

### Step 1: Prisma Setup
1. Install dependencies: `npm install prisma @prisma/client @prisma/adapter-d1`
2. Install dev dependency: `npm install -D prisma`
3. Initialize Prisma: `npx prisma init`
4. Configure database connection in `.env`
5. Set up D1 environment variables for production deployment
6. Create `prisma.config.ts` for D1 adapter configuration
7. Update `schema.prisma` with Car and StatusHistoryEntry models

### Step 2: Database Migration
1. Generate initial migration: `npx prisma migrate dev --name init` (local SQLite)
2. Generate Prisma client: `npx prisma generate`
3. Test database connection and schema locally
4. Configure D1 database for production deployment
5. Test D1 migration using `npx prisma db push` (when ready for production)

### Step 3: Mock Data Generation
1. Create `data/` directory
2. Implement data generation script
3. Generate `cars-mock.csv` with 100+ realistic records
4. Validate CSV format and data quality

### Step 4: Import Script Development
1. Create `scripts/` directory
2. Implement `import-cars.ts` script
3. Add npm script for easy execution
4. Test import functionality with mock data

### Step 5: Testing & Validation
1. Test complete import process
2. Verify data integrity in database
3. Test error handling scenarios
4. Document usage instructions

## File Structure After Phase 2

```
car-tracker/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── dev.db (local SQLite file)
├── data/
│   └── cars-mock.csv
├── scripts/
│   └── import-cars.ts
├── .env (database connection)
└── package.json (updated with scripts)
```

## Environment Configuration

### Local Development
- SQLite database: `prisma/dev.db`
- Connection string: `file:./dev.db`
- Use standard Prisma Client without adapter

### Production (Cloudflare D1)
- D1 database integration using `@prisma/adapter-d1`
- Required environment variables:
  - `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID
  - `CLOUDFLARE_DATABASE_ID` - D1 database ID
  - `CLOUDFLARE_D1_TOKEN` - API token with Account/D1/Edit permissions
- Driver adapter configuration in application code
- Migration strategy using `prisma.config.ts` and `prisma db push`

### D1 Setup Requirements

#### Environment Variables Setup
```env
# Required for D1 deployment
CLOUDFLARE_ACCOUNT_ID="your-account-id"
CLOUDFLARE_DATABASE_ID="your-database-id"
CLOUDFLARE_D1_TOKEN="your-d1-api-token"

# Local development
DATABASE_URL="file:./dev.db"
```

#### Prisma Config for D1 Migrations
Create `prisma.config.ts`:
```typescript
import path from 'node:path'
import type { PrismaConfig } from 'prisma'
import { PrismaD1HTTP } from '@prisma/adapter-d1'
import 'dotenv/config'

type Env = {
  CLOUDFLARE_D1_TOKEN: string
  CLOUDFLARE_ACCOUNT_ID: string
  CLOUDFLARE_DATABASE_ID: string
}

export default {
  earlyAccess: true,
  schema: path.join('prisma', 'schema.prisma'),
  migrate: {
    async adapter(env) {
      return new PrismaD1HTTP({
        CLOUDFLARE_D1_TOKEN: env.CLOUDFLARE_D1_TOKEN,
        CLOUDFLARE_ACCOUNT_ID: env.CLOUDFLARE_ACCOUNT_ID,
        CLOUDFLARE_DATABASE_ID: env.CLOUDFLARE_DATABASE_ID,
      })
    },
  },
} satisfies PrismaConfig<Env>
```

#### D1 Migration Strategy

**For Local Development:**
- Use standard SQLite with `npx prisma migrate dev`
- Database stored in `prisma/dev.db`
- Standard Prisma Client without adapter

**For Production (D1):**
- Use `npx prisma db push` with D1 adapter (Early Access feature)
- Requires `prisma.config.ts` configuration
- Use `PrismaD1` adapter in application code

## Validation Criteria

### Schema Validation
- [ ] All required fields are properly typed and constrained
- [ ] Relationships between tables are correctly defined
- [ ] Indexes are optimized for lookup patterns
- [ ] Status enum includes all required values

### Mock Data Validation
- [ ] CSV contains 100+ realistic car records
- [ ] No duplicate IDs or license plates
- [ ] Data follows realistic distribution patterns
- [ ] All required fields are populated

### Import Script Validation
- [ ] Successfully imports all mock data
- [ ] Handles errors gracefully
- [ ] Provides clear progress feedback
- [ ] Can be run multiple times safely

## Future Considerations

### Performance
- Database indexes for common lookup patterns (ID, status)
- Batch operations for status updates
- Connection pooling considerations (note: D1 is serverless)

### Data Integrity
- Validation constraints at database level
- Foreign key relationships with proper cascade rules
- Status transition validation (could be added in Phase 3)
- **Important**: D1 does not support transactions - design around this limitation

### Scalability
- Schema supports event history tracking
- Extensible for additional car metadata
- Prepared for real-time update patterns in Phase 5
- D1 automatic read-replication for geographic distribution

## Dependencies

### New Package Dependencies
```json
{
  "dependencies": {
    "@prisma/client": "^latest",
    "@prisma/adapter-d1": "^latest"
  },
  "devDependencies": {
    "prisma": "^latest",
    "csv-parser": "^latest",
    "@types/csv-parser": "^latest",
    "dotenv": "^latest"
  }
}
```

### NPM Scripts to Add
```json
{
  "scripts": {
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:push": "prisma db push",
    "db:reset": "prisma migrate reset",
    "db:studio": "prisma studio",
    "import-cars": "tsx scripts/import-cars.ts"
  }
}
```

## D1-Specific Limitations & Considerations

### Known Limitations
- **No Transaction Support**: D1 currently does not support transactions ([open feature request](https://github.com/cloudflare/workers-sdk/issues/1719))
  - Prisma transactions will be ignored and run as individual queries
  - Design application logic to handle potential inconsistencies
  - Use compensating actions for critical operations
  - **Note**: We should add a Cursor rule to enforce this limitation and prevent accidental transaction usage

### Migration Considerations
- **Early Access**: `prisma db push` via driver adapter is in Early Access (v6.6.0+)
- **Remote Only**: Native Prisma Migrate with D1 adapter only supports remote databases
- **Local vs Remote**: Use different strategies for local development vs production

### Development Workflow
- **Local**: Standard SQLite + Prisma Migrate
- **Production**: D1 + driver adapter + `prisma db push`
- **Testing**: Consider separate D1 instance for staging

## Risk Mitigation

### Database Risks
- **Schema Changes:** Use Prisma migrations for local development, `prisma db push` for D1
- **Data Loss:** Backup strategy for production D1 database
- **Performance:** Monitor query performance; leverage D1's auto-replication
- **Transaction Limitations:** Design atomic operations and error recovery patterns

### Import Risks
- **Bad Data:** Comprehensive validation before database insertion
- **Large Files:** Stream processing for large CSV files
- **Duplicate Runs:** Idempotent import process with clear/replace option
- **D1 Limitations:** Account for lack of transaction support in import script

## Success Criteria

Phase 2 is complete when:
1. Prisma is fully configured for both local SQLite and D1 deployment
2. Database schema is implemented and tested locally
3. D1 configuration and migration strategy is documented and tested
4. Mock CSV data is generated with realistic, valid data
5. Import script successfully loads all mock data (local and D1)
6. Database queries work correctly through Prisma client in both environments
7. All validation criteria are met
8. Documentation covers both local development and D1 deployment workflows 