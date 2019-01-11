import React, { Component } from 'react';
import './MainPage.css';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import Balance from './Balance';
import ChoreList from './ChoreList';
import Goal from './Goal';
import { watchBalance, startGetGoal, startGetGoalPrice } from '../actions/settings';
import { watchVerifyChore } from '../actions/chores';
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
    this.props.getPrice();
    this.props.watchVerifyChore();
  }

  render() {
    return (
      <div className='mainPage'>
        <div className='main-container'>
          <div className='left-container'>
            <Balance />
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
  watchVerifyChore: () => dispatch(watchVerifyChore()),
  getChores: () => dispatch(startGetChores()),
  getGoal: () => dispatch(startGetGoal()),
  getPrice: () => dispatch(startGetGoalPrice())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
