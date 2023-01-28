import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBKBa8zcC60oETKACApvwQqo5nrHdbogZs',
  appId: '1:484439819662:web:133709a25adb235e1a90df',
  authDomain: 'mirror-a6113.firebaseapp.com',
  messagingSenderId: '484439819662',
  projectId: 'mirror-a6113',
  storageBucket: 'mirror-a6113.appspot.com',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
