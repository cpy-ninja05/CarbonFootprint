import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Factory, Users, Leaf, Target } from 'lucide-react';

const Dashboard = ({
  emissionResults,
  carbonSinkCapacity,
  neutralityGap,
  workforce
}) => {
  const categoryData = Object.entries(emissionResults.categoryBreakdown).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: value
  }));

  const neutralityData = [
    { name: 'Current Emissions', value: emissionResults.totalEmissions, color: '#ef4444' },
    { name: 'Carbon Sinks', value: carbonSinkCapacity, color: '#22c55e' },
    { name: 'Neutrality Gap', value: neutralityGap, color: '#f59e0b' }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Emissions</p>
              <p className="text-2xl font-bold text-gray-900">
                {emissionResults.totalEmissions.toLocaleString('en-IN', { maximumFractionDigits: 0 })} t CO₂e
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <Factory className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Carbon Sinks</p>
              <p className="text-2xl font-bold text-gray-900">
                {carbonSinkCapacity.toLocaleString('en-IN', { maximumFractionDigits: 0 })} t CO₂e
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Per Capita Emissions</p>
              <p className="text-2xl font-bold text-gray-900">
                {emissionResults.perCapitaEmissions.toFixed(2)} t CO₂e
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Neutrality Gap</p>
              <p className="text-2xl font-bold text-gray-900">
                {neutralityGap.toLocaleString('en-IN', { maximumFractionDigits: 0 })} t CO₂e
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Target className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emissions by Category */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Emissions by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => [`${Number(value).toFixed(1)} t CO₂e`, 'Emissions']} />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Carbon Balance */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Carbon Balance Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={neutralityData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={(entry) => `${entry.name}: ${entry.value.toFixed(0)} t CO₂e`}
              >
                {neutralityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${Number(value).toFixed(1)} t CO₂e`]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Carbon Neutrality Status */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Carbon Neutrality Progress</h3>
          <div className="flex items-center space-x-2">
            {neutralityGap === 0 ? (
              <>
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-green-600 font-medium">Carbon Neutral</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-5 w-5 text-red-600" />
                <span className="text-red-600 font-medium">Gap: {neutralityGap.toFixed(0)} t CO₂e</span>
              </>
            )}
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`h-4 rounded-full transition-all duration-500 ${
              neutralityGap === 0 ? 'bg-green-600' : 'bg-yellow-500'
            }`}
            style={{
              width: `${Math.min(100, (carbonSinkCapacity / emissionResults.totalEmissions) * 100)}%`
            }}
          />
        </div>
        
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>0 t CO₂e</span>
          <span>{emissionResults.totalEmissions.toFixed(0)} t CO₂e</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;