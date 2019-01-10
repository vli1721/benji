import * as firebase from "firebase";
import { config } from './firebaseConfig';

export const initFirebase = () => {
    firebase.initializeApp(config);
    return firebase;
}
