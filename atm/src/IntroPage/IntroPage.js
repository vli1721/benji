import React, { Component } from 'react';
import './IntroPage.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import { startGetBalance, startChangePage } from '../actions/settings';

class IntroPage extends Component {
  render() {
    return (
      <div className="intro">
      </div>
    );
  }
}


export default connect()(IntroPage);
