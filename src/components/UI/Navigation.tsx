import { NavLink } from 'react-router-dom';

type NavigationProps = {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
};

function Navigation(props: NavigationProps) {
  return (
    <header className="site-header">
      <nav
        className="main-navigation"
        aria-label="Main navigation"
      >
        <NavLink to="/" end className="site-title">
          Finance Dashboard
        </NavLink>

        <ul className="navigation-links">
          <li>
            <NavLink to="/" end>
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/investments">
              Investments
            </NavLink>
          </li>

          <li>
            <NavLink to="/properties">
              Properties
            </NavLink>
          </li>

          <li>
            <NavLink to="/mortgage">
              Mortgage
            </NavLink>
          </li>

          <li>
            <NavLink to="/projections">
              Projections
            </NavLink>
          </li>
        </ul>

        <button
          type="button"
          className="theme-toggle"
          onClick={props.onToggleDarkMode}
          aria-label={
            props.isDarkMode
              ? 'Switch to light mode'
              : 'Switch to dark mode'
          }
        >
          {props.isDarkMode
            ? '☀ Light Mode'
            : '☾ Dark Mode'}
        </button>
      </nav>
    </header>
  );
}

export default Navigation;