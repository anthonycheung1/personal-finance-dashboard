import { useState } from 'react';

import type { ETF } from './types/finance';

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
import ETFTable from './components/UI/ETFTable';
import PropertyTable from './components/UI/PropertyTable';

import NetWorthChart from './components/Charts/NetWorthChart';
import AssetAllocationChart from './components/Charts/AssetAllocationChart';
import MortgageChart from './components/Charts/MortgageChart';

function App() {
  // ETF portfolio state
  const [etfs, setEtfs] = useState<ETF[]>(etfHoldings);

  // Financial calculations
  const netWorth = getNetWorth(
    etfs,
    properties,
    superAccounts,
    cashAccounts
  );

  const mortgagePreview =
    getMortgageAmortisationSchedule(500000, 6, 30);

  // Add an ETF
  function handleAddETF(newETF: ETF) {
    setEtfs((currentETFs) => [
      ...currentETFs,
      newETF
    ]);
  }

  // Update an ETF
  function handleUpdateETF(updatedETF: ETF) {
    setEtfs((currentETFs) =>
      currentETFs.map((etf) =>
        etf.id === updatedETF.id ? updatedETF : etf
      )
    );
  }

  // Delete an ETF
  function handleDeleteETF(id: number) {
    setEtfs((currentETFs) =>
      currentETFs.filter((etf) => etf.id !== id)
    );
  }

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
              getTotalETFValue(etfs)
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

        <NetWorthChart
          history={netWorthHistory}
        />
      </section>

      {/* Asset allocation chart */}
      <section className="dashboard-section">
        <h2>Asset allocation</h2>

        <AssetAllocationChart
          etfs={etfs}
          properties={properties}
          superAccounts={superAccounts}
          cashAccounts={cashAccounts}
        />
      </section>

      {/* Mortgage chart */}
      <section className="dashboard-section">
        <h2>Mortgage balance preview</h2>

        <MortgageChart
          schedule={mortgagePreview}
        />
      </section>

      {/* ETF portfolio */}
      <section className="dashboard-section">
        <h2>ETF portfolio</h2>

        <ETFTable
          etfs={etfs}
          onAddETF={handleAddETF}
          onUpdateETF={handleUpdateETF}
          onDeleteETF={handleDeleteETF}
        />
      </section>

      {/* Property portfolio */}
      <section className="dashboard-section">
        <h2>Property portfolio</h2>

        <PropertyTable
          properties={properties}
        />
      </section>

    </PageLayout>
  );
}

export default App;