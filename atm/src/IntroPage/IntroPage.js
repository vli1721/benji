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
      numFaces: null,
      username: null,
      expression: null,
      balance: 42.00,
      benjiSpeaking: false,
    }

    this.componentDidMount = this.componentDidMount.bind(this);
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

  render() {

    return (
      <div className="intro">
        <FaceAuth />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(IntroPage);
