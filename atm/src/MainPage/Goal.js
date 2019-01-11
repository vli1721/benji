import React from 'react';
import { connect } from 'react-redux';

import Coin from './Coin';
import './Goal.css'

const Goal = (props) => {

    return (
        <div>
            <h1>{props.goal}</h1>
            <Coin />
        </div>
    )
}

const mapStateToProps = (state) => {
    goal: state.settings.goal
}

export default connect(mapStateToProps, undefined)(Goal);