import React, { useState } from 'react';
import { BarChart3, Calculator, TreePine, Route, FileText, Factory } from 'lucide-react';
import Dashboard from './components/Dashboard';
import EmissionCalculator from './components/EmissionCalculator';
import CarbonSinks from './components/CarbonSinks';
import NeutralityPathways from './components/NeutralityPathways';
import Reports from './components/Reports';
import { useCalculations } from './hooks/useCalculations';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const {
    activities,
    sinks,
    workforce,
    annualProduction,
    emissionResults,
    carbonSinkCapacity,
    neutralityGap,
    updateActivity,
    addCarbonSink,
    removeCarbonSink,
    setWorkforce,
    setAnnualProduction,
    calculateTechnologyImpact
  } = useCalculations();

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'calculator', name: 'Emission Calculator', icon: Calculator },
    { id: 'sinks', name: 'Carbon Sinks', icon: TreePine },
    { id: 'pathways', name: 'Neutrality Pathways', icon: Route },
    { id: 'reports', name: 'Reports', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-900 rounded-lg">
                <Factory className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Coal Mine Carbon Management</h1>
                <p className="text-sm text-gray-600">Carbon Footprint &amp; Neutrality Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Indian Coal Sector</p>
                <p className="text-xs text-gray-600">Sustainability Initiative</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 font-medium text-sm rounded-lg transition-colors duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'dashboard' && (
            <Dashboard
              emissionResults={emissionResults}
              carbonSinkCapacity={carbonSinkCapacity}
              neutralityGap={neutralityGap}
              workforce={workforce}
            />
          )}

          {activeTab === 'calculator' && (
            <EmissionCalculator
              activities={activities}
              updateActivity={updateActivity}
              workforce={workforce}
              annualProduction={annualProduction}
              setWorkforce={setWorkforce}
              setAnnualProduction={setAnnualProduction}
            />
          )}

          {activeTab === 'sinks' && (
            <CarbonSinks
              sinks={sinks}
              addCarbonSink={addCarbonSink}
              removeCarbonSink={removeCarbonSink}
            />
          )}

          {activeTab === 'pathways' && (
            <NeutralityPathways
              emissionResults={emissionResults}
              carbonSinkCapacity={carbonSinkCapacity}
              neutralityGap={neutralityGap}
              calculateTechnologyImpact={calculateTechnologyImpact}
            />
          )}

          {activeTab === 'reports' && (
            <Reports
              emissionResults={emissionResults}
              carbonSinkCapacity={carbonSinkCapacity}
              neutralityGap={neutralityGap}
              workforce={workforce}
              annualProduction={annualProduction}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
