export const EMISSION_FACTORS = {
  excavation: {
    id: 'excavation',
    name: 'Excavation Operations',
    category: 'excavation',
    quantity: 0,
    unit: 'tonnes of coal',
    emissionFactor: 2.3, // kg CO2e per tonne
    description: 'Direct emissions from excavation activities'
  },
  hauling: {
    id: 'hauling',
    name: 'Coal Hauling',
    category: 'transportation',
    quantity: 0,
    unit: 'km-tonnes',
    emissionFactor: 0.15, // kg CO2e per km-tonne
    description: 'Emissions from coal transportation'
  },
  processing: {
    id: 'processing',
    name: 'Coal Processing',
    category: 'processing',
    quantity: 0,
    unit: 'tonnes processed',
    emissionFactor: 1.8,
    description: 'Emissions from coal washing and processing'
  },
  diesel_equipment: {
    id: 'diesel_equipment',
    name: 'Diesel Equipment',
    category: 'equipment',
    quantity: 0,
    unit: 'liters diesel',
    emissionFactor: 2.68,
    description: 'Emissions from diesel-powered mining equipment'
  },
  electricity: {
    id: 'electricity',
    name: 'Electricity Consumption',
    category: 'energy',
    quantity: 0,
    unit: 'kWh',
    emissionFactor: 0.82,
    description: 'Emissions from grid electricity consumption'
  },
  methane: {
    id: 'methane',
    name: 'Methane Emissions',
    category: 'excavation',
    quantity: 0,
    unit: 'tonnes coal',
    emissionFactor: 15.2,
    description: 'Methane emissions from coal seams'
  }
};

export const CLEAN_TECHNOLOGIES = [
  {
    id: 'electric_vehicles',
    name: 'Electric Mining Vehicles',
    category: 'transport',
    emissionReduction: 65,
    implementationCost: 50000000,
    paybackPeriod: 6,
    description: 'Replace diesel vehicles with electric alternatives'
  },
  {
    id: 'solar_power',
    name: 'Solar Power Installation',
    category: 'energy',
    emissionReduction: 40,
    implementationCost: 25000000,
    paybackPeriod: 8,
    description: 'Install solar panels for mine operations'
  },
  {
    id: 'methane_capture',
    name: 'Methane Capture System',
    category: 'methane',
    emissionReduction: 80,
    implementationCost: 30000000,
    paybackPeriod: 5,
    description: 'Capture and utilize methane emissions'
  },
  {
    id: 'energy_efficiency',
    name: 'Energy Efficient Equipment',
    category: 'equipment',
    emissionReduction: 25,
    implementationCost: 15000000,
    paybackPeriod: 4,
    description: 'Upgrade to energy-efficient mining equipment'
  }
];

export const AFFORESTATION_SPECIES = {
  eucalyptus: {
    species: 'Eucalyptus',
    survivalRate: 85,
    carbonAbsorption: 22,
    plantingCost: 25,
    maintenanceCost: 8
  },
  bamboo: {
    species: 'Bamboo',
    survivalRate: 90,
    carbonAbsorption: 35,
    plantingCost: 15,
    maintenanceCost: 5
  },
  neem: {
    species: 'Neem',
    survivalRate: 80,
    carbonAbsorption: 20,
    plantingCost: 30,
    maintenanceCost: 10
  },
  teak: {
    species: 'Teak',
    survivalRate: 75,
    carbonAbsorption: 18,
    plantingCost: 40,
    maintenanceCost: 12
  }
};

export const CARBON_ABSORPTION_RATES = {
  forest: 4.6, // tonnes CO2 per hectare per year
  grassland: 1.8,
  wetland: 6.2,
  soil: 0.3
};

export const CARBON_CREDIT_RATES = {
  voluntary: 800, // INR per tonne CO2
  compliance: 1200,
  afforestation: 600,
  renewable: 900
};

export const INDIAN_STATES = [
  'Jharkhand', 'Odisha', 'Chhattisgarh', 'West Bengal', 'Telangana',
  'Andhra Pradesh', 'Maharashtra', 'Madhya Pradesh', 'Assam', 'Meghalaya'
];
