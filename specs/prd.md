# Car Tracker - Product Requirements Document

## Project Overview

**Project Name:** SMOC Car Tracker  
**Project Type:** Web Application  
**Timeline:** Single-day event application  
**Purpose:** Track cars through oil change process during church outreach ministry event

## Problem Statement

Our church is hosting a free single moms oil change outreach event (SMOC) where volunteers will service community members' vehicles. We need a simple, easy-to-use system to:
- Track cars as they progress through the oil change process
- Provide real-time status updates to car owners via projector display
- Enable volunteers to easily update car status via mobile devices
- Generate post-event reports on processing times

## Target Users

### Primary Users
1. **Registration Volunteer**
   - Stationed at car drop-off area
   - Looks up arriving cars by ID
   - Verifies vehicle details (license plate, color, make/model)
   - Transitions cars from pre-loaded data to "Registered" status

2. **Floor Volunteer** 
   - Manages cars waiting for and undergoing oil changes
   - Looks up cars by ID or selects from "Registered" queue
   - Verifies vehicle details before service begins
   - Transitions cars to "On Deck" status when oil change starts

3. **Handoff Volunteer**
   - Stationed at vehicle pickup area
   - Receives keys when vehicles are parked after service
   - Looks up cars by ID or selects from "On Deck" queue
   - Transitions cars to "Done" status when ready for owner pickup

4. **Car Owners (Projector Display)**
   - Community members waiting for their vehicles
   - Need clear, visible status information
   - Passive viewing experience

### Secondary Users
5. **Event Coordinators**
   - Pre-populate vehicle data before event
   - Monitor overall operation
   - Generate post-event reports

## Core Features

### 1. Car Data Management
- **Pre-Event Setup:**
  - Developer side-loads car data into database
  - Cars initially have no status (awaiting arrival)
  - Each car has unique ID for lookup

### 2. Car Lookup & Verification
- **ID-Based Search:**
  - Quick numeric ID lookup
  - Large, touch-friendly search interface
  - Auto-complete suggestions

- **Queue-Based Selection:**
  - Quick list view of cars in previous status
  - Visual car cards with key details
  - One-tap selection

- **Vehicle Verification:**
  - Display car details for confirmation
  - License plate, color, make/model verification
  - Clear "Confirm" or "Not a Match" options

### 3. Status Tracking
- **Four Status Phases:**
  1. **Pre-Arrival** - Car data loaded, awaiting arrival
  2. **Registered** - Car arrived, verified by Registration Volunteer
  3. **On Deck** - Oil change in progress, managed by Floor Volunteer
  4. **Done** - Service complete, keys with Handoff Volunteer

### 4. Volunteer Interface (Mobile-Optimized)
- Role-specific landing pages
- Large, touch-friendly buttons
- Clear car identification display
- One-tap status transitions
- Visual confirmation of updates
- Search and quick-select capabilities

### 5. Public Display Interface (Projector)
- Large, readable text and status indicators
- Color-coded status system
- Auto-refresh functionality

### 6. Reporting System
- Service time tracking per vehicle
- Total cars processed
- Average processing time
- Volunteer efficiency metrics
- Export capabilities (CSV/PDF)

## User Stories

### Registration Volunteer Stories
- As a registration volunteer, I want to quickly look up a car by its ID when owners arrive
- As a registration volunteer, I want to verify the car details match what I see so I confirm the right vehicle
- As a registration volunteer, I want to register the car with one tap so I can move to the next customer quickly
- As a registration volunteer, I want clear feedback when registration is complete so I know to tell the owner to wait

### Floor Volunteer Stories
- As a floor volunteer, I want to see a list of registered cars waiting for service so I can pick the next one
- As a floor volunteer, I want to look up a specific car by ID if someone asks about it
- As a floor volunteer, I want to verify I have the right car before starting service
- As a floor volunteer, I want to mark a car as "On Deck" when we start the oil change

### Handoff Volunteer Stories
- As a handoff volunteer, I want to see which cars are ready for pickup so I can prepare
- As a handoff volunteer, I want to quickly mark a car as "Done" when I receive the keys
- As a handoff volunteer, I want owners to immediately see their car is ready on the display

### Car Owner Stories
- As a car owner, I want to see my car's current status on the display so I know if it's ready to pick up
- As a car owner, I want clear visual indicators so I can easily spot my car's status from across the room

### Event Coordinator Stories
- As an event coordinator, I want to pre-populate vehicle registration data so volunteers have less to enter
- As an event coordinator, I want to see how many cars we've processed so I can track our impact
- As an event coordinator, I want to know average processing times so I can improve future events
- As an event coordinator, I want to export data for ministry reports

## Volunteer Workflows

### Registration Volunteer Workflow
1. Car owner approaches drop-off area
2. Volunteer asks for car ID (provided during pre-registration)
3. Volunteer searches for car by ID in app
4. App displays car details (make/model/color/license plate)
5. Volunteer verifies details match physical vehicle
6. If match: Volunteer taps "Register Car" → Status changes to "Registered"
7. If no match: Volunteer taps "Not a Match" → Escalate to coordinator
8. Volunteer directs owner to waiting area

