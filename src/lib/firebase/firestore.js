import { getFirestore } from "firebase/firestore";
import { firebase } from "./app";

const firestore = getFirestore(firebase);
export default firestore;
