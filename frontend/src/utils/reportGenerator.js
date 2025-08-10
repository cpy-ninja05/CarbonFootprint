export const generateExecutiveSummary = (data) => {
  const { emissionResults, carbonSinkCapacity, neutralityGap, workforce, annualProduction, timestamp } = data;
  
  return `
EXECUTIVE SUMMARY
Coal Mine Carbon Footprint Assessment
Generated: ${timestamp}

═══════════════════════════════════════════════════════════════

KEY PERFORMANCE INDICATORS

Total Carbon Emissions: ${emissionResults.totalEmissions.toLocaleString('en-IN', { maximumFractionDigits: 0 })} tonnes CO₂e
Carbon Sink Capacity: ${carbonSinkCapacity.toLocaleString('en-IN', { maximumFractionDigits: 0 })} tonnes CO₂e
Carbon Neutrality Gap: ${neutralityGap.toLocaleString('en-IN', { maximumFractionDigits: 0 })} tonnes CO₂e

Per Capita Emissions: ${emissionResults.perCapitaEmissions.toFixed(2)} tonnes CO₂e per employee
Emissions Intensity: ${(emissionResults.emissionsPerTonne * 1000).toFixed(2)} kg CO₂e per tonne of coal

Workforce: ${workforce.toLocaleString('en-IN')} employees
Annual Production: ${annualProduction} million tonnes

═══════════════════════════════════════════════════════════════

EMISSION BREAKDOWN BY CATEGORY

${Object.entries(emissionResults.categoryBreakdown)
  .map(([category, emissions]) => 
    `${category.charAt(0).toUpperCase() + category.slice(1)}: ${emissions.toFixed(1)} tonnes CO₂e (${((emissions / emissionResults.totalEmissions) * 100).toFixed(1)}%)`
  ).join('\n')}

═══════════════════════════════════════════════════════════════

STRATEGIC RECOMMENDATIONS

1. IMMEDIATE ACTIONS (0-12 months)
   • Implement energy efficiency measures in equipment operations
   • Begin methane capture system feasibility study
   • Establish baseline monitoring systems for all emission sources

2. SHORT-TERM INITIATIVES (1-3 years)
   • Deploy electric vehicles for short-haul transportation
   • Install solar power systems for auxiliary operations
   • Initiate afforestation program on ${Math.ceil(neutralityGap / 4.6)} hectares

3. LONG-TERM STRATEGY (3-10 years)
   • Complete transition to renewable energy sources
   • Achieve carbon neutrality through combined technology and offset approach
   • Develop carbon credit revenue streams

═══════════════════════════════════════════════════════════════

FINANCIAL IMPLICATIONS

Estimated Investment Required: ₹${((neutralityGap * 2000) / 10000000).toFixed(1)} Crores
Potential Carbon Credit Revenue: ₹${((neutralityGap * 800) / 100000).toFixed(1)} Lakhs annually
Payback Period: 6-8 years (including carbon credit income)

═══════════════════════════════════════════════════════════════

RISK ASSESSMENT

HIGH PRIORITY RISKS:
• Regulatory compliance with evolving emission standards
• Carbon tax implications on operational costs
• Stakeholder pressure for sustainability commitments

MITIGATION STRATEGIES:
• Proactive emission reduction implementation
• Diversification of carbon offset approaches
• Transparent reporting and stakeholder engagement

═══════════════════════════════════════════════════════════════

This executive summary provides strategic guidance for achieving carbon neutrality
while maintaining operational efficiency and financial sustainability.

For detailed technical analysis, refer to the Detailed Emission Report.
For regulatory compliance, refer to the Compliance Report.
For implementation guidance, refer to the Carbon Neutrality Plan.
`;
};

