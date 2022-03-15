import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, setDoc, doc, arrayUnion, query, where, CollectionReference, DocumentData, Query, addDoc } from 'firebase/firestore';
import { WalletCard } from "./types";


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
  async addCard(amount: number, date: string, category: string, isIcome: boolean) {
    try {
      const walletCardsRef: CollectionReference<DocumentData> = collection(db, "walletCards")
      const data: WalletCard = {
        amount: amount,
        category: category,
        date: date,
        isIncome: isIcome,
        userId: this.id
      }

      addDoc(walletCardsRef, data)

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}