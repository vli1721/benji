import React, { Component } from 'react';
import './MainPage.css';
import { connect } from 'react-redux';

import Balance from './Balance';
import { startGetBalance, startGetPage } from '../actions/settings';

class MainPage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPage();
    this.props.getBalance();
  }

  render() {
    return (
      <div className="mainPage">
        <h1>Main page</h1>
        <Balance />
        <button></button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  page: state.settings.page
});

const mapDispatchToProps = (dispatch) => ({
  getPage: () => dispatch(startGetPage()),
  getBalance: (page) => dispatch(startGetBalance())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
