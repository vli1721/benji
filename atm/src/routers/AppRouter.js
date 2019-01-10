import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';

import IntroPage from '../IntroPage/IntroPage';
import MainPage from '../MainPage/MainPage';
import { startGetPage, startGetBalance } from '../actions/settings';

class AppRouter extends Component {

    render() {
        return (
            <Router history={this.props.history}>
                <div>
                    <Route path="/" component={IntroPage} exact={true} />
                    <Route path="/main" component={MainPage} />
                </div>
            </Router>
        )
    }
} 

export default AppRouter;