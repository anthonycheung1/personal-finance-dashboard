import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import type { NetWorthHistory } from '../../types/finance';

import { formatCurrency } from '../../utils/formatters';

type NetWorthChartProps = {
  history: NetWorthHistory[];
};

function NetWorthChart(props: NetWorthChartProps) {
  const chartData = props.history.map((entry) => ({
    date: entry.date.toISOString(),
    netWorth: entry.netWorth
  }));

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={chartData} margin={{top: 12, right: 20, bottom: 20, left: 12}}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)"/>

          <XAxis dataKey="date" stroke="var(--secondary-text-color)"
            tickFormatter={(value) =>
              new Date(
                String(value)
              ).toLocaleDateString('en-AU', {
                month: 'short',
                year: 'numeric'
              })
            }
          />

          <YAxis stroke="var(--secondary-text-color)"
            tickFormatter={(value) =>
              `$${(
                Number(value) / 1000
              ).toFixed(0)}k`
            }
            width={75}
          />

          <Tooltip labelFormatter={(value) =>
              new Date(
                String(value)
              ).toLocaleDateString('en-AU', {
                month: 'long',
                year: 'numeric'
              })
            }
            formatter={(value) => [
              formatCurrency(Number(value)),
              'Net worth'
            ]}
          />

          <Line type="monotone" dataKey="netWorth" name="Net worth" stroke="var(--primary-color)" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 6 }}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default NetWorthChart;