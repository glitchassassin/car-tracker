# Car Tracker - SMOC Event

A React Router 7 application for tracking cars through an oil change process during a church outreach ministry event.

## Project Overview

The Car Tracker application helps volunteers manage the flow of vehicles through a Single Moms Oil Change (SMOC) outreach event. The application provides different interfaces for:

- **Registration Station**: Check in arriving cars and verify vehicle details
- **Floor Management**: Manage cars during the oil change process
- **Handoff Station**: Handle completed cars ready for owner pickup
- **Public Display**: Car status display for owners waiting for their vehicles

## Getting Started

### Development

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:51759`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run serve
```

## Project Structure

- `/src/App.tsx` - Main application with routing configuration
- `/src/main.tsx` - Application entry point
- `/src/index.css` - Global styles
- `/specs/prd.md` - Product Requirements Document

## Features

This foundational setup includes:

- React Router 7 with nested routing
- Basic navigation between volunteer stations
- Responsive layout structure
- TypeScript configuration
- Vite build system
