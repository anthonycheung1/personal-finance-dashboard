import {
  etfHoldings,
  properties,
  cashAccounts,
  superAccounts
} from './data/financialData';

import {
  getTotalETFValue,
  getTotalPropertyEquity,
  getTotalCash,
  getTotalSuperannuationBalance,
  getNetWorth
} from './utils/calculations';

import { formatCurrency } from './utils/formatters';
import PageLayout from './components/Layout/PageLayout';
import StatCard from './components/UI/StatCard';

function App() {
  const netWorth = getNetWorth(etfHoldings, properties, superAccounts, cashAccounts);

  return (
    <PageLayout title="Personal Finance Dashboard">
      <section className="dashboard-section">
        <h2>Financial overview</h2>
        <div className="top-level-metrics-grid">
          <StatCard title="Net worth" value={formatCurrency(netWorth)} />
          <StatCard title="ETF value" value={formatCurrency(getTotalETFValue(etfHoldings))} />
          <StatCard title="Property equity" value={formatCurrency(getTotalPropertyEquity(properties))} />
          <StatCard title="Cash" value={formatCurrency(getTotalCash(cashAccounts))} />
          <StatCard title="Superannuation" value={formatCurrency(getTotalSuperannuationBalance(superAccounts))} />
        </div>
      </section>
    </PageLayout>
  );
}

export default App;