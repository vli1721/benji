import React from 'react';

import './Coin.css';

const Coin = (props) => {
    return (
        <div 
            className='coin'
            style={{
                opacity: props.paid ? 1 : .5
            }}
        >
            <p className='cent'>&#162;</p>
        </div>
    )
}

export default Coin;