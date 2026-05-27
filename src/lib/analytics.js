export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);
}

export function calculateAnalytics(calls) {
  if (!calls.length) {
    return {
      totalCalls: 0,
      totalCost: 0,
      avgDuration: 0,
      successfulCalls: 0,
      failedCalls: 0,
      longestCall: 0,
      shortestCall: 0,
      costByCity: [],
      callsByCity: [],
      callsPerHour: [],
    };
  }

  const totalCalls = calls.length;
  const totalCost = calls.reduce((sum, c) => sum + Number(c.callCost), 0);
  const totalDuration = calls.reduce((sum, c) => sum + c.callDuration, 0);
  const avgDuration = Math.round(totalDuration / totalCalls);

  const successfulCalls = calls.filter(c => c.callStatus).length;
  const failedCalls = totalCalls - successfulCalls;

  const durations = calls.map(c => c.callDuration);
  const longestCall = Math.max(...durations);
  const shortestCall = Math.min(...durations);

  const cityMap = {};
  const costMap = {};
  const hourMap = Array.from({ length: 24 }, (_, i) => ({ hour: `${i}:00`, calls: 0 }));

  calls.forEach(call => {
    const city = call.city;
    const cost = Number(call.callCost);

    cityMap[city] = (cityMap[city] || 0) + 1;
    costMap[city] = (costMap[city] || 0) + cost;

    const hour = new Date(call.callStartTime).getHours();
    hourMap[hour].calls += 1;
  });

  const callsByCity = Object.entries(cityMap)
    .map(([city, calls]) => ({ city, calls }))
    .sort((a, b) => b.calls - a.calls)
    .slice(0, 10);

  const costByCity = Object.entries(costMap)
    .map(([city, cost]) => ({ city, cost: Number(cost.toFixed(2)) }))
    .sort((a, b) => b.cost - a.cost)
    .slice(0, 10);

  return {
    totalCalls,
    totalCost,
    avgDuration,
    successfulCalls,
    failedCalls,
    longestCall,
    shortestCall,
    costByCity,
    callsByCity,
    callsPerHour: hourMap,
  };
}
