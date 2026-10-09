import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import type { MortgagePayment } from '../../types/finance';

import { formatCurrency } from '../../utils/formatters';

type MortgageChartProps = {
  schedule: MortgagePayment[];
};

function MortgageChart(
  props: MortgageChartProps
) {
  if (props.schedule.length === 0) {
    return (
      <p className="empty-state">
        Calculate a mortgage to view the
        balance chart.
      </p>
    );
  }

  const chartData =
    props.schedule.filter(
      (payment) =>
        payment.month === 1 ||
        payment.month % 12 === 0 ||
        payment.month ===
          props.schedule.length
    );

  return (
    <div className="chart-container">
      <ResponsiveContainer
        width="100%"
        height={360}
      >
        <LineChart
          data={chartData}
          margin={{
            top: 12,
            right: 20,
            bottom: 20,
            left: 12
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border-color)"
          />

          <XAxis
            dataKey="month"
            stroke="var(--secondary-text-color)"
            tickFormatter={(value) =>
              `Year ${Math.ceil(
                Number(value) / 12
              )}`
            }
          />

          <YAxis
            stroke="var(--secondary-text-color)"
            tickFormatter={(value) =>
              `$${(
                Number(value) / 1000
              ).toFixed(0)}k`
            }
            width={75}
          />

          <Tooltip
            labelFormatter={(value) =>
              `Month ${String(value)}`
            }
            formatter={(value) => [
              formatCurrency(
                Number(value)
              ),
              'Remaining balance'
            ]}
          />

          <Line
            type="monotone"
            dataKey="balance"
            name="Mortgage balance"
            stroke="var(--primary-color)"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MortgageChart;