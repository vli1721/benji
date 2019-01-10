import React, { Component } from 'react';
import './IntroPage.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { startGetBalance } from '../actions/settings';

import {brian_1, brian_2} from '../Descriptors/Brian.js';
import {vincent_1, vincent_2} from '../Descriptors/Vincent.js';

import * as faceapi from 'face-api.js';
import '@tensorflow/tfjs';

const MODEL_URL = '/models'


class IntroPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      numFaces: null,
      face: null,
      expression: null,
      threshold: 0.4,
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.onPlay = this.onPlay.bind(this);
  }

  async loadModels () {
    await faceapi.loadFaceDetectionModel(MODEL_URL);
    await faceapi.loadTinyFaceDetectorModel(MODEL_URL)
    await faceapi.loadFaceRecognitionModel(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);
    await faceapi.loadFaceExpressionModel(MODEL_URL);
  }

  async componentDidMount() {
    await this.loadModels();

    const brianDescriptors = [brian_1, brian_2]
    const vincentDescriptors = [vincent_1, vincent_2]


    const labeledDescriptors = [
      new faceapi.LabeledFaceDescriptors(
        'brian',
        brianDescriptors.map(x => new Float32Array(Object.values(x)))
      ),
      new faceapi.LabeledFaceDescriptors(
        'vincent',
        vincentDescriptors.map(x => new Float32Array(Object.values(x)))
      ),
    ]

    this.faceMatcher = new faceapi.FaceMatcher(labeledDescriptors)

    console.log(faceapi.nets)
    
    // try to access users webcam and stream the images
    // to the video element
    navigator.mediaDevices.getUserMedia({video: true})
    .then((stream) => {
      this.refs.video.srcObject = stream;
    })
    .catch(function(err) {
      /* handle the error */
      console.log(err);
    });
    this.speak('Welcome to Benji! Smile to activate.')
    this.onPlay();
  }

  speak = (message) => {
    var msg = new SpeechSynthesisUtterance(message)
    var voices = window.speechSynthesis.getVoices()
    msg.voice = voices[50]
    window.speechSynthesis.speak(msg)
  }

  bestExpression = (expressions) => {
    let maxProb = -1;
    let maxExpression = null;
    expressions.forEach((el) => {
      if (el.probability > maxProb) {
        maxProb = el.probability;
        maxExpression = el.expression;
      }
    });
    return maxExpression;
  }

  async onPlay() {

    const input = this.refs.video;

    if(!input.currentTime || input.paused || input.ended)
        return setTimeout(() => this.onPlay())

    // if (this.state.expression == "happy") {
      const detections = await faceapi.detectAllFaces(input)
      .withFaceExpressions()
      .withFaceLandmarks(true)
      .withFaceDescriptors()

      if (detections.length < 1) {
        return setTimeout(() => this.onPlay())
      } 

      console.log(detections)

      const bestMatch = this.faceMatcher.findBestMatch(detections[0].descriptor)

      console.log(bestMatch.toString())
      const face = bestMatch.distance > this.state.threshold || bestMatch.label == "unknown" ? "unknown" : bestMatch.label


      this.setState({
        numFaces: detections.length,
        face: face,
        expression: this.bestExpression(detections[0].expressions),
      })
    // } else {
    //   const detections = await faceapi.detectAllFaces(input)
    //   .withFaceExpressions()

    //   if (detections.length < 1) {
    //     return setTimeout(() => this.onPlay())
    //   }

    //   console.log(detections)

    //   this.setState({
    //     numFaces: detections.length,
    //     expression: this.bestExpression(detections[0].expressions),
    //   })
    // }
    setTimeout(() => this.onPlay())
  }

  render() {
    return (
      <div className="intro">
        <h1>Benji</h1>
          <video id="inputVideo" ref="video" autoPlay={true} muted></video>
        <h2>
          { this.state.numFaces == null ? "Setting up..." : `${this.state.numFaces} faces detected` }
        </h2>
        <h2>
          { this.state.face != null && `Indentified as: ${this.state.face}` }
        </h2>
        <h2>
          { this.state.expression != null && `Expression: ${this.state.expression}` }
        </h2>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getBalance: () => dispatch(startGetBalance()),
});

export default connect(undefined, mapDispatchToProps)(IntroPage);
