import React, {Component} from 'react';
import { connect } from 'react-redux';

import './Clock.css';

import Clock from 'react-clock';

class MyClock extends Component {
  state = {
    date: new Date(),
  }

  componentDidMount() {
    setInterval(
      () => this.setState({ date: new Date() }),
      1000
    );
  }

  render() {
    return (
      <div className='balance-container'>
        <p>Current time:</p>
        <Clock
        	className="clock"
          value={this.state.date}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
    balance: state.settings.balance
});

export default connect(mapStateToProps, undefined)(MyClock);