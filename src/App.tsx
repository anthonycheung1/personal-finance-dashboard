import {
  etfHoldings,
  properties,
  cashAccounts,
  superAccounts,
  netWorthHistory
} from './data/financialData';

import {
  getTotalETFValue,
  getTotalPropertyEquity,
  getTotalCash,
  getTotalSuperannuationBalance,
  getNetWorth,
  getMortgageAmortisationSchedule
} from './utils/calculations';

import { formatCurrency } from './utils/formatters';

import PageLayout from './components/Layout/PageLayout';
import StatCard from './components/UI/StatCard';

import NetWorthChart from './components/Charts/NetWorthChart';
import AssetAllocationChart from './components/Charts/AssetAllocationChart';
import MortgageChart from './components/Charts/MortgageChart';

function App() {
  const netWorth = getNetWorth(
    etfHoldings,
    properties,
    superAccounts,
    cashAccounts
  );

  const mortgagePreview =
    getMortgageAmortisationSchedule(500000, 6, 30);

  return (
    <PageLayout title="Personal Finance Dashboard">

      {/* Financial overview */}
      <section className="dashboard-section">
        <h2>Financial overview</h2>

        <div className="top-level-metrics-grid">
          <StatCard
            title="Net worth"
            value={formatCurrency(netWorth)}
          />

          <StatCard
            title="ETF value"
            value={formatCurrency(
              getTotalETFValue(etfHoldings)
            )}
          />

          <StatCard
            title="Property equity"
            value={formatCurrency(
              getTotalPropertyEquity(properties)
            )}
          />

          <StatCard
            title="Cash"
            value={formatCurrency(
              getTotalCash(cashAccounts)
            )}
          />

          <StatCard
            title="Superannuation"
            value={formatCurrency(
              getTotalSuperannuationBalance(superAccounts)
            )}
          />
        </div>
      </section>

      {/* Net worth chart */}
      <section className="dashboard-section">
        <h2>Net worth over time</h2>

        <NetWorthChart history={netWorthHistory} />
      </section>

      {/* Asset allocation chart */}
      <section className="dashboard-section">
        <h2>Asset allocation</h2>

        <AssetAllocationChart
          etfs={etfHoldings}
          properties={properties}
          superAccounts={superAccounts}
          cashAccounts={cashAccounts}
        />
      </section>

      {/* Mortgage chart */}
      <section className="dashboard-section">
        <h2>Mortgage balance preview</h2>

        <MortgageChart schedule={mortgagePreview} />
      </section>

    </PageLayout>
  );
}

export default App;