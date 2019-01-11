import React from 'react';
import Button from '@material-ui/core/Button';

import './Chore.css';

const Chore = (props) => {
    return (
        <div>
            <span>{props.chore.description}</span>
            <Button>Complete</Button>
        </div>
    )
}

export default Chore;