### Floor Volunteer Workflow
1. Volunteer checks "Registered Cars" queue or searches by ID
2. Volunteer selects next car for service
3. App displays car details for verification
4. Volunteer verifies details match physical vehicle
5. Volunteer taps "Start Service" → Status changes to "On Deck"
6. Oil change team begins work on vehicle
7. When service complete, car is moved to pickup area

### Handoff Volunteer Workflow
1. Valet brings keys to handoff volunteer
2. Volunteer checks "On Deck Cars" list or searches by ID
3. Volunteer selects the completed vehicle
4. App displays car details for verification
5. Volunteer confirms keys match vehicle details
6. Volunteer taps "Ready for Pickup" → Status changes to "Done"
7. Car owner sees status change on public display

## Technical Requirements

### Platform
- Web application (responsive design)
- Mobile-first approach for volunteer interface
- Large screen optimization for projector display

### Device Support
- iOS Safari (tablets/phones)
- Android Chrome (tablets/phones)
- Desktop browsers (for setup and reporting)

### Performance
- Fast load times on mobile networks
- Real-time updates via Server-Sent Events (SSE)
- Automatic loader revalidation on status changes

### Accessibility
- Large touch targets (minimum 44px)
- High contrast color scheme
- Simple navigation
- Minimal cognitive load

## User Interface Design Principles

### Volunteer Interface
- **Simplicity First:** Minimal steps to complete tasks
- **Error Prevention:** Clear confirmation dialogs
- **Visual Feedback:** Immediate response to actions
- **Forgiveness:** Easy undo/correction capabilities

### Public Display
- **High Visibility:** Large fonts, clear colors
- **Status Clarity:** Obvious visual hierarchy
- **Auto-Update:** No manual refresh required
- **Professional Appearance:** Reflects well on church ministry

## Data Model

### Car Entity
```
- ID (assigned during pre-registration)
- Make/Model
- Color
- License Plate
- Registration Time (when status changes to "Registered")
- Service Start Time (when status changes to "On Deck")
- Completion Time (when status changes to "Done")
- Current Status
- Status History (with timestamps)
```

### Status Options
```
- PRE_ARRIVAL (Gray) - Data loaded, car not yet arrived
- REGISTERED (Blue) - Car arrived and checked in
- ON_DECK (Yellow/Orange) - Oil change in progress
- DONE (Green) - Service complete, ready for pickup
```

## Success Metrics

### Event Day Success
- Zero data loss during event
- < 5 second status update time
- Minimal volunteer training required
- Positive feedback from car owners

### Operational Success
- Average processing time per vehicle
- Total vehicles served
- Error rate in status updates

## Technical Considerations

### Architecture
- React Router 7 on Cloudflare
- SQLite database
- Server-Sent Events for real-time updates
- Loader revalidation pattern for data freshness

### Security
- No sensitive personal data storage
- Online endpoints only update status; data is side-loaded via scripts

### Scalability
- Support for 100-150 cars per day
- 5-10 concurrent volunteer users
- Multiple simultaneous display screens

## Risk Mitigation

### Technical Risks
- **Internet connectivity issues:** Users must maintain connection for live updates; clear indicators when connection is lost with instructions to reconnect
- **Device compatibility:** Thorough testing on the actual tablets

### User Experience Risks
- **Complex interface:** Extensive user testing with actual volunteers
- **Status confusion:** Clear visual design and confirmation flows

## Implementation Phases

### Phase 1: Foundation & Deployment

- [x] Initialize React Router 7 project with default content
- [x] Set up Tailwind v4
- [x] Set up eslint/prettier rules with @epicweb-dev/config
- [x] Set up Wrangler config to deploy to Cloudflare
- [x] Set up Playwright e2e tests
- [x] Configure GitHub Action for build, test, and deployment
- [x] Configure deployment to PR environments for review

### Phase 2: Core Data

- [x] Set up D1 and define SQLite schema
- [x] Mock data in CSV
- [x] Data import script to load from CSV

### Phase 3: Volunteer Workflows

- [ ] Create an index route to select one of the volunteer interfaces
- [ ] Build all three volunteer interfaces, with loaders and actions to read and write from db
- [ ] Implement car search and verification flows
- [ ] Add status transition buttons to trigger the action
- [ ] Create car detail verification screens
- [ ] Add basic error handling and validation
- [ ] E2E tests for each workflow

### Phase 4: Public Display Interface

- [ ] Create projector-optimized display layout
- [ ] Implement car status listing with color coding

### Phase 5: Real-time Updates

- [ ] Implement Server-Sent Events endpoint, triggered by actions
- [ ] Add loader revalidation on SSE events
- [ ] Connection status indicators
- [ ] Disconnect recovery (refreshing page when Internet connection is reestablished)
- [ ] e2e tests for real-time functionality

### Phase 6: Reporting

- [ ] Build reporting interface
- [ ] Add data export capabilities


