// Data management utilities for the Carbon Footprint application

export const STORAGE_KEYS = {
  ACTIVITIES: 'carbon-footprint-activities',
  SINKS: 'carbon-footprint-sinks',
  WORKFORCE: 'carbon-footprint-workforce',
  ANNUAL_PRODUCTION: 'carbon-footprint-annual-production',
  SELECTED_TECHNOLOGIES: 'carbon-footprint-selected-technologies',
  AFFORESTATION_PLAN: 'carbon-footprint-afforestation-plan'
};

export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
  // Reload the page to reset all state
  window.location.reload();
};

export const exportData = () => {
  const data = {};
  Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
    try {
      const value = localStorage.getItem(storageKey);
      if (value) {
        data[key] = JSON.parse(value);
      }
    } catch (error) {
      console.error(`Error reading ${storageKey}:`, error);
    }
  });
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `carbon-footprint-data-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const importData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        Object.entries(data).forEach(([key, value]) => {
          if (STORAGE_KEYS[key]) {
            localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
          }
        });
        resolve();
      } catch (error) {
        reject(new Error('Invalid data format'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

export const getDataSummary = () => {
  const summary = {};
  Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
    try {
      const value = localStorage.getItem(storageKey);
      if (value) {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          summary[key] = `${parsed.length} items`;
        } else if (typeof parsed === 'object' && parsed !== null) {
          summary[key] = `${Object.keys(parsed).length} items`;
        } else {
          summary[key] = parsed;
        }
      } else {
        summary[key] = 'Not set';
      }
    } catch (error) {
      summary[key] = 'Error reading data';
    }
  });
  return summary;
};
