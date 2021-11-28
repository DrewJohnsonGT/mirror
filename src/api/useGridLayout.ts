import { useState, useEffect } from 'react';
import { Layout } from 'react-grid-layout';
import { doc, collection, setDoc, getDocs } from 'firebase/firestore';
import { db } from 'api/firestore';

const GRID_LAYOUT_COLLECTION = 'grid-layouts';

const getLayout = async () => {
    const result: Layout[] = [];
    const querySnapshot = await getDocs(collection(db, GRID_LAYOUT_COLLECTION));
    querySnapshot.forEach((doc) =>
        result.push({ i: doc.id, ...doc.data() } as Layout)
    );
    return result;
};

const onLayoutChange = async (newLayout: Layout[]) => {
    return await Promise.all(
        newLayout.map(({ i, w, h, x, y }) =>
            setDoc(doc(db, GRID_LAYOUT_COLLECTION, i), { w, h, x, y })
        )
    );
};

export const useGridLayout = () => {
    const [layout, setLayout] = useState<Layout[]>();
    useEffect(() => {
        getLayout().then((result) => setLayout(result));
    }, []);
    return {
        layout,
        onLayoutChange,
    };
};
