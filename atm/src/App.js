import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Intro from './Intro/Intro.js';
import firebase from "firebase";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: Intro,
    }
    var config = {
      apiKey: "AIzaSyDa8Xluwh_e0fp-vVjyoZxDqekd7IcAoCk",
      authDomain: "benji-42f8d.firebaseapp.com",
      databaseURL: "https://benji-42f8d.firebaseio.com",
      projectId: "benji-42f8d",
      storageBucket: "benji-42f8d.appspot.com",
      messagingSenderId: "533301633340"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <div className="App">
        <this.state.page />
      </div>
    );
  }
}

export default App;
