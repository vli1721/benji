import * as firebase from "firebase";
import { config } from '../public/firebaseConfig';

export const initFirebase = () => {
    firebase.initializeApp(config);
    return firebase;
}