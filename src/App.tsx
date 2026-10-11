import { useEffect, useState } from 'react';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import './App.css';

import type { ETF } from './types/finance';

import { etfHoldings } from './data/financialData';

import Navigation from './components/UI/Navigation';

import Dashboard from './pages/Dashboard';
import Investments from './pages/Investments';
import Properties from './pages/Properties';
import Mortgage from './pages/Mortgage';
import Projections from './pages/Projections';

const etfStorageKey = 'personal-finance-dashboard-etfs';
const themeStorageKey = 'personal-finance-dashboard-theme';

function readSavedETFs(): ETF[] {
  try {
    const savedData = localStorage.getItem(etfStorageKey);

    if (!savedData) {
      return etfHoldings;
    }

    const parsedData: unknown = JSON.parse(savedData);

    if (!Array.isArray(parsedData)) {
      return etfHoldings;
    }

    return parsedData as ETF[];
  }
  catch {
    return etfHoldings;
  }
}

function readSavedTheme(): boolean {
  try {
    return localStorage.getItem(themeStorageKey) === 'dark';
  }
  catch {
    return false;
  }
}

function App() {
  const [etfs, setEtfs] = useState<ETF[]>(readSavedETFs);
  const [isDarkMode, setIsDarkMode] = useState(readSavedTheme);

  useEffect(() => {
    try {
      localStorage.setItem(
        etfStorageKey,
        JSON.stringify(etfs)
      );
    }
    catch (error) {
      console.error('Unable to save ETF data:', error);
    }
  }, [etfs]);

  useEffect(() => {
    try {
      localStorage.setItem(
        themeStorageKey,
        isDarkMode ? 'dark' : 'light'
      );
    }
    catch (error) {
      console.error('Unable to save theme preference:', error);
    }

    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((previousMode) => !previousMode);
  }

  function addETF(newETF: ETF) {
    setEtfs((previousETFs) => [...previousETFs, newETF]);
  }

  function updateETF(updatedETF: ETF) {
    setEtfs((previousETFs) => previousETFs.map((etf) => etf.id === updatedETF.id ? updatedETF : etf));
  }

  function deleteETF(id: number) {
    setEtfs((previousETFs) => previousETFs.filter((etf) => etf.id !== id));
  }

  return (
    <BrowserRouter basename="/personal-finance-dashboard">
      <div className="app">
        <Navigation isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />

        <Routes>
          <Route path="/" element={<Dashboard etfs={etfs} />} />
          <Route path="/investments"
            element={
              <Investments
                etfs={etfs}
                onAddETF={addETF}
                onUpdateETF={updateETF}
                onDeleteETF={deleteETF}
              />
            }
          />

          <Route
            path="/properties"
            element={<Properties />}
          />

          <Route
            path="/mortgage"
            element={<Mortgage />}
          />

          <Route
            path="/projections"
            element={<Projections etfs={etfs} />}
          />

          <Route
            path="*"
            element={
              <main className="page-content">
                <h1>Page not found</h1>

                <p>The page you requested does not exist.</p>
              </main>
            }
          />
        </Routes>

        <footer className="site-footer">
          <p>Personal Finance Dashboard · Illustrative data for demonstration purposes</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;