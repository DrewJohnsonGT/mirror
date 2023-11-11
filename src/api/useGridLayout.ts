import { useEffect, useState } from 'react';
import { type Layout } from 'react-grid-layout';
import { db } from 'api/firestore';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

const GRID_LAYOUT_COLLECTION = 'grid-layouts';

const getLayout = async () => {
  const result: Layout[] = [];
  const querySnapshot = await getDocs(collection(db, GRID_LAYOUT_COLLECTION));
  querySnapshot.forEach((doc) => {
    const layout: Layout = { i: doc.id, ...doc.data() };
    result.push(layout);
  });
  return result;
};

const onLayoutChange = (newLayout: Layout[]) => {
  if (!process.env.REACT_APP_IS_DEVELOPMENT) return;
  Promise.all(
    newLayout.map(async ({ h, i, w, x, y }) => {
      await setDoc(doc(db, GRID_LAYOUT_COLLECTION, i), { h, w, x, y });
    }),
  )
    .then(() => {})
    .catch((e) => {
      console.error(e);
    });
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
