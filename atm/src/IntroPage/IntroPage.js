import React, { Component } from 'react';
import './IntroPage.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FaceAuth from '../FaceAuth/FaceAuth.js'

import { startGetBalance, startChangePage } from '../actions/settings';

class IntroPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      numFaces: null,
      username: null,
      expression: null,
      balance: 42.00,
      benjiSpeaking: false,
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  updateExpression = (expr) => {
    this.setState({expression: expr})
  }

  updateUsername = (user) => {
    this.setState({username: user})
  }

  updateNumFaces = (num) => {
    this.setState({numFaces: num})
  }


  async componentDidMount() {
    this.speak("Hi, my name's benji! How can I help?");
  }

  goToMain = () => {
    this.props.history.push('/main');
  }

  speak = (message) => {
    var msg = new SpeechSynthesisUtterance(message)
    var voices = window.speechSynthesis.getVoices()
    msg.voice = voices[50]
    window.speechSynthesis.speak(msg)
  }

  benjiEmoji = () => {
    let emoji = '🥳';
    switch (this.state.expression) {
      case "neutral":
        emoji = '🥳';
        break;
      case "happy":
        emoji = '😃';
        break;
      case "sad":
        emoji = '😥';
        break;
      case "angry":
        emoji = '😠';
        break;
      default:
        emoji = '🥳';
    }
    return emoji;
  }

  render() {

    return (
      <div className="intro">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              {this.benjiEmoji()} Benji
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper id="brand-container" elevation={1}>
          <h1 id="brand">{this.benjiEmoji()} Benji</h1>
          <h1 id="balance">${this.state.balance.toFixed(2)}</h1>
          <h4>Your balance</h4>
        </Paper>
        <FaceAuth
          updateExpression={this.updateExpression}
          updateUsername={this.updateUsername}
          updateNumFaces={this.updateNumFaces}
        />
      </div>
    );
  }
}


export default IntroPage;