export const generateDetailedEmissionReport = (data) => {
  const { emissionResults, carbonSinkCapacity, neutralityGap, workforce, annualProduction, timestamp } = data;
  
  return `
DETAILED EMISSION REPORT
Coal Mine Carbon Footprint Technical Assessment
Generated: ${timestamp}

═══════════════════════════════════════════════════════════════

1. METHODOLOGY AND SCOPE

1.1 Reporting Standard: ISO 14064-1:2018
1.2 Emission Factors: IPCC Guidelines 2006, India-specific factors
1.3 Global Warming Potential: IPCC AR5 (100-year GWP)
1.4 Reporting Period: Annual assessment
1.5 Operational Boundaries: All direct and indirect emissions from mining operations

═══════════════════════════════════════════════════════════════

2. EMISSION INVENTORY

2.1 TOTAL EMISSIONS SUMMARY
Total Gross Emissions: ${emissionResults.totalEmissions.toFixed(2)} tonnes CO₂e
Total Net Emissions: ${(emissionResults.totalEmissions - carbonSinkCapacity).toFixed(2)} tonnes CO₂e

2.2 SCOPE 1 EMISSIONS (Direct)
${Object.entries(emissionResults.categoryBreakdown)
  .filter(([category]) => ['excavation', 'equipment', 'transportation'].includes(category))
  .map(([category, emissions]) => 
    `${category.charAt(0).toUpperCase() + category.slice(1)}: ${emissions.toFixed(2)} tonnes CO₂e`
  ).join('\n')}

2.3 SCOPE 2 EMISSIONS (Indirect - Energy)
${Object.entries(emissionResults.categoryBreakdown)
  .filter(([category]) => ['energy'].includes(category))
  .map(([category, emissions]) => 
    `${category.charAt(0).toUpperCase() + category.slice(1)}: ${emissions.toFixed(2)} tonnes CO₂e`
  ).join('\n')}

2.4 SCOPE 3 EMISSIONS (Other Indirect)
${Object.entries(emissionResults.categoryBreakdown)
  .filter(([category]) => ['processing'].includes(category))
  .map(([category, emissions]) => 
    `${category.charAt(0).toUpperCase() + category.slice(1)}: ${emissions.toFixed(2)} tonnes CO₂e`
  ).join('\n')}

═══════════════════════════════════════════════════════════════

3. EMISSION FACTORS USED

3.1 EXCAVATION OPERATIONS
• Coal extraction: 2.3 kg CO₂e per tonne of coal
• Methane emissions: 15.2 kg CO₂e per tonne of coal
• Basis: India-specific emission factors for coal mining

3.2 TRANSPORTATION
• Diesel hauling: 0.15 kg CO₂e per km-tonne
• Basis: IPCC mobile combustion factors

3.3 EQUIPMENT OPERATIONS
• Diesel consumption: 2.68 kg CO₂e per liter
• Basis: IPCC stationary combustion factors

3.4 ENERGY CONSUMPTION
• Grid electricity: 0.82 kg CO₂e per kWh
• Basis: Central Electricity Authority of India grid factors

═══════════════════════════════════════════════════════════════

4. DATA QUALITY ASSESSMENT

4.1 DATA SOURCES
• Primary data: 85% (direct measurements, fuel receipts)
• Secondary data: 15% (industry averages, estimates)

4.2 UNCERTAINTY ANALYSIS
• Overall uncertainty: ±12%
• Key uncertainty sources: Methane emission estimates, equipment efficiency variations

4.3 DATA GAPS
• Scope 3 emissions from supply chain: Not included
• Fugitive emissions from coal storage: Estimated values used

═══════════════════════════════════════════════════════════════

5. CARBON SINK ASSESSMENT

5.1 EXISTING CARBON SINKS
Total Absorption Capacity: ${carbonSinkCapacity.toFixed(2)} tonnes CO₂e annually

5.2 SINK CATEGORIES
• Forest areas: Absorption rate 4.6 tonnes CO₂e per hectare per year
• Grasslands: Absorption rate 1.8 tonnes CO₂e per hectare per year
• Soil carbon: Absorption rate 0.3 tonnes CO₂e per hectare per year

═══════════════════════════════════════════════════════════════

6. PERFORMANCE INDICATORS

6.1 INTENSITY METRICS
• Emissions per employee: ${emissionResults.perCapitaEmissions.toFixed(2)} tonnes CO₂e
• Emissions per tonne of coal: ${(emissionResults.emissionsPerTonne * 1000).toFixed(2)} kg CO₂e
• Emissions per unit revenue: [To be calculated based on financial data]

6.2 BENCHMARKING
• Industry average (India): 2.85 kg CO₂e per tonne of coal
• Mine performance: ${((emissionResults.emissionsPerTonne * 1000) < 2.85 ? 'Above' : 'Below')} industry average

═══════════════════════════════════════════════════════════════

7. VERIFICATION AND QUALITY ASSURANCE

7.1 INTERNAL VERIFICATION
• Data validation procedures implemented
• Cross-checking with operational records completed
• Management review and approval obtained

7.2 EXTERNAL VERIFICATION
• Third-party verification: [Pending/Completed]
• Verification standard: ISO 14064-3:2019
• Verification opinion: [To be attached]

═══════════════════════════════════════════════════════════════

8. RECOMMENDATIONS FOR IMPROVEMENT

8.1 DATA QUALITY ENHANCEMENT
• Install continuous emission monitoring systems
• Implement digital data collection systems
• Conduct regular equipment calibration

8.2 EMISSION REDUCTION OPPORTUNITIES
• Energy efficiency improvements: Potential 15-25% reduction
• Fuel switching: Potential 30-40% reduction in transport emissions
• Methane capture: Potential 80% reduction in fugitive emissions

═══════════════════════════════════════════════════════════════

This detailed report provides comprehensive technical documentation of the mine's
carbon footprint assessment for use by technical teams, auditors, and consultants.
`;
};

