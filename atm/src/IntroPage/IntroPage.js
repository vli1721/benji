import React, { Component } from 'react';
import './IntroPage.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { startGetBalance, startChangePage } from '../actions/settings';

class IntroPage extends Component {

  constructor(props) {
    super(props);
  }

  goToMain = () => {
    this.props.history.push('/main');
  }

  render() {
    return (
      <div className="introPage">
        <h1>Hi I'm Benji</h1>
        <Button 
          variant="contained" 
          color="primary"
          onClick={this.goToMain}
        >
          Begin
        </Button>
      </div>
    );
  }
}

export default IntroPage;
