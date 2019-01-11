import React from 'react';
import { connect } from 'react-redux';

import Chore from './Chore';
import './ChoreList.css';

const ChoreList = (props) => {
    const chores = props.chores.map((chore) => {
        return <Chore 
            key={chore.id}
            chore={chore}
        />        
    });

    return (
        <div className='chore-container'>
            <h1 className='chore-title'>Chore List</h1>
            <div className='chore-list'>
                <Chore
                    key={'nah'}
                    chore={
                        {
                            description: 'yes',
                            reward: 2
                        }
                    }
                />
                {chores}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    chores: state.chores
});

export default connect(mapStateToProps, undefined)(ChoreList);