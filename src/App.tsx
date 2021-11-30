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
];

function App() {
    const { layout, onLayoutChange } = useGridLayout();
    if (!layout) return <Loading message='Loading Layout' />;
    return (
        <GridLayout
            layout={layout}
            onLayoutChange={onLayoutChange}
            cols={12}
            rowHeight={150}
            width={1024}
            isResizable={!!process.env.REACT_APP_IS_DEVELOPMENT}>
            {MODULES.map(({ key, component: ModuleComponent }) => (
                <div key={key}>
                    <ModuleComponent />
                </div>
            ))}
        </GridLayout>
    );
}

export default App;
