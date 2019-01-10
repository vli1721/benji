import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Intro from './Intro/Intro.js';
import Balance from './Balance/Balance.js';
import firebase from "firebase";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: Intro,
      username: 'brian',
      userInfo: null,
    }
  }

  initFirebase = () => {
    this.config = {
      apiKey: "AIzaSyDa8Xluwh_e0fp-vVjyoZxDqekd7IcAoCk",
      authDomain: "benji-42f8d.firebaseapp.com",
      databaseURL: "https://benji-42f8d.firebaseio.com",
      projectId: "benji-42f8d",
      storageBucket: "benji-42f8d.appspot.com",
      messagingSenderId: "533301633340"
    };
    firebase.initializeApp(this.config);
    this.database = firebase.database();
    this.balanceRef = firebase.database().ref(`users/${this.state.username}/balance`);
    this.balanceRef.on('value', (snapshot) => {
      this.setState({balance: snapshot.val()});
    });
    this.pageRef = firebase.database().ref(`users/${this.state.username}/atm_page`);
    this.pageRef.on('value', (snapshot) => {
      let page = Intro;
      switch (snapshot.val()) {
        case 'intro':
          page = Intro;
          break
        case 'balance':
          page = Balance
          break
        default:
          page = Intro;
      }
      this.setState({page: page});
    });
  }

  componentDidMount = () => {
    this.initFirebase();
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
