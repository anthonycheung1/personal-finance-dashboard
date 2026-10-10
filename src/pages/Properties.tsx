import { properties } from '../data/financialData';

import {
  getTotalPropertyEquity,
  getTotalPropertyMortgage,
  getTotalPropertyAnnualRentalIncome,
  getTotalPropertyAnnualInterest,
  getTotalPropertyCashFlow
} from '../utils/calculations';

import { formatCurrency } from '../utils/formatters';

import StatCard from '../components/UI/StatCard';
import PropertyTable from '../components/UI/PropertyTable';
import PageLayout from '../components/Layout/PageLayout';

function Properties() {
  return (
    <PageLayout title="Property Portfolio">
      <p className="page-intro">
        Review property values, mortgage balances, equity, rental income and estimated annual cash flow.
      </p>

      <section className="dashboard-section">
        <h2>
          Portfolio summary
        </h2>

        <div className="top-level-metrics-grid">
          <StatCard
            title="Property equity"
            value={formatCurrency(getTotalPropertyEquity(properties))}
          />

          <StatCard
            title="Mortgage balances"
            value={formatCurrency(getTotalPropertyMortgage(properties))}
          />

          <StatCard
            title="Annual rental income"
            value={formatCurrency(getTotalPropertyAnnualRentalIncome(properties))}
          />

          <StatCard
            title="Annual interest"
            value={formatCurrency(getTotalPropertyAnnualInterest(properties))}
          />

          <StatCard
            title="Annual cash flow"
            value={formatCurrency(getTotalPropertyCashFlow(properties))}
            subtitle="Before tax"
          />
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Properties</h2>

        <PropertyTable properties={properties}/>
      </section>
    </PageLayout>
  );
}

export default Properties;