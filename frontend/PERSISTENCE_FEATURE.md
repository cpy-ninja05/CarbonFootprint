# Data Persistence Feature

## Overview
The Carbon Footprint application now automatically saves all user data to the browser's local storage, ensuring that calculations, carbon sinks, and settings persist across browser sessions.

## What Gets Saved
- **Emission Calculator Data**: All activity quantities and emission factors
- **Mine Profile**: Workforce count and annual production values
- **Carbon Sinks**: All added carbon sink entries with their properties
- **Neutrality Pathways**: Selected clean technologies and afforestation plans
- **User Preferences**: Any custom settings or configurations

## How It Works
1. **Automatic Saving**: Data is saved to localStorage immediately when users make changes
2. **Cross-Session Persistence**: Data remains available when users close and reopen the browser
3. **Browser-Specific**: Data is stored locally in each user's browser (not shared across devices)

## Data Management Features

### Export Data
- Users can export all their data as a JSON file
- Useful for backup purposes or transferring data to another device
- Accessible from the Dashboard → Data Management section

### Import Data
- Users can import previously exported data
- Replaces all current data with imported data
- Useful for restoring from backup or transferring between devices

### Data Summary
- View a summary of all saved data
- Shows counts and current values for each data category
- Accessible from the Dashboard → Data Management section

### Clear All Data
- Option to reset all data to default values
- Requires confirmation to prevent accidental data loss
- Useful for starting fresh or testing purposes

## Technical Implementation

### Storage Keys
All data is stored with descriptive keys in localStorage:
- `carbon-footprint-activities`: Emission calculation activities
- `carbon-footprint-sinks`: Carbon sink entries
- `carbon-footprint-workforce`: Mine workforce count
- `carbon-footprint-annual-production`: Annual production value
- `carbon-footprint-selected-technologies`: Selected clean technologies
- `carbon-footprint-afforestation-plan`: Afforestation plan details

### Custom Hook
The `useLocalStorage` hook provides:
- Automatic loading of saved data on component mount
- Automatic saving of data changes
- Cross-tab synchronization
- Error handling for corrupted data

### Data Validation
- JSON parsing with error handling
- Fallback to default values if data is corrupted
- Graceful degradation if localStorage is unavailable

## User Experience
- **Visual Indicators**: Each component shows "Auto-save enabled" status
- **Transparent Operation**: Users don't need to manually save anything
- **Immediate Feedback**: Data is saved as soon as changes are made
- **No Interruption**: Saving happens in the background without affecting performance

## Browser Compatibility
- Works in all modern browsers that support localStorage
- Gracefully degrades if localStorage is not available
- No additional dependencies or setup required

## Security Considerations
- Data is stored locally on the user's device
- No data is transmitted to external servers
- Users have full control over their data
- Data can be easily cleared or exported

## Future Enhancements
- Cloud synchronization (optional)
- Data versioning and history
- Automatic backup scheduling
- Data compression for large datasets
