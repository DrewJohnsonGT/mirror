import {
  Compliments,
  Crypto,
  DateTime,
  Forcast,
  Moon,
  ToDo,
  Weather,
} from 'components/modules';

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
    className: 'todo',
    component: ToDo,
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
    className: 'blank',
    component: () => <div />,
  },
];
export const App = () => {
  return (
    <div className="module-layout">
      {MODULES.map(({ className, component: Component }) => (
        <div className={className} key={className}>
          <Component />
        </div>
      ))}
      <div className="debug">
        <div>
          <div>Width: {window.innerWidth}</div>
          <div>Height: {window.innerHeight}</div>
        </div>
      </div>
      <div className="blank" />
    </div>
  );
};
