import { useState, useMemo } from 'react';
import { EMISSION_FACTORS, CARBON_ABSORPTION_RATES } from '../data/constants';

export const useCalculations = () => {
  const [activities, setActivities] = useState({});
  const [sinks, setSinks] = useState([]);
  const [workforce, setWorkforce] = useState(1000);
  const [annualProduction, setAnnualProduction] = useState(1);

  const emissionResults = useMemo(() => {
    let totalEmissions = 0;
    const categoryBreakdown = {};

    Object.entries(activities).forEach(([activityId, quantity]) => {
      const factor = EMISSION_FACTORS[activityId];
      if (factor && quantity > 0) {
        const emissions = quantity * factor.emissionFactor;
        totalEmissions += emissions;

        if (!categoryBreakdown[factor.category]) {
          categoryBreakdown[factor.category] = 0;
        }
        categoryBreakdown[factor.category] += emissions;
      }
    });

    return {
      totalEmissions: totalEmissions / 1000, // Convert to tonnes
      categoryBreakdown: Object.fromEntries(
        Object.entries(categoryBreakdown).map(([key, value]) => [key, value / 1000])
      ),
      perCapitaEmissions: workforce > 0 ? (totalEmissions / 1000) / workforce : 0,
      emissionsPerTonne: annualProduction > 0 ? (totalEmissions / 1000) / (annualProduction * 1000000) : 0
    };
  }, [activities, workforce, annualProduction]);

  const carbonSinkCapacity = useMemo(() => {
    return sinks.reduce((total, sink) => {
      const absorptionRate = CARBON_ABSORPTION_RATES[sink.type];
      const ageMultiplier = Math.min(sink.currentAge / sink.maturityAge, 1);
      return total + (sink.area * absorptionRate * ageMultiplier);
    }, 0);
  }, [sinks]);

  const neutralityGap = useMemo(() => {
    return Math.max(0, emissionResults.totalEmissions - carbonSinkCapacity);
  }, [emissionResults.totalEmissions, carbonSinkCapacity]);

  const updateActivity = (activityId, quantity) => {
    setActivities(prev => ({
      ...prev,
      [activityId]: quantity
    }));
  };

  const addCarbonSink = (sink) => {
    setSinks(prev => [...prev, sink]);
  };

  const removeCarbonSink = (sinkId) => {
    setSinks(prev => prev.filter(sink => sink.id !== sinkId));
  };

  const calculateTechnologyImpact = (technology) => {
    const reductionAmount = (emissionResults.totalEmissions * technology.emissionReduction) / 100;
    const newTotal = emissionResults.totalEmissions - reductionAmount;
    const newGap = Math.max(0, newTotal - carbonSinkCapacity);

    return {
      reductionAmount,
      newTotal,
      newGap,
      costPerTonne: technology.implementationCost / reductionAmount,
      annualSavings: reductionAmount * 800 // Assuming carbon price of INR 800/tonne
    };
  };

  return {
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
  };
};
