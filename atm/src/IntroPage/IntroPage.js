import React, { Component } from 'react';
import './IntroPage.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FaceAuth from '../FaceAuth/FaceAuth.js'

import { startGetBalance, startChangePage } from '../actions/settings';

class IntroPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      balance: 42.00,
    }
  }

  render() {

    return (
      <div className="intro">
        <FaceAuth />
      </div>
    );
  }
}


export default connect()(IntroPage);
