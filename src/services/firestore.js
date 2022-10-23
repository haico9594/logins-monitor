
import { initializeApp } from "firebase/app";
import { 
    getFirestore,
     query,
     orderBy,
     limit,
     onSnapshot,
     collection,
     getDoc, 
     getDocs, 
     setDoc,
     addDoc,
     doc, 
     serverTimestamp, 
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const createUser = (userId, name) => {
    return setDoc(doc(db, "users", userId), {
        name: name
    });
};

export const getUser = (userId) => {
    const userDocRef = doc(db, "users", userId);
    return getDoc(userDocRef);
};

export const createLogin = (userId) => {
    const usersColRef = collection(db, 'logins')
    return addDoc(usersColRef, {
            created: serverTimestamp(),
            userId: userId,
        });
};

export const getLogins = () => {
    const loginsQuery = query(collection(db, "logins"), orderBy("created", "desc"), limit(100));
    return getDocs(loginsQuery);
};

export const streamLogins = (snapshot,error) => {
    const loginsColRef = collection(db, 'logins');
    const loginsQuery = query(loginsColRef,  orderBy("created", "desc"), limit(100));
    return onSnapshot(loginsQuery, snapshot, error);
};