import React from 'react';
import { connect } from 'react-redux';

import './Balance.css';

const Balance = (props) => {
    return (
    	<div className='balance-container'>
	        <h1 className='balance'>
	            ${props.balance}
	        </h1>
        	<h3>Your balance</h3>
        </div>
    )
}

const mapStateToProps = (state) => ({
    balance: state.settings.balance
});

export default connect(mapStateToProps, undefined)(Balance);