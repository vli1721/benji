import React, { Component } from 'react';
import './FaceAuth.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import {brian_1, brian_2} from '../Descriptors/Brian.js';
import {vincent_1, vincent_2} from '../Descriptors/Vincent.js';
import * as faceapi from 'face-api.js';
import '@tensorflow/tfjs';
const MODEL_URL = '/models'

class FaceAuth extends Component {

	constructor(props) {
		super(props);

		this.state = {
		  numFaces: null,
		  username: null,
		  expression: null,
		  threshold: 0.4,
		  balance: 42.00,
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
    const options = new faceapi.MtcnnOptions({ minFaceSize: 100})

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
    this.onPlay();
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
      const detections = await faceapi.detectAllFaces(input, new faceapi.TinyFaceDetectorOptions({minFaceSize: 75}))
      .withFaceExpressions()
      .withFaceLandmarks(true)
      .withFaceDescriptors()

      if (detections.length < 1) {
        return setTimeout(() => this.onPlay())
      } 

      console.log(detections)

      const bestMatch = this.faceMatcher.findBestMatch(detections[0].descriptor)

      console.log(bestMatch.toString())
      const face = bestMatch.distance > this.state.threshold || bestMatch.label == "unknown" ? null : bestMatch.label


      this.setState({
        numFaces: detections.length,
        username: face,
        expression: this.bestExpression(detections[0].expressions),
      })
    setTimeout(() => this.onPlay())
  }

  render() {

    return (
      <div className="face-auth">
        <Paper id="brand-container" elevation={1}>
          <video id="inputVideo" ref="video" autoPlay={true} muted></video>
        </Paper>
        <Grid container spacing={24} className="grid">
          <Grid item xs={4}>
            <h2>
              { this.state.numFaces != null && `${this.state.numFaces} faces detected` }
            </h2>
          </Grid>
          <Grid item xs={4}>
            <h2>
              { this.state.numFaces == null ? "Loading..." : `Indentified as: ${this.state.username == "null" ? "unknown" : this.state.username}` }
            </h2>
          </Grid>
          <Grid item xs={4}>
            <h2>
              { this.state.expression != null && `Expression: ${this.state.expression}` }
            </h2>
          </Grid>
        </Grid> 
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(FaceAuth);
