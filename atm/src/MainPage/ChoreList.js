import React from 'react';
import { connect } from 'react-redux';

import Chore from './Chore';
import styles from './ChoreList.module.css';

const ChoreList = (props) => {
    const chores = props.chores.map((chore) => {
        return <Chore 
            key={chore.id}
            chore={chore}
        />        
    });

    return (
        <div className={styles['chore-container']}>
            <h1 classnName={styles['title']}>Chore List</h1>
            <div className={styles['chore']}>
                {chores}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    chores: state.chores
});

export default connect(mapStateToProps, undefined)(ChoreList);