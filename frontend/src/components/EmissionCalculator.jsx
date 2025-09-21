import { Calculator, Info, Save } from 'lucide-react';
import { useState } from 'react';
import { EMISSION_FACTORS } from '../data/constants';

const EmissionCalculator = ({
  activities,
  updateActivity,
  workforce,
  annualProduction,
  setWorkforce,
  setAnnualProduction
}) => {
  const [activeTab, setActiveTab] = useState('mine-profile');

  const tabs = [
    { id: 'mine-profile', name: 'Mine Profile' },
    { id: 'excavation', name: 'Excavation' },
    { id: 'transportation', name: 'Transportation' },
    { id: 'processing', name: 'Processing' },
    { id: 'equipment', name: 'Equipment' },
    { id: 'energy', name: 'Energy' }
  ];

  const getActivitiesByCategory = (category) => {
    return Object.values(EMISSION_FACTORS).filter(activity => activity.category === category);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calculator className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Emission Calculator</h2>
        </div>
        <div className="flex items-center space-x-2 text-green-600">
          <Save className="h-4 w-4" />
          <span className="text-sm font-medium">Auto-save enabled</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full py-2 px-3 border-b-2 font-medium text-sm rounded-lg transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Mine Profile Tab */}
      {activeTab === 'mine-profile' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workforce Count
              </label>
              <input
                type="number"
                value={workforce}
                onChange={(e) => setWorkforce(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Number of employees"
              />
              <p className="text-xs text-gray-500 mt-1">Total number of employees in the mine</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Production (Million Tonnes)
              </label>
              <input
                type="number"
                step="0.1"
                value={annualProduction}
                onChange={(e) => setAnnualProduction(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Annual coal production"
              />
              <p className="text-xs text-gray-500 mt-1">Annual coal production in million tonnes</p>
            </div>
          </div>
        </div>
      )}

      {/* Activity Tabs */}
      {activeTab !== 'mine-profile' && (
        <div className="space-y-6">
          {getActivitiesByCategory(activeTab).map((activity) => (
            <div key={activity.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{activity.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                </div>
                <div className="flex items-center space-x-1 text-gray-400">
                  <Info className="h-4 w-4" />
                  <span className="text-xs">
                    {activity.emissionFactor} kg CO₂e/{activity.unit}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity ({activity.unit})
                  </label>
                  <input
                    type="number"
                    value={activities[activity.id] || ''}
                    onChange={(e) => updateActivity(activity.id, Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter quantity"
                  />
                </div>

                <div className="flex items-end">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emission Factor
                    </label>
                    <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-600">
                      {activity.emissionFactor} kg CO₂e/{activity.unit}
                    </div>
                  </div>
                </div>

                <div className="flex items-end">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Emissions
                    </label>
                    <div className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-md text-sm font-medium text-blue-900">
                      {((activities[activity.id] || 0) * activity.emissionFactor / 1000).toFixed(2)} t CO₂e
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmissionCalculator;