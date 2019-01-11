import React from 'react';
import { connect } from 'react-redux';

import Chore from './Chore';

const ChoreList = (props) => {
    const chores = props.chores.map((chore) => {
        return <Chore 
            key={chore.id}
            chore={chore}
        />        
    });

    return (
        <div>
            <h3>Chore List</h3>
            <div>
                {chores}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    chores: state.chores
});

export default connect(mapStateToProps, undefined)(ChoreList);