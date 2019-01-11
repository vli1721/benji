import React from 'react';
import { connect } from 'react-redux';

import Coin from './Coin';
import './Goal.css'

const Goal = (props) => {
    let ratio = Math.round((props.balance / props.goalPrice) * 10);
    if(ratio > 10) {
        ratio = 10;
    }
    const coins = []
    for(let i = 0; i < ratio; i++) {
        coins.push(<Coin key = {coins.length} paid={true}/>);
    }
    for(let i = 0; i < 10 - ratio; i++) {
        coins.push(<Coin key = {coins.length} paid={false}/>);
    }

    return (
        <div className='goal-outer'>
            <div className='goal-inner'>
                <h1 className="goal-title">{props.balance >= props.goal && '🎉'}{props.goal}{props.balance >= props.goal && '🎉'}</h1>
                <div className="coin-container">
                    {coins}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    goal: state.settings.goal,
    goalPrice: state.settings.goalPrice,
    balance: state.settings.balance
});

export default connect(mapStateToProps, undefined)(Goal);