export const generateComplianceReport = (data) => {
  const { emissionResults, carbonSinkCapacity, neutralityGap, workforce, annualProduction, timestamp } = data;
  
  return `
COMPLIANCE REPORT
Environmental Compliance and Regulatory Submission
Ministry of Environment, Forest & Climate Change (MoEFCC)
Generated: ${timestamp}

═══════════════════════════════════════════════════════════════

SECTION A: FACILITY INFORMATION

A.1 Mine Details
Mine Name: [To be filled]
Mine Type: [Open Cast/Underground]
Location: [State, District]
Environmental Clearance No.: [EC Number]
Consent to Operate No.: [CTO Number]

A.2 Operational Parameters
Annual Coal Production: ${annualProduction} million tonnes
Workforce: ${workforce} employees
Operational Area: [To be filled] hectares
Mining Method: [To be specified]

═══════════════════════════════════════════════════════════════

SECTION B: EMISSION INVENTORY (As per MoEFCC Format)

B.1 Direct Emissions (Scope 1)
Source Category                    | Emissions (tonnes CO₂e)
----------------------------------|------------------------
Coal Extraction & Handling        | ${(emissionResults.categoryBreakdown.excavation || 0).toFixed(2)}
Mobile Equipment (Diesel)         | ${(emissionResults.categoryBreakdown.equipment || 0).toFixed(2)}
Transportation (On-site)          | ${(emissionResults.categoryBreakdown.transportation || 0).toFixed(2)}
Fugitive Emissions (Methane)      | [Included in excavation]
Total Direct Emissions            | ${Object.entries(emissionResults.categoryBreakdown)
  .filter(([cat]) => ['excavation', 'equipment', 'transportation'].includes(cat))
  .reduce((sum, [, val]) => sum + val, 0).toFixed(2)}

B.2 Indirect Emissions (Scope 2)
Source Category                    | Emissions (tonnes CO₂e)
----------------------------------|------------------------
Purchased Electricity             | ${(emissionResults.categoryBreakdown.energy || 0).toFixed(2)}
Total Indirect Emissions          | ${(emissionResults.categoryBreakdown.energy || 0).toFixed(2)}

B.3 Total Gross Emissions: ${emissionResults.totalEmissions.toFixed(2)} tonnes CO₂e

═══════════════════════════════════════════════════════════════

SECTION C: CARBON SINK ASSESSMENT

C.1 Existing Carbon Sinks
Forest Cover: [To be specified] hectares
Grassland: [To be specified] hectares
Other Vegetation: [To be specified] hectares

C.2 Carbon Absorption Capacity
Total Annual Absorption: ${carbonSinkCapacity.toFixed(2)} tonnes CO₂e

C.3 Net Emissions
Gross Emissions: ${emissionResults.totalEmissions.toFixed(2)} tonnes CO₂e
Less: Carbon Absorption: ${carbonSinkCapacity.toFixed(2)} tonnes CO₂e
Net Emissions: ${(emissionResults.totalEmissions - carbonSinkCapacity).toFixed(2)} tonnes CO₂e

═══════════════════════════════════════════════════════════════

SECTION D: COMPLIANCE STATUS

D.1 Environmental Clearance Conditions
Condition 1: Air quality monitoring - [Compliant/Non-compliant]
Condition 2: Water quality monitoring - [Compliant/Non-compliant]
Condition 3: Noise level monitoring - [Compliant/Non-compliant]
Condition 4: Green belt development - [Compliant/Non-compliant]

D.2 Consent to Operate Conditions
Emission limits compliance - [Compliant/Non-compliant]
Waste management compliance - [Compliant/Non-compliant]
Environmental monitoring compliance - [Compliant/Non-compliant]

═══════════════════════════════════════════════════════════════

SECTION E: EMISSION REDUCTION MEASURES

E.1 Implemented Measures
• Energy efficiency improvements in equipment
• Dust suppression systems
• Green belt development: [Area] hectares
• Water recycling systems

E.2 Planned Measures (Next 3 Years)
• Solar power installation: [Capacity] MW
• Electric vehicle deployment: [Number] vehicles
• Afforestation program: ${Math.ceil(neutralityGap / 4.6)} hectares
• Methane capture system installation

═══════════════════════════════════════════════════════════════

SECTION F: MONITORING AND REPORTING

F.1 Monitoring Systems
• Continuous ambient air quality monitoring stations: [Number]
• Stack emission monitoring systems: [Number]
• Water quality monitoring points: [Number]
• Noise monitoring locations: [Number]

F.2 Reporting Schedule
• Monthly compliance reports to State PCB
• Half-yearly reports to MoEFCC
• Annual environmental statement submission
• Quarterly stakeholder consultations

═══════════════════════════════════════════════════════════════

SECTION G: THIRD-PARTY VERIFICATION

G.1 Verification Details
Verification Agency: [To be filled]
Verification Standard: ISO 14064-3:2019
Verification Date: [Date]
Verification Opinion: [Positive/Qualified/Negative]

G.2 Certification Status
ISO 14001 Certification: [Valid/Expired/Not Applicable]
Carbon Footprint Verification: [Completed/Pending]

═══════════════════════════════════════════════════════════════

SECTION H: DECLARATION

I hereby declare that the information provided in this report is true and accurate
to the best of my knowledge. The emission calculations have been performed using
approved methodologies and emission factors.

Authorized Signatory: ________________________
Name: [Mine Manager/Environmental Officer]
Designation: [Title]
Date: ${new Date().toLocaleDateString('en-IN')}

Company Seal: [To be affixed]

═══════════════════════════════════════════════════════════════

ATTACHMENTS:
1. Third-party verification certificate
2. Emission factor references and calculations
3. Monitoring data and calibration certificates
4. Environmental clearance and consent copies
5. Stakeholder consultation records

This report is submitted in compliance with MoEFCC guidelines and
Coal India Limited sustainability reporting requirements.
`;
};

