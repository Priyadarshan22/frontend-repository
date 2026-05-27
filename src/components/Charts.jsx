import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

export default function Charts({ stats }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ChartCard title="Call Cost by City">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.costByCity}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="city" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cost" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Calls Per Hour">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats.callsPerHour}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Line   type="monotone" dataKey="calls" stroke="#3b82f6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Calls by City">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={stats.callsByCity} dataKey="calls" nameKey="city" outerRadius={100}>
              {stats.callsByCity.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Duration Insights">
        <div className="space-y-2 text-lg text-yellow-300">
          <p>Longest Call: {stats.longestCall}s</p>
          <p>Shortest Call: {stats.shortestCall}s</p>
          <p>Average Duration: {stats.avgDuration}s</p>
        </div>
      </ChartCard>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
