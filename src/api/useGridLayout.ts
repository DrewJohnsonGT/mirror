import { useEffect, useState } from 'react';
import { type Layout } from 'react-grid-layout';
import { db } from 'api/firestore';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

const GRID_LAYOUT_COLLECTION = 'grid-layouts';

const getLayout = async () => {
  const result: Layout[] = [];
  const querySnapshot = await getDocs(collection(db, GRID_LAYOUT_COLLECTION));
  querySnapshot.forEach((doc) => {
    const layout = { i: doc.id, ...doc.data() } as Layout;
    result.push(layout);
  });
  return result;
};

const onLayoutChange = async (newLayout: Layout[]) => {
  await Promise.all(
    newLayout.map(async ({ h, i, w, x, y }) => {
      await setDoc(doc(db, GRID_LAYOUT_COLLECTION, i), { h, w, x, y });
    }),
  );
};

export const useGridLayout = () => {
  const [layout, setLayout] = useState<Layout[]>();
  useEffect(() => {
    getLayout()
      .then((result) => {
        setLayout(result);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
  return {
    layout,
    onLayoutChange,
  };
};
