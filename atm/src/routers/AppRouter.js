import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import IntroPage from '../IntroPage/IntroPage';
import MainPage from '../MainPage/MainPage';
import { startGetPage, startGetBalance } from '../actions/settings';

class AppRouter extends Component {

    componentDidMount() {
        this.props.getPage();
        this.props.getBalance();
    }

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

const mapDispatchToProps = (dispatch) => ({
    getPage: () => dispatch(startGetPage()),
    getBalance: () => dispatch(startGetBalance())
});

export default connect(undefined, mapDispatchToProps)(AppRouter);