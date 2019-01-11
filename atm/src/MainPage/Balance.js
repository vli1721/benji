import React from 'react';
import { connect } from 'react-redux';

import styles from './Balance.module.css';

const Balance = () => {
    return (
        <div className={styles['balance']}>
            <span>{this.props.balance}</span>
        </div>
    )
}

const mapStateToProps = (state) => ({
    balance: state.settings.balance
});

export default connect(mapStateToProps, undefined)(Balance);