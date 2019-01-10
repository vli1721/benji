import React, { Component } from 'react';
import './Intro.css';

import {brian_1, brian_2} from '../Descriptors/Brian.js';
import {vincent_1, vincent_2} from '../Descriptors/Vincent.js';

import * as faceapi from 'face-api.js';
import '@tensorflow/tfjs';

const MODEL_URL = '/models'


class Intro extends Component {

  constructor(props) {
    super(props);

    this.state = {
      numFaces: null,
      face: null,
    }

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

    this.componentDidMount = this.componentDidMount.bind(this);
    this.onPlay = this.onPlay.bind(this);
  }

  async loadModels () {
    await faceapi.loadFaceDetectionModel(MODEL_URL);
    await faceapi.loadTinyFaceDetectorModel(MODEL_URL)
    await faceapi.loadFaceRecognitionModel(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.loadFaceLandmarkTinyModel(MODEL_URL)
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

    // console.log(Object.keys(brian_1))
    // console.log(new Float32Array(Object.values(brian_1)))

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

  async onPlay() {

    const input = this.refs.video;

    if(!input.currentTime || input.paused || input.ended)
        return setTimeout(() => this.onPlay())

    const canvas = this.refs.canvas;

    const detections = await faceapi.detectAllFaces(input)
    .withFaceLandmarks(true)
    .withFaceDescriptors()

    if (detections.length < 1) {
      return setTimeout(() => this.onPlay())
    } 

    console.log(detections)

    const bestMatch = this.faceMatcher.findBestMatch(detections[0].descriptor)

    console.log(bestMatch.toString())

    // faceapi.drawDetection(canvas, detections, { withScore: true })
    // ctx.rect(20, 20, 150, 100);
    // ctx.stroke();
    // ctx.lineWidth = 3;
    // ctx.strokeStyle = 'red';
    // const box = detections[0].box
    // ctx.strokeRect(box.x, box.y, box.width, box.height);

    this.setState({
      numFaces: detections.length,
      face: bestMatch,
    })

    // setTimeout(() => this.onPlay())

  }

  render() {
    return (
      <div className="intro">
        <h1>Benji</h1>

        <div id="container">
          <video id="inputVideo" ref="video" autoPlay={true} muted></video>
          <canvas id="overlay" ref="canvas" />
        </div>
        <h2>
          { this.state.numFaces == null ? "Detecting..." : `${this.state.numFaces} faces detected` }
        </h2>
        <h2>
          { this.state.numFaces != null && `Best match: ${this.state.face}` }
        </h2>
      </div>
    );
  }
}

export default Intro;
