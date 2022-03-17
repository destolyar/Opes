import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, query, where, CollectionReference, DocumentData, addDoc, deleteDoc, doc, updateDoc, setDoc, DocumentReference } from 'firebase/firestore';
import { WalletCardInfo } from "./types";


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

  async getWalletCards() {
    const walletCardsRef = collection(db, "walletCards");
    const cardsRef = query(walletCardsRef, where("userId", "==", `${this.id}`))
    const cardsSnapshot = await getDocs(cardsRef)

    let cards: WalletCardInfo[] = []; 
    cardsSnapshot.forEach((i: DocumentData) => {
      const card: WalletCardInfo = i["data"]()
      cards.push(card)
    })

    return cards;
  }
  async addWalletCard(walletCardInfo: WalletCardInfo) {
    try {
      const walletCardsRef: CollectionReference<DocumentData> = collection(db, "walletCards")
      const data: WalletCardInfo = {
        amount: walletCardInfo.amount,
        category: walletCardInfo.category,
        date: walletCardInfo.date,
        dateAdded: walletCardInfo.dateAdded,
        isIncome: walletCardInfo.isIncome,
        docId: walletCardsRef.id,
        userId: this.id
      }

      const docRef: DocumentReference<DocumentData> = await addDoc(walletCardsRef, data)
      setDoc(doc(walletCardsRef, docRef.id), {
        docId: docRef.id
      }, {merge: true})

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async deleteCard(docId: string) {
    const walletCardsRef: CollectionReference<DocumentData> = collection(db, "walletCards");
    
    deleteDoc(doc(walletCardsRef, docId))
  }
}