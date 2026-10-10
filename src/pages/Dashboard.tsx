import type { ETF } from '../types/finance';

import {
  properties,
  cashAccounts,
  superAccounts,
  netWorthHistory
} from '../data/financialData';

import {
  getTotalETFValue,
  getNetWorth,
  getTotalPropertyEquity,
  getTotalPropertyMortgage,
  getTotalCash,
  getTotalSuperannuationBalance,
  getTotalPropertyCashFlow
} from '../utils/calculations';

import { formatCurrency } from '../utils/formatters';

import StatCard from '../components/UI/StatCard';
import NetWorthChart from '../components/Charts/NetWorthChart';
import AssetAllocationChart from '../components/Charts/AssetAllocationChart';
import PageLayout from '../components/Layout/PageLayout';

type DashboardProps = {
  etfs: ETF[];
};

function Dashboard(props: DashboardProps) {
  return (
    <PageLayout title="Personal Finance Dashboard">
      <section className="dashboard-section" aria-labelledby="overview-title">
        <h2 id="overview-title">
          Financial overview
        </h2>

        <div className="top-level-metrics-grid">
          <StatCard
            title="Total net worth"
            value={formatCurrency(getNetWorth(props.etfs, properties, superAccounts, cashAccounts))}
            subtitle="Investments, property equity, cash and super"
          />

          <StatCard
            title="Cash"
            value={formatCurrency(getTotalCash(cashAccounts))}
          />

          <StatCard
            title="ETF portfolio"
            value={formatCurrency(getTotalETFValue(props.etfs)
            )}
          />

          <StatCard
            title="Superannuation"
            value={formatCurrency(getTotalSuperannuationBalance(superAccounts))}
          />

          <StatCard
            title="Property equity"
            value={formatCurrency(getTotalPropertyEquity(properties))}
          />

          <StatCard
            title="Mortgage balances"
            value={formatCurrency(getTotalPropertyMortgage(properties))}
          />

          <StatCard
            title="Annual property cash flow"
            value={formatCurrency(getTotalPropertyCashFlow(properties))}
            subtitle="Before tax"
          />
        </div>
      </section>

      <section className="dashboard-charts">
        <article className="dashboard-chart-card">
          <h2>
            Net worth history
          </h2>

          <NetWorthChart history={netWorthHistory}/>
        </article>

        <article className="dashboard-chart-card">
          <h2>
            Asset allocation
          </h2>

          <AssetAllocationChart
            etfs={props.etfs}
            properties={properties}
            superAccounts={superAccounts}
            cashAccounts={cashAccounts}
          />
        </article>
      </section>
    </PageLayout>
  );
}

export default Dashboard;