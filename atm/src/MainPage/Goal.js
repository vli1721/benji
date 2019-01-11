import React from 'react';
import { connect } from 'react-redux';

import Coin from './Coin';
import './Goal.css'

const Goal = (props) => {
    const coins = []
    for(let i = 0; i < Math.floor(props.balance); i++) {
        coins.push(<Coin key={i} paid={true}/>);
    }
    for(let i = 0; i < Math.ceil(props.goalPrice - props.balance); i++) {
        coins.push(<Coin key={i} paid={false}/>);
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