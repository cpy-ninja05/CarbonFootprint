import React from 'react';
import { FileText, Download, Share2 } from 'lucide-react';

const Reports = ({
  emissionResults,
  carbonSinkCapacity,
  neutralityGap,
  workforce,
  annualProduction
}) => {
  const generateReport = (type) => {
    // In a real application, this would generate and download actual reports
    console.log(`Generating ${type} report...`);
  };

  const reportTypes = [
    {
      id: 'executive',
      name: 'Executive Summary',
      description: 'Concise 2-3 page overview with key metrics, financial implications, and strategic recommendations for senior management and board members',
      icon: '📊'
    },
    {
      id: 'detailed',
      name: 'Detailed Emission Report',
      description: 'Comprehensive technical report with methodology, emission factors, activity data, calculations, and verification details for auditors',
      icon: '📈'
    },
    {
      id: 'compliance',
      name: 'Compliance Report',
      description: 'Standardized format for Ministry of Environment, Forest & Climate Change (MoEFCC) and Coal India Limited (CIL) submissions',
      icon: '📋'
    },
    {
      id: 'neutrality',
      name: 'Carbon Neutrality Plan',
      description: 'Strategic roadmap with technology adoption timeline, investment requirements, afforestation plans, and carbon credit strategies',
      icon: '🌱'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <FileText className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">Reports & Analytics</h2>
        </div>

        {/* Key Metrics Summary */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {emissionResults.totalEmissions.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
              <div className="text-sm text-gray-600">Total Emissions (t CO₂e)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {carbonSinkCapacity.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
              <div className="text-sm text-gray-600">Carbon Sinks (t CO₂e)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {neutralityGap.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
              <div className="text-sm text-gray-600">Neutrality Gap (t CO₂e)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {emissionResults.perCapitaEmissions.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Per Capita (t CO₂e)</div>
            </div>
          </div>
        </div>

        {/* Report Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportTypes.map((report) => (
            <div key={report.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start space-x-3">
                <div className="text-3xl">{report.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{report.name}</h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{report.description}</p>
                  
                  {/* Report Details */}
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">Report Contents:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {report.id === 'executive' && (
                        <>
                          <li>• Key emission metrics and trends</li>
                          <li>• Financial impact and cost-benefit analysis</li>
                          <li>• Strategic recommendations and priorities</li>
                          <li>• Risk assessment and mitigation strategies</li>
                        </>
                      )}
                      {report.id === 'detailed' && (
                        <>
                          <li>• Activity-wise emission calculations</li>
                          <li>• Methodology and emission factors used</li>
                          <li>• Data quality assessment and uncertainties</li>
                          <li>• Verification and validation procedures</li>
                        </>
                      )}
                      {report.id === 'compliance' && (
                        <>
                          <li>• MoEFCC format compliance</li>
                          <li>• Regulatory requirement checklist</li>
                          <li>• Third-party verification certificates</li>
                          <li>• Submission-ready documentation</li>
                        </>
                      )}
                      {report.id === 'neutrality' && (
                        <>
                          <li>• Technology adoption roadmap</li>
                          <li>• Investment timeline and budget</li>
                          <li>• Afforestation and offset strategies</li>
                          <li>• Carbon credit monetization plan</li>
                        </>
                      )}
                    </ul>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => generateReport(report.id)}
                      className="inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors duration-200"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                    <button
                      onClick={() => generateReport(`${report.id}-preview`)}
                      className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition-colors duration-200"
                    >
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Export Options */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Export</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => generateReport('csv-export')}
            className="flex items-center justify-center px-4 py-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors duration-200"
          >
            <div className="text-center">
              <div className="text-2xl mb-1">📊</div>
              <div className="font-medium text-green-800">Export to CSV</div>
              <div className="text-xs text-green-600">Raw data for analysis</div>
            </div>
          </button>

          <button
            onClick={() => generateReport('excel-export')}
            className="flex items-center justify-center px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-200"
          >
            <div className="text-center">
              <div className="text-2xl mb-1">📈</div>
              <div className="font-medium text-blue-800">Export to Excel</div>
              <div className="text-xs text-blue-600">Formatted spreadsheet</div>
            </div>
          </button>

          <button
            onClick={() => generateReport('json-export')}
            className="flex items-center justify-center px-4 py-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors duration-200"
          >
            <div className="text-center">
              <div className="text-2xl mb-1">💾</div>
              <div className="font-medium text-purple-800">Export to JSON</div>
              <div className="text-xs text-purple-600">API integration</div>
            </div>
          </button>
        </div>
      </div>

      {/* Benchmarking */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Industry Benchmarking</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900">Emissions per Tonne of Coal</h4>
                <p className="text-sm text-gray-600">Your mine vs industry average</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">
                  {(emissionResults.emissionsPerTonne * 1000).toFixed(2)} kg CO₂e/t
                </div>
                <div className="text-sm text-gray-500">Industry avg: 2.85 kg CO₂e/t</div>
              </div>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  emissionResults.emissionsPerTonne * 1000 < 2.85 ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{
                  width: `${Math.min(100, (emissionResults.emissionsPerTonne * 1000 / 2.85) * 100)}%`
                }}
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900">Per Capita Emissions</h4>
                <p className="text-sm text-gray-600">Workforce efficiency comparison</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">
                  {emissionResults.perCapitaEmissions.toFixed(2)} t CO₂e/person
                </div>
                <div className="text-sm text-gray-500">Industry avg: 45.2 t CO₂e/person</div>
              </div>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  emissionResults.perCapitaEmissions < 45.2 ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{
                  width: `${Math.min(100, (emissionResults.perCapitaEmissions / 45.2) * 100)}%`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;