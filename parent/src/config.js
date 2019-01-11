import Firebase from 'firebase';



var config = {
    apiKey: "AIzaSyDa8Xluwh_e0fp-vVjyoZxDqekd7IcAoCk",
    authDomain: "benji-42f8d.firebaseapp.com",
    databaseURL: "https://benji-42f8d.firebaseio.com",
    projectId: "benji-42f8d",
    storageBucket: "benji-42f8d.appspot.com",
    messagingSenderId: "533301633340"
  };
  
  let app = Firebase.initializeApp(config)
  let db = app.database()
  let choresRef = db.ref('users/bobby/chores')

  export default choresRef