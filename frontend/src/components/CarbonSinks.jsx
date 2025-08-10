import React, { useState } from 'react';
import { Plus, Trash2, TreePine, Save } from 'lucide-react';
import { CARBON_ABSORPTION_RATES } from '../data/constants';

const CarbonSinks = ({ sinks, addCarbonSink, removeCarbonSink }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'forest',
    area: '',
    currentAge: '',
    maturityAge: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newSink = {
      id: Date.now().toString(),
      type: formData.type,
      area: Number(formData.area),
      absorptionRate: CARBON_ABSORPTION_RATES[formData.type],
      currentAge: Number(formData.currentAge),
      maturityAge: Number(formData.maturityAge)
    };

    addCarbonSink(newSink);
    setFormData({ type: 'forest', area: '', currentAge: '', maturityAge: '' });
    setShowForm(false);
  };

  const calculateActualAbsorption = (sink) => {
    const ageMultiplier = Math.min(sink.currentAge / sink.maturityAge, 1);
    return sink.area * sink.absorptionRate * ageMultiplier;
  };

  const totalAbsorption = sinks.reduce((total, sink) => total + calculateActualAbsorption(sink), 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <TreePine className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">Carbon Sinks Assessment</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-green-600">
            <Save className="h-4 w-4" />
            <span className="text-sm font-medium">Auto-save enabled</span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Total Absorption Capacity</p>
            <p className="text-2xl font-bold text-green-600">
              {totalAbsorption.toLocaleString('en-IN', { maximumFractionDigits: 0 })} t CO₂e/year
            </p>
          </div>
        </div>
      </div>

      {/* Add New Sink Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Carbon Sink
        </button>
      </div>

      {/* Add Sink Form */}
      {showForm && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sink Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="forest">Forest</option>
                  <option value="grassland">Grassland</option>
                  <option value="wetland">Wetland</option>
                  <option value="soil">Soil Carbon</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Area (Hectares)
                </label>
                <input
                  type="number"
                  value={formData.area}
                  onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Area in hectares"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Age (Years)
                </label>
                <input
                  type="number"
                  value={formData.currentAge}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentAge: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Current age"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maturity Age (Years)
                </label>
                <input
                  type="number"
                  value={formData.maturityAge}
                  onChange={(e) => setFormData(prev => ({ ...prev, maturityAge: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Maturity age"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
              >
                Add Sink
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Existing Sinks */}
      <div className="space-y-4">
        {sinks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <TreePine className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No carbon sinks added yet</p>
            <p className="text-sm">Add existing carbon sinks to calculate absorption capacity</p>
          </div>
        ) : (
          sinks.map((sink) => (
            <div key={sink.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 capitalize">
                    {sink.type}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Area:</span> {sink.area} ha
                    </div>
                    <div>
                      <span className="font-medium">Age:</span> {sink.currentAge}/{sink.maturityAge} years
                    </div>
                    <div>
                      <span className="font-medium">Absorption Rate:</span> {sink.absorptionRate} t/ha/year
                    </div>
                    <div>
                      <span className="font-medium">Current Capacity:</span> {calculateActualAbsorption(sink).toFixed(1)} t CO₂e/year
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeCarbonSink(sink.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              {/* Maturity Progress */}
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Maturity Progress</span>
                  <span>{Math.min(100, (sink.currentAge / sink.maturityAge) * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (sink.currentAge / sink.maturityAge) * 100)}%`
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CarbonSinks;