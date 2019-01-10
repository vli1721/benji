import React, { Component } from 'react';
import './Intro.css';

import * as faceapi from 'face-api.js';
import '@tensorflow/tfjs';

const MODEL_URL = '/models'


class Intro extends Component {

  constructor(props) {
    super(props);

    this.state = {
      numFaces: null,
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

  // async loadModels () {
  //   //await faceapi.loadModels(MODEL_URL)
  //   await faceapi.loadFaceDetectionModel(MODEL_URL)
  //   await faceapi.loadFaceLandmarkModel(MODEL_URL)
  //   await faceapi.loadFaceRecognitionModel(MODEL_URL)
  // }

  // getFullFaceDescription = async (canvas) => {
  //   console.log(canvas);
  //   this.fullFaceDescriptions = await faceapi.allFaces(canvas, minConfidence);
  //   console.log(this.fullFaceDescriptions);
  // }

  // drawDescription = (canvas) => {
  //   this.fullFaceDescriptions.forEach((fd, i) => {
  //     faceapi.drawLandmarks(canvas, fd.landmarks, { drawLines: false })
  //   })
  // }

  // drawHTMLImage(canvas,image,width,height){
  //   const ctx = canvas.getContext("2d");
  //   ctx.drawImage(image,0,0,width,height);
  // }

  // async componentDidMount() {
  //   await this.loadModels();
  //   // const testImageHTML = document.getElementById('test')
  //   // this.drawHTMLImage(this.refs.canvas.current,testImageHTML,296,296);
  //   await this.getFullFaceDescription(this.refs.canvas.current);
  //   this.drawDescription(this.refs.canvas.current);
  // }

  // landmarkWebCamPicture = (picture) => {
  //   const ctx = this.refs.canvas.current.getContext("2d");
  //   var image = new Image();
  //   image.onload = async () => {
  //     ctx.drawImage(image,0,0);
  //     await this.getFullFaceDescription(this.refs.canvas.current);
  //     this.drawDescription(this.refs.canvas.current);
  //   };
  //   image.src = picture;
  // }

  async loadModels () {
    // await faceapi.loadModels(MODEL_URL)
    await faceapi.loadFaceDetectionModel(MODEL_URL);
    await faceapi.loadFaceRecognitionModel(MODEL_URL);
  }

  async componentDidMount() {
    await this.loadModels();

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

  resizeCanvasAndResults(dimensions, canvas, results) {
    const { width, height } = dimensions instanceof HTMLVideoElement
      ? faceapi.getMediaDimensions(dimensions)
      : dimensions
    canvas.width = width
    canvas.height = height

    // resize detections (and landmarks) in case displayed image is smaller than
    // original size
    return faceapi.resizeResults(results, { width, height })
  }

  drawDetections(dimensions, canvas, detections) {
    const resizedDetections = this.resizeCanvasAndResults(dimensions, canvas, detections)
    faceapi.drawDetection(canvas, resizedDetections)
  }

  async onPlay() {

    const input = this.refs.video;

    if(!input.currentTime || input.paused || input.ended)
        return setTimeout(() => this.onPlay())

    const canvas = this.refs.canvas;

    const detections = await faceapi.detectAllFaces(input)

    if (detections.length < 1) {
      return setTimeout(() => this.onPlay())
    }

    // resize the detected boxes in case your displayed image has a different size then the original
    // const detectionsForSize = faceapi.resizeResults(detections, { width: input.width, height: input.height })
    // draw them into a canvas
    canvas.width = input.width
    canvas.height = input.height

    const ctx = canvas.getContext("2d");
    console.log(detections)
    // faceapi.drawDetection(canvas, detections, { withScore: true })

    // ctx.rect(20, 20, 150, 100);
    // ctx.stroke();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
    const box = detections[0].box
    this.setState({
      numFaces: detections.length
    })
    ctx.strokeRect(box.x, box.y, box.width, box.height);
    setTimeout(() => this.onPlay())

  }

  render() {
    return (
      <div className="intro">
        <h1>Benji</h1>

        <div id="container">
          <video id="inputVideo" ref="video" autoPlay={true} muted></video>
          <canvas id="overlay" ref="canvas" />
        </div>
        { this.state.numFaces != null && <h2>{this.state.numFaces} faces detected</h2>}
      </div>
    );
  }
}

export default Intro;
