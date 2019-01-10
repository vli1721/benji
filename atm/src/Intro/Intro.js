import React, { Component } from 'react';
import './Intro.css';

import * as faceapi from 'face-api.js';
import '@tensorflow/tfjs';


class Intro extends Component {

  constructor(props) {
    super(props);


    this.mtcnnForwardParams = {
      // number of scaled versions of the input image passed through the CNN
      // of the first stage, lower numbers will result in lower inference time,
      // but will also be less accurate
      maxNumScales: 10,
      // scale factor used to calculate the scale steps of the image
      // pyramid used in stage 1
      scaleFactor: 0.709,
      // the score threshold values used to filter the bounding
      // boxes of stage 1, 2 and 3
      scoreThresholds: [0.6, 0.7, 0.7],
      // mininum face size to expect, the higher the faster processing will be,
      // but smaller faces won't be detected
      minFaceSize: 200
    }
  }

  componentDidMount = () => {
    faceapi.loadMtcnnModel('/')
    faceapi.loadFaceRecognitionModel('/')
    
    // try to access users webcam and stream the images
    // to the video element
    navigator.getUserMedia(
      { video: {} },
      stream => this.refs.video.srcObject = stream,
      err => console.error(err)
    )
  }

  onPlay = () => {
    console.log('playing')
  }

  render() {
    return (
      <div className="intro">
        <h1>Benji</h1>

        <div style={{position: 'relative'}} className="margin">
          <video onPlay={() => this.onPlay()} id="inputVideo" ref="video" autoplay muted></video>
          <canvas id="overlay" />
        </div>
      </div>
    );
  }
}

export default Intro;
