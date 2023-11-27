import React from 'react';
import {
  Compliments,
  Crypto,
  DateTime,
  DaysUntil,
  Forcast,
  Moon,
  News,
  Weather,
} from 'components/modules';
import './index.css';

const MODULES = [
  {
    className: 'date-time',
    component: DateTime,
  },
  {
    className: 'weather',
    component: Weather,
  },
  {
    className: 'forecast',
    component: Forcast,
  },
  {
    className: 'crypto',
    component: Crypto,
  },
  {
    className: 'moon',
    component: Moon,
  },
  {
    className: 'compliments',
    component: Compliments,
  },
  {
    className: 'news',
    component: News,
  },
  {
    className: 'days-until',
    component: DaysUntil,
  },
  {
    className: 'blank',
    component: () => <div />,
  },
];
const App = () => {
  return (
    <div className="module-layout">
      {MODULES.map(({ className, component: Component }) => (
        <div className={className} key={className}>
          <Component />
        </div>
      ))}
      <div className="blank" />
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
