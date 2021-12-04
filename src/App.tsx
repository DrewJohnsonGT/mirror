import GridLayout from 'react-grid-layout';
import { Module } from 'types';
import {
    Bitcoin,
    Compliments,
    DateTime,
    Ethereum,
    Forcast,
    ToDo,
    Weather,
    Moon,
} from 'components/modules';
import { useGridLayout } from 'api/useGridLayout';
import { Loading } from 'components';
import 'tailwindcss/tailwind.css';

const MODULES = [
    {
        key: Module.Compliments,
        component: Compliments,
    },
    {
        key: Module.DateTime,
        component: DateTime,
    },
    {
        key: Module.ToDo,
        component: ToDo,
    },
    {
        key: Module.Weather,
        component: Weather,
    },
    { key: Module.Forcast, component: Forcast },
    { key: Module.Bitcoin, component: Bitcoin },
    { key: Module.Ethereum, component: Ethereum },
    { key: Module.Moon, component: Moon },
];

function App() {
    const { layout, onLayoutChange } = useGridLayout();
    if (!layout) return <Loading message='Loading Layout' />;
    return (
        <GridLayout
            layout={layout}
            onLayoutChange={onLayoutChange}
            cols={12}
            rowHeight={25}
            width={1024}
            isResizable={!!process.env.REACT_APP_IS_DEVELOPMENT}
            allowOverlap={true}>
            {MODULES.map(({ key, component: ModuleComponent }) => (
                <div key={key}>
                    <ModuleComponent />
                </div>
            ))}
        </GridLayout>
    );
}

export default App;
