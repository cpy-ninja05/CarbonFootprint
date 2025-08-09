/**
 * @typedef {Object} MiningActivity
 * @property {string} id
 * @property {string} name
 * @property {'excavation' | 'transportation' | 'processing' | 'equipment' | 'energy'} category
 * @property {number} quantity
 * @property {string} unit
 * @property {number} emissionFactor // kg CO2e per unit
 * @property {string} description
 */

/**
 * @typedef {Object} CarbonSink
 * @property {string} id
 * @property {'forest' | 'grassland' | 'wetland' | 'soil'} type
 * @property {number} area // in hectares
 * @property {number} absorptionRate // kg CO2 per hectare per year
 * @property {number} currentAge // years
 * @property {number} maturityAge // years for full absorption capacity
 */

/**
 * @typedef {Object} CleanTechnology
 * @property {string} id
 * @property {string} name
 * @property {'transport' | 'energy' | 'methane' | 'equipment'} category
 * @property {number} emissionReduction // percentage
 * @property {number} implementationCost // in INR
 * @property {number} paybackPeriod // in years
 * @property {string} description
 */

/**
 * @typedef {Object} AfforestationPlan
 * @property {string} species
 * @property {number} survivalRate // percentage
 * @property {number} carbonAbsorption // kg CO2 per tree per year
 * @property {number} plantingCost // INR per tree
 * @property {number} maintenanceCost // INR per tree per year
 */

/**
 * @typedef {Object} MineProfile
 * @property {string} name
 * @property {'opencast' | 'underground'} type
 * @property {string} location
 * @property {string} state
 * @property {number} area // in hectares
 * @property {number} workforce
 * @property {number} annualProduction // in million tonnes
 */

/**
 * @typedef {Object} EmissionResult
 * @property {number} totalEmissions
 * @property {Object.<string, number>} categoryBreakdown
 * @property {number} perCapitaEmissions
 * @property {number} emissionsPerTonne
 */

/**
 * @typedef {Object} NeutralityPathway
 * @property {string} id
 * @property {string} name
 * @property {string[]} strategies
 * @property {number} emissionReduction
 * @property {number} cost
 * @property {number} timeframe // years
 * @property {'high' | 'medium' | 'low'} feasibility
 */

/**
 * @typedef {Object} CarbonCredit
 * @property {string} type
 * @property {number} quantity // tonnes CO2
 * @property {number} pricePerTonne // INR
 * @property {number} totalValue // INR
 * @property {string} validity // years
 */
