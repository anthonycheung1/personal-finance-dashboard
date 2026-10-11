import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import { formatCurrency } from '../../utils/formatters';

export type ProjectionPoint = {
  year: number;
  balance: number;
};

type ProjectionChartProps = {
  data: ProjectionPoint[];
  years: number;
};

function ProjectionChart(props: ProjectionChartProps) {
  return (
    <div
      role="img"
      aria-label="Line chart showing the projected ETF portfolio value over time."
      style={{ width: '100%', height: 350 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={props.data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="year"
            type="number"
            domain={[0, props.years]}
            allowDecimals={false}
            tickCount={Math.min(props.years + 1, 11)}
            label={{
              value: 'Years from now',
              position: 'insideBottom',
              offset: -5
            }}
          />

          <YAxis
            tickFormatter={(value: number) =>
              `$${Number(value).toLocaleString('en-AU', {
                notation: 'compact',
                maximumFractionDigits: 1
              })}`
            }
            width={80}
          />

          <Tooltip
            labelFormatter={(label) => `Year ${label}`}
            formatter={(value) => [
              formatCurrency(Number(value)),
              'Portfolio value'
            ]}
          />

          <Legend />

          <Line
            type="monotone"
            dataKey="balance"
            name="Projected portfolio value"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProjectionChart;