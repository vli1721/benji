import React, { Component } from 'react';
import './MainPage.css';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import jQuery from 'jquery';

import Balance from './Balance';
import ChoreList from './ChoreList';
import Goal from './Goal';
import Clock from './Clock';
import { watchBalance, startGetGoal, startGetGoalPrice } from '../actions/settings';
import { watchVerifyChore, watchChores, startGetChores } from '../actions/chores';

class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      finalTranscript: "",
      recognizing: false,
    }

    this.confirmations = [
      "OK!",
      "Will do.",
      "Alright.",
    ]

    this.congratulations = [
      "Great!",
      "Awesome!",
      "Nice!",
      "Good job",
    ]
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.user != this.props.user && this.props.user != null) {
      this.props.watchBalance();
      // this.props.getChores();
      this.props.getGoal();
      this.props.getPrice();
      this.props.watchChores();
      this.speak('Welcome, ' + this.props.user, () => {
        console.log("STARTING RECOG")
        // this.recognition.start()
      }
        )
    }
  }

  speak = (message, end = () => {}) => {
      const msg = new SpeechSynthesisUtterance(message)

      console.log('recognizing: ' + this.state.recognizing)

      msg.onend = (event) => {
        // this.setState({benjiSpeaking: false})
        console.log('done speaking')
        end();
      }

      const voices = window.speechSynthesis.getVoices()
      msg.voice = voices[50]
      // this.setState({benjiSpeaking: true})
      window.speechSynthesis.speak(msg)
    }

  componentDidMount = () => {
    
    this.speak("Hi, I'm Benji!")

    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    this.recognition = new window.SpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 10;
    // recognition.continuous = true;
    this.recognition.continuous = false;
    this.recognition.onresult = (event) => {
      this.setState({recognizing: true})
      let interimTranscript = '';
      for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
        let transcript = event.results[i][0].transcript;
        console.log(interimTranscript)
        if (event.results[i].isFinal) {
          this.setState({
            finalTranscript: this.state.finalTranscript + transcript
          });
        } else {
          interimTranscript += transcript;
        }
      }

    }

    this.recognition.onend = (event) => {
      // alert(finalTranscript);
      console.log(this.state.finalTranscript)
      this.setState({
        recognizing: false,
      })

      // if (this.state.finalTranscript.split(" ")[0].toLowerCase() != "benji") {

      //   this.setState({
      //     finalTranscript: "",
      //   })
      //   this.recognition.start()

      //   return;
      // }


      console.log("POSTING REQUEST")
        jQuery.ajax({
          type: "POST",
          url: "http://ec2-3-85-164-61.compute-1.amazonaws.com/post_stt",
          data: JSON.stringify({ name: this.props.user, query: this.state.finalTranscript }),
          contentType: "application/json; charset=utf-8",
          dataType: "json"
        })
        .done((res) => {
          // this.props.speak("Done")
          console.log(res)
          // this.speak(res.message, () => {
          //   // this.recognition.start()
          // });
        })
        .fail((res) => {
          // console.log(res)
          // this.speak("Sorry, I don't understand", () => {
          //   // this.recognition.start()
          // })
        })
        .always((data) => {
          this.setState({
            finalTranscript: "",
          })

          this.recognition.start()
          
        });
      
    }
    this.recognition.start()
    
  }

  render() {
    return (
      <div className='mainPage' style={{display: this.props.visible == true ? 'block' : 'none'}}>
        <div className='main-container'>
          <div className='left-container'>
            <Balance />
            <Goal />
          </div>
          <div className='right-container'>
            <ChoreList />
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
  watchChores: () => dispatch(watchChores()),
  getGoal: () => dispatch(startGetGoal()),
  getPrice: () => dispatch(startGetGoalPrice())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
