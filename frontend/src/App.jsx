import { BarChart3, Calculator, Factory, FileText, Menu, Route, TreePine, X } from 'lucide-react';
import { useState } from 'react';
import CarbonSinks from './components/CarbonSinks';
import Dashboard from './components/Dashboard';
import EmissionCalculator from './components/EmissionCalculator';
import NeutralityPathways from './components/NeutralityPathways';
import Reports from './components/Reports';
import { useCalculations } from './hooks/useCalculations';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col sm:flex-row items-center sm:items-stretch justify-between h-auto sm:h-20 py-2 sm:py-0">
            {/* Mobile: icon at top, then title/subtitle/sector info centered */}
            <div className="w-full flex flex-col items-center sm:hidden">
              <div className="flex items-center justify-center h-12 w-12 bg-gray-900 rounded-lg mb-2">
                <Factory className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 text-center leading-tight">Coal Mine Carbon Management</h1>
              <p className="text-sm text-gray-600 text-center leading-tight">Carbon Footprint &amp; Neutrality Platform</p>
              <div className="mt-2 flex flex-col items-center">
                <p className="text-sm font-medium text-gray-900 text-center">Indian Coal Sector</p>
                <p className="text-xs text-gray-600 text-center">Sustainability Initiative</p>
              </div>
            </div>
            {/* Desktop: icon/title left, sector info right */}
            <div className="hidden sm:flex items-center justify-center sm:justify-start w-full sm:w-auto gap-3">
              <div className="flex items-center justify-center h-12 w-12 bg-gray-900 rounded-lg">
                <Factory className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">Coal Mine Carbon Management</h1>
                <p className="text-sm text-gray-600 leading-tight">Carbon Footprint &amp; Neutrality Platform</p>
              </div>
            </div>
            <div className="hidden sm:flex flex-col justify-center items-end w-full sm:w-auto mt-2 sm:mt-0">
              <p className="text-sm font-medium text-gray-900">Indian Coal Sector</p>
              <p className="text-xs text-gray-600">Sustainability Initiative</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8 w-full">
        {/* Navigation Tabs */}
        <div className="mb-8">
          {/* Burger menu for mobile */}
          <div className="flex items-center justify-between md:hidden">
            <span className="font-semibold text-gray-700 text-lg">Menu</span>
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          {/* Mobile menu dropdown */}
          {menuOpen && (
            <nav className="flex flex-col space-y-2 mt-4 md:hidden bg-white rounded-lg shadow p-4 z-50">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setMenuOpen(false); }}
                    className={`flex items-center space-x-2 px-3 py-2 font-medium text-sm rounded-lg transition-colors duration-200 whitespace-nowrap justify-center ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    aria-current={activeTab === tab.id ? "page" : undefined}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          )}
          {/* Tabs for desktop/tablet */}
          <nav className="hidden md:flex space-x-2 sm:space-x-8 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 justify-center">
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
                  aria-current={activeTab === tab.id ? "page" : undefined}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="tab-content w-full">
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
