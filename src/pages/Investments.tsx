import type { ETF } from '../types/finance';

import ETFTable from '../components/UI/ETFTable';
import PageLayout from '../components/Layout/PageLayout';

type InvestmentsProps = {
  etfs: ETF[];
  onAddETF: (etf: ETF) => void;
  onUpdateETF: (etf: ETF) => void;
  onDeleteETF: (id: number) => void;
};

function Investments(
  props: InvestmentsProps
) {
  return (
    <PageLayout title="Investments">
      <p className="page-intro">
        Track your ETF holdings, market values and investment returns. The displayed prices are sample values and are not live market data.
      </p>

      <ETFTable
        etfs={props.etfs}
        onAddETF={props.onAddETF}
        onUpdateETF={props.onUpdateETF}
        onDeleteETF={props.onDeleteETF}
      />
    </PageLayout>
  );
}

export default Investments;