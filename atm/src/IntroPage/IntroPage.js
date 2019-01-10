import React, { Component } from 'react';
import './IntroPage.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { startGetBalance } from '../actions/settings';

class IntroPage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="introPage">
        <h1>Hi I'm Benji</h1>
        <Link to="/main">Begin</Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getBalance: () => dispatch(startGetBalance()),
});

export default connect(undefined, mapDispatchToProps)(IntroPage);
