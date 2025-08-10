import React from 'react';
import { Route, TrendingUp, DollarSign, Clock, CheckCircle, Save } from 'lucide-react';
import { CLEAN_TECHNOLOGIES, AFFORESTATION_SPECIES, CARBON_CREDIT_RATES } from '../data/constants';
import { useLocalStorage } from '../hooks/useLocalStorage';

const NeutralityPathways = ({
  emissionResults,
  carbonSinkCapacity,
  neutralityGap,
  calculateTechnologyImpact
}) => {
  const [selectedTechnologies, setSelectedTechnologies] = useLocalStorage('carbon-footprint-selected-technologies', []);
  const [afforestationPlan, setAfforestationPlan] = useLocalStorage('carbon-footprint-afforestation-plan', {
    species: 'eucalyptus',
    area: 0
  });

  const toggleTechnology = (techId) => {
    setSelectedTechnologies(prev =>
      prev.includes(techId)
        ? prev.filter(id => id !== techId)
        : [...prev, techId]
    );
  };

  const calculateAfforestationRequirement = () => {
    const species = AFFORESTATION_SPECIES[afforestationPlan.species];
    const treesPerHectare = 400; // Average trees per hectare
    const totalTrees = afforestationPlan.area * treesPerHectare;
    const annualAbsorption = totalTrees * species.carbonAbsorption * (species.survivalRate / 100);
    const totalCost = totalTrees * (species.plantingCost + species.maintenanceCost * 5); // 5 years maintenance
    
    return {
      treesRequired: totalTrees,
      annualAbsorption: annualAbsorption / 1000, // Convert to tonnes
      totalCost,
      yearsToNeutrality: neutralityGap / (annualAbsorption / 1000)
    };
  };

  const calculateCombinedImpact = () => {
    let totalReduction = 0;
    let totalCost = 0;
    
    selectedTechnologies.forEach(techId => {
      const tech = CLEAN_TECHNOLOGIES.find(t => t.id === techId);
      if (tech) {
        const impact = calculateTechnologyImpact(tech);
        totalReduction += impact.reductionAmount;
        totalCost += tech.implementationCost;
      }
    });

    const afforestation = calculateAfforestationRequirement();
    const remainingGap = Math.max(0, neutralityGap - totalReduction);
    
    return {
      technologyReduction: totalReduction,
      afforestationAbsorption: afforestation.annualAbsorption,
      totalCost: totalCost + afforestation.totalCost,
      remainingGap,
      isNeutral: remainingGap <= afforestation.annualAbsorption
    };
  };

  const combinedImpact = calculateCombinedImpact();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Route className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">Carbon Neutrality Pathways</h2>
          </div>
          <div className="flex items-center space-x-2 text-green-600">
            <Save className="h-4 w-4" />
            <span className="text-sm font-medium">Auto-save enabled</span>
          </div>
        </div>

        {/* Current Status */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Current Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-red-600">
                {emissionResults.totalEmissions.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </p>
              <p className="text-sm text-gray-600">Total Emissions (t CO₂e)</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {carbonSinkCapacity.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </p>
              <p className="text-sm text-gray-600">Carbon Sinks (t CO₂e)</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {neutralityGap.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </p>
              <p className="text-sm text-gray-600">Neutrality Gap (t CO₂e)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Technologies */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Clean Technologies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CLEAN_TECHNOLOGIES.map((tech) => {
            const impact = calculateTechnologyImpact(tech);
            const isSelected = selectedTechnologies.includes(tech.id);
            
            return (
              <div
                key={tech.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => toggleTechnology(tech.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{tech.name}</h4>
                  {isSelected && <CheckCircle className="h-5 w-5 text-blue-600" />}
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{tech.description}</p>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span>{tech.emissionReduction}% reduction</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                    <span>₹{(tech.implementationCost / 10000000).toFixed(1)}Cr</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span>{tech.paybackPeriod} years payback</span>
                  </div>
                  <div className="text-green-600 font-medium">
                    -{impact.reductionAmount.toFixed(0)} t CO₂e
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Afforestation Planning */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Afforestation Planning</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tree Species
            </label>
            <select
              value={afforestationPlan.species}
              onChange={(e) => setAfforestationPlan(prev => ({ ...prev, species: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {Object.entries(AFFORESTATION_SPECIES).map(([key, species]) => (
                <option key={key} value={key}>
                  {species.species} ({species.carbonAbsorption} kg CO₂/tree/year)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Afforestation Area (Hectares)
            </label>
            <input
              type="number"
              value={afforestationPlan.area}
              onChange={(e) => setAfforestationPlan(prev => ({ ...prev, area: Number(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Area for afforestation"
            />
          </div>
        </div>

        {afforestationPlan.area > 0 && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Afforestation Impact</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-green-700 font-medium">Trees Required:</span>
                <div className="text-green-900">{calculateAfforestationRequirement().treesRequired.toLocaleString('en-IN')}</div>
              </div>
              <div>
                <span className="text-green-700 font-medium">Annual Absorption:</span>
                <div className="text-green-900">{calculateAfforestationRequirement().annualAbsorption.toFixed(0)} t CO₂e</div>
              </div>
              <div>
                <span className="text-green-700 font-medium">Total Cost:</span>
                <div className="text-green-900">₹{(calculateAfforestationRequirement().totalCost / 10000000).toFixed(2)}Cr</div>
              </div>
              <div>
                <span className="text-green-700 font-medium">Time to Neutrality:</span>
                <div className="text-green-900">{calculateAfforestationRequirement().yearsToNeutrality.toFixed(1)} years</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Combined Impact Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Combined Impact Summary</h3>
        
        <div className={`p-4 rounded-lg ${combinedImpact.isNeutral ? 'bg-green-50' : 'bg-yellow-50'}`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                -{combinedImpact.technologyReduction.toFixed(0)}
              </p>
              <p className="text-sm text-gray-600">Technology Reduction (t CO₂e)</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                +{combinedImpact.afforestationAbsorption.toFixed(0)}
              </p>
              <p className="text-sm text-gray-600">Afforestation Absorption (t CO₂e)</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                ₹{(combinedImpact.totalCost / 10000000).toFixed(1)}Cr
              </p>
              <p className="text-sm text-gray-600">Total Investment</p>
            </div>
            <div>
              <p className={`text-2xl font-bold ${combinedImpact.isNeutral ? 'text-green-600' : 'text-red-600'}`}>
                {combinedImpact.isNeutral ? 'NEUTRAL' : `${combinedImpact.remainingGap.toFixed(0)} GAP`}
              </p>
              <p className="text-sm text-gray-600">Carbon Status</p>
            </div>
          </div>
        </div>

        {/* Carbon Credits Potential */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Carbon Credits Potential</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-blue-700 font-medium">Emission Reduction Credits:</span>
              <div className="text-blue-900">
                {combinedImpact.technologyReduction.toFixed(0)} t CO₂e × ₹{CARBON_CREDIT_RATES.voluntary} = ₹{((combinedImpact.technologyReduction * CARBON_CREDIT_RATES.voluntary) / 100000).toFixed(1)} Lakhs
              </div>
            </div>
            <div>
              <span className="text-blue-700 font-medium">Afforestation Credits:</span>
              <div className="text-blue-900">
                {combinedImpact.afforestationAbsorption.toFixed(0)} t CO₂e × ₹{CARBON_CREDIT_RATES.afforestation} = ₹{((combinedImpact.afforestationAbsorption * CARBON_CREDIT_RATES.afforestation) / 100000).toFixed(1)} Lakhs/year
              </div>
            </div>
            <div>
              <span className="text-blue-700 font-medium">Total Annual Credits:</span>
              <div className="text-blue-900 font-bold">
                ₹{(((combinedImpact.technologyReduction * CARBON_CREDIT_RATES.voluntary) + (combinedImpact.afforestationAbsorption * CARBON_CREDIT_RATES.afforestation)) / 100000).toFixed(1)} Lakhs/year
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeutralityPathways;