import * as firebase from "firebase";
import { config } from './firebaseConfig';


class Firebase {
    constructor(){
        firebase.initializeApp(config);
        this.firebase = firebase;
    }

    read(){
        this.firebase.ref()
    }

    write(){

    }

}