export const generateCarbonNeutralityPlan = (data) => {
  const { emissionResults, carbonSinkCapacity, neutralityGap, workforce, annualProduction, timestamp } = data;
  
  return `
CARBON NEUTRALITY PLAN
Strategic Roadmap for Achieving Net-Zero Emissions
Coal Mine Sustainability Initiative
Generated: ${timestamp}

═══════════════════════════════════════════════════════════════

EXECUTIVE OVERVIEW

Current Status:
• Total Emissions: ${emissionResults.totalEmissions.toLocaleString('en-IN')} tonnes CO₂e annually
• Existing Carbon Sinks: ${carbonSinkCapacity.toLocaleString('en-IN')} tonnes CO₂e annually
• Neutrality Gap: ${neutralityGap.toLocaleString('en-IN')} tonnes CO₂e annually

Target: Achieve carbon neutrality by 2030
Strategy: Combined approach of emission reduction and carbon offsetting

═══════════════════════════════════════════════════════════════

PHASE 1: IMMEDIATE ACTIONS (2024-2025)

1.1 ENERGY EFFICIENCY IMPROVEMENTS
Timeline: 6-12 months
Investment: ₹15 Crores
Expected Reduction: ${(emissionResults.totalEmissions * 0.15).toFixed(0)} tonnes CO₂e (15%)

Actions:
• Upgrade to energy-efficient LED lighting systems
• Install variable frequency drives on motors
• Implement equipment maintenance optimization
• Deploy smart energy monitoring systems

1.2 BASELINE ESTABLISHMENT
Timeline: 3-6 months
Investment: ₹2 Crores

Actions:
• Install continuous emission monitoring systems
• Establish digital data collection infrastructure
• Implement carbon accounting software
• Train personnel on emission monitoring

═══════════════════════════════════════════════════════════════

PHASE 2: SHORT-TERM INITIATIVES (2025-2027)

2.1 CLEAN TRANSPORTATION
Timeline: 18-24 months
Investment: ₹50 Crores
Expected Reduction: ${(emissionResults.totalEmissions * 0.25).toFixed(0)} tonnes CO₂e (25%)

Actions:
• Deploy 50 electric vehicles for short-haul transportation
• Install charging infrastructure across mine sites
• Implement route optimization systems
• Phase out older diesel vehicles

2.2 RENEWABLE ENERGY ADOPTION
Timeline: 12-18 months
Investment: ₹25 Crores
Expected Reduction: ${(emissionResults.totalEmissions * 0.20).toFixed(0)} tonnes CO₂e (20%)

Actions:
• Install 10 MW solar power plant
• Deploy wind energy systems where feasible
• Implement battery storage systems
• Grid integration and net metering setup

2.3 METHANE CAPTURE SYSTEM
Timeline: 24-30 months
Investment: ₹30 Crores
Expected Reduction: ${(emissionResults.totalEmissions * 0.30).toFixed(0)} tonnes CO₂e (30%)

Actions:
• Install methane capture and utilization systems
• Deploy gas-to-energy conversion units
• Implement ventilation air methane systems
• Establish methane monitoring network

═══════════════════════════════════════════════════════════════

PHASE 3: LONG-TERM STRATEGY (2027-2030)

3.1 ADVANCED CLEAN TECHNOLOGIES
Timeline: 36-48 months
Investment: ₹75 Crores
Expected Reduction: ${(emissionResults.totalEmissions * 0.40).toFixed(0)} tonnes CO₂e (40%)

Actions:
• Deploy autonomous electric mining equipment
• Implement hydrogen fuel cell systems
• Install carbon capture and storage systems
• Adopt AI-powered emission optimization

3.2 COMPREHENSIVE AFFORESTATION PROGRAM
Timeline: 60 months (ongoing)
Investment: ₹20 Crores
Expected Absorption: ${Math.ceil(neutralityGap / 4.6)} hectares required

Species Selection and Planting Plan:
• Eucalyptus: 40% (fast-growing, high absorption)
• Bamboo: 30% (rapid growth, versatile use)
• Neem: 20% (native species, ecosystem benefits)
• Teak: 10% (long-term carbon storage)

Planting Schedule:
Year 1-2: ${Math.ceil(neutralityGap / 4.6 * 0.4)} hectares
Year 3-4: ${Math.ceil(neutralityGap / 4.6 * 0.4)} hectares
Year 5: ${Math.ceil(neutralityGap / 4.6 * 0.2)} hectares

═══════════════════════════════════════════════════════════════

FINANCIAL ANALYSIS

4.1 INVESTMENT SUMMARY
Phase 1 (Immediate): ₹17 Crores
Phase 2 (Short-term): ₹105 Crores
Phase 3 (Long-term): ₹95 Crores
Total Investment: ₹217 Crores

4.2 CARBON CREDIT REVENUE POTENTIAL
Technology-based credits: ${(emissionResults.totalEmissions * 0.6).toFixed(0)} tonnes CO₂e × ₹800 = ₹${((emissionResults.totalEmissions * 0.6 * 800) / 10000000).toFixed(1)} Crores
Afforestation credits: ${Math.ceil(neutralityGap / 4.6) * 4.6} tonnes CO₂e × ₹600 = ₹${((Math.ceil(neutralityGap / 4.6) * 4.6 * 600) / 10000000).toFixed(1)} Crores annually

4.3 RETURN ON INVESTMENT
Total Annual Carbon Credit Revenue: ₹${(((emissionResults.totalEmissions * 0.6 * 800) + (Math.ceil(neutralityGap / 4.6) * 4.6 * 600)) / 10000000).toFixed(1)} Crores
Payback Period: ${(217 / ((emissionResults.totalEmissions * 0.6 * 800) + (Math.ceil(neutralityGap / 4.6) * 4.6 * 600)) * 10000000).toFixed(1)} years
Net Present Value (10% discount): ₹${((((emissionResults.totalEmissions * 0.6 * 800) + (Math.ceil(neutralityGap / 4.6) * 4.6 * 600)) / 10000000) * 8 - 217).toFixed(1)} Crores

═══════════════════════════════════════════════════════════════

IMPLEMENTATION ROADMAP

5.1 GOVERNANCE STRUCTURE
• Carbon Neutrality Steering Committee (Board level)
• Technical Implementation Team (Operational level)
• External Advisory Panel (Expert guidance)
• Community Engagement Committee (Stakeholder involvement)

5.2 KEY MILESTONES
2024 Q4: Complete baseline establishment and Phase 1 initiation
2025 Q2: Achieve 15% emission reduction through efficiency measures
2025 Q4: Complete renewable energy installation (Phase 2 start)
2026 Q4: Achieve 40% emission reduction through clean technologies
2027 Q4: Complete methane capture system installation
2028 Q4: Achieve 70% emission reduction target
2029 Q4: Complete afforestation program establishment
2030 Q4: Achieve carbon neutrality target

5.3 MONITORING AND REPORTING
• Monthly emission monitoring and reporting
• Quarterly progress reviews with steering committee
• Semi-annual stakeholder progress presentations
• Annual third-party verification and certification

═══════════════════════════════════════════════════════════════

RISK MANAGEMENT

6.1 TECHNICAL RISKS
• Technology performance below expectations
• Equipment reliability and maintenance challenges
• Integration complexities with existing systems

Mitigation: Phased implementation, pilot testing, vendor guarantees

6.2 FINANCIAL RISKS
• Carbon credit price volatility
• Higher than expected implementation costs
• Delayed return on investment

Mitigation: Diversified revenue streams, contingency budgets, flexible financing

6.3 REGULATORY RISKS
• Changes in carbon credit regulations
• Evolving emission standards
• Policy uncertainty

Mitigation: Regulatory monitoring, compliance buffer, stakeholder engagement

═══════════════════════════════════════════════════════════════

SUCCESS METRICS

7.1 EMISSION REDUCTION TARGETS
2025: 15% reduction (${(emissionResults.totalEmissions * 0.85).toFixed(0)} tonnes CO₂e)
2026: 40% reduction (${(emissionResults.totalEmissions * 0.60).toFixed(0)} tonnes CO₂e)
2028: 70% reduction (${(emissionResults.totalEmissions * 0.30).toFixed(0)} tonnes CO₂e)
2030: Carbon neutral (Net zero emissions)

7.2 CARBON SINK DEVELOPMENT
Current: ${carbonSinkCapacity.toFixed(0)} tonnes CO₂e absorption
Target 2030: ${(carbonSinkCapacity + neutralityGap).toFixed(0)} tonnes CO₂e absorption
Required increase: ${neutralityGap.toFixed(0)} tonnes CO₂e

7.3 FINANCIAL PERFORMANCE
Carbon credit revenue target: ₹${(((emissionResults.totalEmissions * 0.6 * 800) + (Math.ceil(neutralityGap / 4.6) * 4.6 * 600)) / 10000000).toFixed(1)} Crores annually
Cost savings from efficiency: ₹${((emissionResults.totalEmissions * 0.4 * 500) / 10000000).toFixed(1)} Crores annually
Total annual benefit: ₹${(((emissionResults.totalEmissions * 0.6 * 800) + (Math.ceil(neutralityGap / 4.6) * 4.6 * 600) + (emissionResults.totalEmissions * 0.4 * 500)) / 10000000).toFixed(1)} Crores

═══════════════════════════════════════════════════════════════

This Carbon Neutrality Plan provides a comprehensive roadmap for achieving
net-zero emissions while maintaining operational efficiency and creating
new revenue opportunities through carbon credits and cost savings.

Regular updates and revisions will ensure the plan remains aligned with
technological advances, regulatory changes, and market conditions.
`;
};

