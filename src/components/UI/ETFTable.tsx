import type { ETF } from '../../types/finance';

import {
  getETFCurrentValue,
  getETFTotalCost,
  getETFDollarGainLoss,
  getETFPercentageGainLoss
} from '../../utils/calculations';

import {
  formatCurrency,
  formatPercentage,
  formatNumber
} from '../../utils/formatters';

import { useState } from 'react';

type ETFTableProps = {
  etfs: ETF[];
  onAddETF: (newETF: ETF) => void;
  onUpdateETF: (ETFtoEdit: ETF) => void;
  onDeleteETF: (ETFtoDeleteId: number) => void;
};

function getNewETFid(props: ETFTableProps): number {
  let highestETFid = 0;

  for (const etf of props.etfs) {
    highestETFid = Math.max(highestETFid, etf.id);
  }

  return highestETFid + 1;
}

function ETFTable(props: ETFTableProps) {
  const [searchText, setSearchText] = useState('');

  const filteredETFs = props.etfs.filter((etf) => {
    return (etf.ticker.toLowerCase().includes(searchText.toLowerCase()) || etf.name.toLowerCase().includes(searchText.toLowerCase()));
  });

  const [newETFticker, setNewETFticker] = useState('');
  const [newETFname, setNewETFname] = useState('');
  const [newETFunits, setNewETFunits] = useState<number | ''>('');
  const [newETFcurrentPrice, setNewETFcurrentPrice] = useState<number | ''>('');
  const [newETFaveragePurchasePrice, setNewETFaveragePurchasePrice] = useState<number | ''>('');

  const [editingETFid, setEditingETFid] = useState<number | null>(null);

  const editingETF = props.etfs.find((etf) => etf.id === editingETFid);

  const [etfTickerError, setEtfTickerError] = useState<string | null>(null);
  const [etfNameError, setEtfNameError] = useState<string | null>(null);
  const [etfUnitsError, setEtfUnitsError] = useState<string | null>(null);
  const [etfCurrentPriceError, setEtfCurrentPriceError] = useState<string | null>(null);
  const [etfAveragePurchasePriceError, setEtfAveragePurchasePriceError] = useState<string | null>(null);

  return (
    <section>
      <h2>ETF Portfolio</h2>

      <div className="etf-search">
        <label htmlFor="etf-search">
          Search ETFs
        </label>

        <input
          id="etf-search"
          type="text"
          value={searchText}
          onChange={(event) =>
            setSearchText(event.target.value)
          }
          placeholder="ETF ticker or name"
        />
      </div>

      {props.etfs.length === 0 ? (
        <p>
          The ETF portfolio is empty.
        </p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th scope="col">Ticker</th>
                <th scope="col">Name</th>
                <th scope="col">Units</th>
                <th scope="col">Current Price</th>
                <th scope="col">
                  Average Purchase Price
                </th>
                <th scope="col">Total Cost</th>
                <th scope="col">Current Value</th>
                <th scope="col">Gain/Loss</th>
                <th scope="col">Gain/Loss %</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredETFs.map((etf) => (
                <tr key={etf.id}>
                  <td>{etf.ticker}</td>
                  <td>{etf.name}</td>
                  <td>{formatNumber(etf.units)}</td>
                  <td>{formatCurrency(etf.currentPrice)}</td>
                  <td>{formatCurrency(etf.averagePurchasePrice)}</td>
                  <td>{formatCurrency(getETFTotalCost(etf))}</td>
                  <td>{formatCurrency(getETFCurrentValue(etf))}</td>
                  <td>{formatCurrency(getETFDollarGainLoss(etf))}</td>
                  <td>{formatPercentage(getETFPercentageGainLoss(etf))}</td>

                  <td>
                    <div className="table-actions">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingETFid(etf.id);
                          setNewETFticker(etf.ticker);
                          setNewETFname(etf.name);
                          setNewETFunits(etf.units);
                          setNewETFcurrentPrice(etf.currentPrice);
                          setNewETFaveragePurchasePrice(etf.averagePurchasePrice);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          props.onDeleteETF(etf.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h3>
        {editingETFid !== null? 'Edit an ETF' : 'Add an ETF'}
      </h3>

      <form
        id="etf-form"
        className="etf-form"
        onSubmit={(event) => {
          event.preventDefault();

          let hasErrors = false;

          setEtfTickerError(null);
          setEtfNameError(null);
          setEtfUnitsError(null);
          setEtfCurrentPriceError(null);
          setEtfAveragePurchasePriceError(null);

          if (newETFticker.trim() === '') {
            setEtfTickerError('ETF ticker must not be blank.');
            hasErrors = true;
          }

          if (newETFname.trim() === '') {
            setEtfNameError('ETF name must not be blank.');
            hasErrors = true;
          }

          if (newETFunits === '' || newETFunits <= 0 || !Number.isInteger(newETFunits)) {
            setEtfUnitsError('Number of ETF units must be a whole number greater than zero.');
            hasErrors = true;
          }

          if (newETFcurrentPrice === '' || newETFcurrentPrice <= 0) {
            setEtfCurrentPriceError('Current price must be greater than zero.');
            hasErrors = true;
          }

          if (newETFaveragePurchasePrice === '' || newETFaveragePurchasePrice <= 0) {
            setEtfAveragePurchasePriceError('Average purchase price must be greater than zero.');
            hasErrors = true;
          }

          if (hasErrors) {
            return;
          }

          if (newETFunits === '' || newETFcurrentPrice === '' || newETFaveragePurchasePrice === '') {
            return;
          }

          if (editingETFid !== null && editingETF !== undefined) {
            const newETF: ETF = {
              id: editingETF.id,
              ticker: newETFticker.trim().toUpperCase(),
              name: newETFname.trim(),
              units: newETFunits,
              currentPrice: newETFcurrentPrice,
              averagePurchasePrice: newETFaveragePurchasePrice
            };

            props.onUpdateETF(newETF);
            setEditingETFid(null);
          } else {
            const newETF: ETF = {
              id: getNewETFid(props),
              ticker: newETFticker.trim().toUpperCase(),
              name: newETFname.trim(),
              units: newETFunits,
              currentPrice: newETFcurrentPrice,
              averagePurchasePrice: newETFaveragePurchasePrice
            };

            props.onAddETF(newETF);
          }

          setNewETFticker('');
          setNewETFname('');
          setNewETFunits('');
          setNewETFcurrentPrice('');
          setNewETFaveragePurchasePrice('');
        }}
      >
        <div className="form-field">
          <label htmlFor="etf-ticker">
            Ticker
          </label>

          <input
            id="etf-ticker"
            type="text"
            value={newETFticker}
            onChange={(event) => {
              const value = event.target.value;

              setNewETFticker(value);

              if (value.trim() !== '') {
                setEtfTickerError(null);
              }
            }}
            placeholder="ETF ticker"
            required
            aria-invalid={etfTickerError !== null}
            aria-describedby="etf-ticker-error"
          />

          {etfTickerError !== null && (
            <p
              id="etf-ticker-error"
              className="form-error"
            >
              {etfTickerError}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="etf-name">
            Name
          </label>

          <input
            id="etf-name"
            type="text"
            value={newETFname}
            onChange={(event) => {
              const value = event.target.value;

              setNewETFname(value);

              if (value.trim() !== '') {
                setEtfNameError(null);
              }
            }}
            placeholder="ETF name"
            required
            aria-invalid={etfNameError !== null}
            aria-describedby="etf-name-error"
          />

          {etfNameError !== null && (
            <p
              id="etf-name-error"
              className="form-error"
            >
              {etfNameError}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="etf-units">
            Number of Units
          </label>

          <input
            id="etf-units"
            type="number"
            value={newETFunits}
            onChange={(event) => {
              const value = event.target.value;

              const units = value === '' ? '' : Number(value);

              setNewETFunits(units);

              if (units !== '' && units > 0 && Number.isInteger(units)) {
                setEtfUnitsError(null);
              }
            }}
            placeholder="0"
            required
            min="1"
            step="1"
            aria-invalid={etfUnitsError !== null}
            aria-describedby="etf-units-error"
          />

          {etfUnitsError !== null && (
            <p
              id="etf-units-error"
              className="form-error"
            >
              {etfUnitsError}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="etf-current-price">
            Current Price
          </label>

          <input
            id="etf-current-price"
            type="number"
            value={newETFcurrentPrice}
            onChange={(event) => {
              const value = event.target.value;

              const currentPrice = value === '' ? '' : Number(value);

              setNewETFcurrentPrice(currentPrice);

              if (currentPrice !== '' && currentPrice > 0) {
                setEtfCurrentPriceError(null);
              }
            }}
            placeholder="0"
            required
            min="0.01"
            step="0.01"
            aria-invalid={etfCurrentPriceError !== null}
            aria-describedby="etf-current-price-error"
          />

          {etfCurrentPriceError !== null && (
            <p
              id="etf-current-price-error"
              className="form-error"
            >
              {etfCurrentPriceError}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="etf-average-purchase-price">
            Average Purchase Price
          </label>

          <input
            id="etf-average-purchase-price"
            type="number"
            value={newETFaveragePurchasePrice}
            onChange={(event) => {
              const value = event.target.value;

              const averagePurchasePrice = value === '' ? '' : Number(value);

              setNewETFaveragePurchasePrice(averagePurchasePrice);

              if (averagePurchasePrice !== '' && averagePurchasePrice > 0) {
                setEtfAveragePurchasePriceError(null);
              }
            }}
            placeholder="0"
            required
            min="0.01"
            step="0.01"
            aria-invalid={etfAveragePurchasePriceError !== null}
            aria-describedby="etf-average-purchase-price-error"
          />

          {etfAveragePurchasePriceError !== null && (
            <p
              id="etf-average-purchase-price-error"
              className="form-error"
            >
              {etfAveragePurchasePriceError}
            </p>
          )}
        </div>

        <div className="form-actions">
          <button type="submit">
            {editingETFid !== null ? 'Update ETF' : 'Add ETF'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ETFTable;