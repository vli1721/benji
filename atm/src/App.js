import React, { Component } from 'react';
import logo from './logo.svg';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import './App.css';
import AppRouter from './routers/AppRouter';
import { config } from './Firebase/firebaseConfig';

class App extends Component {
  constructor(props) {
    super(props);
    this.store = configureStore();
  }

  render() {
    return (
      <Provider className="App" store={this.store}>
        <AppRouter history={this.props.history}/>
      </Provider>
    );
  }
}

export default App;
