import GridLayout from 'react-grid-layout';
import { Module } from 'types';
import { Compliments, DateTime, ToDo, Weather } from 'components/modules';
import { useGridLayout } from 'api/useGridLayout';
import { Loading } from 'components';

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
            width={1024}>
            {MODULES.map(({ key, component: ModuleComponent }) => (
                <div key={key}>
                    <ModuleComponent />
                </div>
            ))}
        </GridLayout>
    );
}

export default App;
