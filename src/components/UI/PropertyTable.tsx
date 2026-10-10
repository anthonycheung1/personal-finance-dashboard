import type { Property } from '../../types/finance';

import {
  getPropertyEquity,
  getPropertyLVR,
  getPropertyAnnualRentalIncome,
  getPropertyAnnualInterest,
  getPropertyCashFlow
} from '../../utils/calculations';

import {
  formatCurrency,
  formatPercentage
} from '../../utils/formatters';

type PropertyTableProps = {
  properties: Property[];
};

function PropertyTable(props: PropertyTableProps) {
  if (props.properties.length === 0) {
    return (
      <p className="empty-state">
        No properties have been added yet.
      </p>
    );
  }

  return (
    <div className="table-container">
      <table>
        <caption>
          Property portfolio
        </caption>

        <thead>
          <tr>
            <th scope="col">Property</th>
            <th scope="col">Suburb</th>
            <th scope="col">Value</th>
            <th scope="col">Mortgage</th>
            <th scope="col">Offset</th>
            <th scope="col">LVR</th>
            <th scope="col">Equity</th>
            <th scope="col">Annual rental income</th>
            <th scope="col">Annual interest</th>
            <th scope="col">Annual cash flow</th>
          </tr>
        </thead>

        <tbody>
          {props.properties.map((property) => {
              const cashFlow = getPropertyCashFlow(property);

              return (
                <tr key={property.id}>
                  <td>{property.name}</td>
                  <td>{property.suburb}</td>
                  <td>{formatCurrency(property.currentValue)}</td>
                  <td>{formatCurrency(property.mortgageBalance)}</td>
                  <td>{formatCurrency(property.offsetBalance)}</td>
                  <td>{formatPercentage(getPropertyLVR(property))}</td>
                  <td>{formatCurrency(getPropertyEquity(property))}</td>
                  <td>{formatCurrency(getPropertyAnnualRentalIncome(property))}</td>
                  <td>{formatCurrency(getPropertyAnnualInterest(property))}</td>
                  <td className={cashFlow >= 0 ? 'positive' : 'negative'}>{formatCurrency(cashFlow)}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PropertyTable;