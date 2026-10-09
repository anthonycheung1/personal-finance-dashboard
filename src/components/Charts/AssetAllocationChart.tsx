import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import type {
  ETF,
  Property,
  CashAccount,
  SuperAccount
} from '../../types/finance';

import {
  getTotalETFValue,
  getTotalPropertyEquity,
  getTotalCash,
  getTotalSuperannuationBalance
} from '../../utils/calculations';

import { formatCurrency } from '../../utils/formatters';

type AssetAllocationChartProps = {
  etfs: ETF[];
  properties: Property[];
  superAccounts: SuperAccount[];
  cashAccounts: CashAccount[];
};

const chartColours = [
  '#1f4e79',
  '#4f81bd',
  '#70ad47',
  '#ed7d31'
];

function AssetAllocationChart(
  props: AssetAllocationChartProps
) {
  const data = [
    {
      name: 'ETFs',
      value: getTotalETFValue(props.etfs)
    },
    {
      name: 'Property equity',
      value: getTotalPropertyEquity(
        props.properties
      )
    },
    {
      name: 'Cash',
      value: getTotalCash(
        props.cashAccounts
      )
    },
    {
      name: 'Superannuation',
      value: getTotalSuperannuationBalance(
        props.superAccounts
      )
    }
  ].filter((item) => item.value > 0);

  return (
    <div className="chart-container">
      {data.length === 0 ? (
        <p className="empty-state">
          No asset data is available to display.
        </p>
      ) : (
        <ResponsiveContainer
          width="100%"
          height={360}
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={115}
              label={({ name, percent = 0 }) =>
                `${name}: ${(
                  percent * 100
                ).toFixed(1)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={
                    chartColours[
                      index % chartColours.length
                    ]
                  }
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [
                formatCurrency(
                  Number(value)
                ),
                'Value'
              ]}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default AssetAllocationChart;