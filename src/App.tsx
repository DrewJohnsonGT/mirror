import GridLayout from 'react-grid-layout';
import { useGridLayout } from 'api/useGridLayout';
import { Loading } from 'components';
import {
  Bitcoin,
  Compliments,
  DateTime,
  Ethereum,
  Forcast,
  Moon,
  ToDo,
  Weather,
} from 'components/modules';
import 'tailwindcss/tailwind.css';
import { Module } from 'types';

const MODULES = [
  {
    component: Compliments,
    key: Module.Compliments,
  },
  {
    component: DateTime,
    key: Module.DateTime,
  },
  {
    component: ToDo,
    key: Module.ToDo,
  },
  {
    component: Weather,
    key: Module.Weather,
  },
  { component: Forcast, key: Module.Forcast },
  { component: Bitcoin, key: Module.Bitcoin },
  { component: Ethereum, key: Module.Ethereum },
  { component: Moon, key: Module.Moon },
];

function App() {
  const { layout, onLayoutChange } = useGridLayout();
  if (!layout) return <Loading message="Loading Layout" />;
  return (
    <GridLayout
      layout={layout}
      onLayoutChange={onLayoutChange}
      cols={12}
      rowHeight={25}
      width={1024}
      isResizable={!!process.env.REACT_APP_IS_DEVELOPMENT}
      allowOverlap={true}
    >
      {MODULES.map(({ component: ModuleComponent, key }) => (
        <div key={key}>
          <ModuleComponent />
        </div>
      ))}
    </GridLayout>
  );
}

export default App;
