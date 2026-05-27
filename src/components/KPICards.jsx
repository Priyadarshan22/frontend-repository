import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '../lib/analytics';

export default function KPICards({ stats }) {
  const items = [
    ['Total Calls', stats.totalCalls],
    ['Total Cost', formatCurrency(stats.totalCost)],
    ['Avg Duration', `${stats.avgDuration}s`],
    ['Successful Calls', stats.successfulCalls],
    ['Failed Calls', stats.failedCalls],
    ['Longest Call', `${stats.longestCall}s`],
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map(([label, value]) => (
        <Card key={label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">{label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
