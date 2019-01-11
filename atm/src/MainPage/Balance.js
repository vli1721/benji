import React from 'react';
import { connect } from 'react-redux';

import styles from './Balance.module.css';

const Balance = (props) => {
    return (
    	<div>
	        <h1 id="balance">
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