import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import './AppRouter.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';

import IntroPage from '../IntroPage/IntroPage';
import MainPage from '../MainPage/MainPage';
import { startGetPage, startGetBalance } from '../actions/settings';

class AppRouter extends Component {

  benjiEmoji = () => {
    let emoji = '🥳';
    switch (this.props.expression) {
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
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              {this.benjiEmoji()} Benji
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper id="brand-container" elevation={1}>
          <h1 id="brand">{this.benjiEmoji()} Benji</h1>
        </Paper>
        <Router history={this.props.history}>
          <div>
            <Route path="/" component={IntroPage} exact={true} />
            <Route path="/main" component={MainPage} />
          </div>
        </Router>
      </div>
    )
  }
} 

const mapStateToProps = (state) => ({
  user: state.settings.user,
  expression: state.settings.expression,
  numFaces: state.settings.num_faces
});

export default connect(mapStateToProps)(AppRouter);