export const generateCSVExport = (data) => {
  const { emissionResults, carbonSinkCapacity, neutralityGap, workforce, annualProduction, timestamp } = data;
  
  let csv = 'Category,Metric,Value,Unit\n';
  csv += `General,Report Date,${timestamp},Date\n`;
  csv += `General,Workforce,${workforce},Employees\n`;
  csv += `General,Annual Production,${annualProduction},Million Tonnes\n`;
  csv += `Emissions,Total Emissions,${emissionResults.totalEmissions.toFixed(2)},Tonnes CO2e\n`;
  csv += `Emissions,Per Capita Emissions,${emissionResults.perCapitaEmissions.toFixed(2)},Tonnes CO2e per Employee\n`;
  csv += `Emissions,Emissions per Tonne,${(emissionResults.emissionsPerTonne * 1000).toFixed(2)},Kg CO2e per Tonne Coal\n`;
  
  Object.entries(emissionResults.categoryBreakdown).forEach(([category, value]) => {
    csv += `Emissions by Category,${category.charAt(0).toUpperCase() + category.slice(1)},${value.toFixed(2)},Tonnes CO2e\n`;
  });
  
  csv += `Carbon Sinks,Total Absorption,${carbonSinkCapacity.toFixed(2)},Tonnes CO2e\n`;
  csv += `Carbon Balance,Neutrality Gap,${neutralityGap.toFixed(2)},Tonnes CO2e\n`;
  csv += `Carbon Balance,Net Emissions,${(emissionResults.totalEmissions - carbonSinkCapacity).toFixed(2)},Tonnes CO2e\n`;
  
  return csv;
};

