import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, setDoc, doc, updateDoc, arrayRemove, arrayUnion, query, where } from 'firebase/firestore';
import { User } from "./types";


const firebaseConfig = {
  apiKey: process.env["REACT_APP_FIREBASE_API_KEY"],
  authDomain: process.env["REACT_APP_FIREBASE_AUTH_DOMAIN"],
  projectId: process.env["REACT_APP_FIREBASE_PROJECT_ID"],
  storageBucket: process.env["REACT_APP_FIREBASE_STORAGE_BUCKET"],
  messagingSenderId: process.env["REACT_APP_FIREBASE_MESSAGING_SENDER_ID"],
  appId: process.env["REACT_APP_FIREBASE_APP_ID"],
  measurementId: process.env["REACT_APP_FIREBASE_MEASUREMENT_ID"]
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export default class FirestoreActions {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
  async displayData() {
    const docs = await getDocs(collection(db, "Users")) 
    docs.forEach((i) => console.log(i.data()))
  }
  async addCard() {
    try {
          let userRef = collection(db, "users");
          const oldObjectQuery =  query(userRef, where("userId", "==", `${this.id}`))

          let oldObject: any = await getDocs(oldObjectQuery)
          oldObject.forEach((doc: any) => {
            oldObject = doc.data()
          })
          oldObject = oldObject.wallet.cards
          
          const lengthOfOldObject = (oldObject.length === 0) ? 0 : oldObject.length;

          const newObject = {
            id: lengthOfOldObject + '' + Math.round(Math.random() * 1000000),
            amount: 423,
            date: '3.12.2021',
            category: 'new category'
          }

          setDoc(doc(db, `users/${this.id}`), {
            userId: this.id,
            wallet: {
              cards: arrayUnion(...oldObject, newObject),
              allCategories: [],
              allDates: [],
            }
          })
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}