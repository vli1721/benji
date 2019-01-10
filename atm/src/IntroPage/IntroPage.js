import React, { Component } from 'react';
import './IntroPage.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getBalance: () => dispatch(startGetBalance()),
});

export default connect(undefined, mapDispatchToProps)(IntroPage);