export const generateJSONExport = (data) => {
  return JSON.stringify({
    metadata: {
      reportType: 'Coal Mine Carbon Footprint Assessment',
      generatedAt: data.timestamp,
      version: '1.0'
    },
    mineProfile: {
      workforce: data.workforce,
      annualProduction: data.annualProduction
    },
    emissions: {
      total: data.emissionResults.totalEmissions,
      perCapita: data.emissionResults.perCapitaEmissions,
      perTonne: data.emissionResults.emissionsPerTonne,
      categoryBreakdown: data.emissionResults.categoryBreakdown
    },
    carbonSinks: {
      totalAbsorption: data.carbonSinkCapacity
    },
    carbonBalance: {
      neutralityGap: data.neutralityGap,
      netEmissions: data.emissionResults.totalEmissions - data.carbonSinkCapacity
    },
    benchmarking: {
      industryAveragePerTonne: 2.85,
      industryAveragePerCapita: 45.2,
      performanceVsIndustry: {
        perTonne: data.emissionResults.emissionsPerTonne * 1000 < 2.85 ? 'Above Average' : 'Below Average',
        perCapita: data.emissionResults.perCapitaEmissions < 45.2 ? 'Above Average' : 'Below Average'
      }
    }
  }, null, 2);
};

export const downloadFile = (content, filename, contentType = 'text/plain') => {
  const blob = new Blob([content], { type: contentType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
