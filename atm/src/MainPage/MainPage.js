import React, { Component } from 'react';
import './MainPage.css';

import Balance from './Balance';

class MainPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mainPage">
        <h1>Main page</h1>
        <Balance />
      </div>
    );
  }
}

export default MainPage;
