import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Intro from './Intro/Intro.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: Intro,
    }
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
