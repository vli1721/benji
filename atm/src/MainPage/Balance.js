import React from 'react';
import { connect } from 'react-redux';

import './Balance.css';

const Balance = (props) => {
    return (
        <div className='balance-container'>
            <h3 className='balance-tag'>Your balance:</h3>
	        <h1 className='balance'>
	            ${props.balance}
	        </h1>
        </div>
    )
}

const mapStateToProps = (state) => ({
    balance: state.settings.balance
});

export default connect(mapStateToProps, undefined)(Balance);