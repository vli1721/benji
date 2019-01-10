import React, { Component } from 'react';
// import './Intro.css';
import * as posenet from '@tensorflow-models/posenet';
import dat from 'dat.gui';
import Stats from 'stats.js';

import {drawBoundingBox, drawKeypoints, drawSkeleton} from './demo_util';

class PoseNet extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="intro">
        <h1>PoseNet page</h1>

        <div id='main' style='display:none'>
          <video id="video" playsinline style=" -moz-transform: scaleX(-1);
          -o-transform: scaleX(-1);
          -webkit-transform: scaleX(-1);
          transform: scaleX(-1);
          display: none;
          ">
          </video>
          <canvas id="output" />
        </div>
      </div>
    );
  }
}

export default PoseNet;
