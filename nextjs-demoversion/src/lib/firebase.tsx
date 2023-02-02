import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: 'AIzaSyCptNCtj0I2RJUFgMmMf1Y5oyfClbFpvyM',
    authDomain: 'fireship-demos-ed053.firebaseapp.com',
    projectId: 'fireship-demos-ed053',
    storageBucket: 'fireship-demos-ed053.appspot.com',
    messagingSenderId: '959743949790',
    appId: '1:959743949790:web:b6ede3d50b0911048c3b4f',
    measurementId: 'G-PCQEZ6KFJX',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const database = firebase.database();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const getUserWithUsername = async (username) => {
    const usersRef = firestore.collection('users');
    const query = usersRef.where('username', '==', username).limit(1);
    const userDoc = (await query.get()).docs[0];
    return userDoc;
};

export const postToJSON = (doc) => {
    const data = doc.data();
    return {
        ...data,
        createdAt: data.createdAt.toMillis(),
        updatedAt: data.updatedAt.toMillis(),
    };
};

export const fromMillis = firebase.firestore.Timestamp.fromMillis;
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
