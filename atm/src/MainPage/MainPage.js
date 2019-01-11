import React, { Component } from 'react';
import './MainPage.css';
import { connect } from 'react-redux';

import Balance from './Balance';
import ChoreList from './/ChoreList';
import { watchBalance } from '../actions/settings';
import { startGetChores } from '../actions/chores';

class MainPage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getChores();
    // this.props.speak(`Welcome, ${this.props.user}.`)
  }

  render() {
    return (
      <div className="mainPage">
        <h1>Main page</h1>
        <ChoreList />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.settings.user,
});

const mapDispatchToProps = (dispatch) => ({
  watchBalance: (page) => dispatch(watchBalance(page)),
  getChores: () => dispatch(startGetChores())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
