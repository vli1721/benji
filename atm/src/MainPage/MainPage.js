import React, { Component } from 'react';
import './MainPage.css';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import Balance from './Balance';
import ChoreList from './ChoreList';
import Goal from './Coin';
import { watchBalance, startGetGoal } from '../actions/settings';
import { startGetChores } from '../actions/chores';

class MainPage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.watchBalance();
    this.props.getChores();
    // this.props.speak(`Welcome, ${this.props.user}.`)
    this.props.getGoal();
  }

  render() {
    return (
      <div className='mainPage'>
        <Balance />
        <div className='main-container'>
          <div className='left-container'>
            <ChoreList />
          </div>
          <div className='right-container'>
            <Goal />
          </div>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.settings.user,
});

const mapDispatchToProps = (dispatch) => ({
  watchBalance: () => dispatch(watchBalance()),
  getChores: () => dispatch(startGetChores()),
  getGoal: () => dispatch(startGetGoal())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
