import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, setDoc, doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
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
      let arrayOfUsers: User | any = []
      const userRef = collection(db, 'users')

      const oldObject = await getDocs(userRef)
      oldObject.forEach((i) => arrayOfUsers.push(i.data()))

      arrayOfUsers.forEach((i:any) => {
        let userId: string;
        if(i.userId !== undefined) {
          userId = i.userId.split(' ')[0]
        } else {
          userId = ''
        }
        if(userId === this.id) {
          console.log('we in')
          const oldObject = i.wallet.cards;
          const lengthOfOldObject = (oldObject.length === 0) ? 0 : oldObject.length;
          
          console.log(lengthOfOldObject)

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
        }
      })
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}