import { database } from '../index';

// remove chore from the chores
export const completeChore = (id) => ({
    type: 'COMPLETE_CHORE',
    id
});

export const startCompleteChore = (chore) => {
    return (dispatch, getState) => {
        dispatch(completeChore(chore.id));
        const user = getState().settings.user;
        const updatedChore = {
            ...chore,
            complete: true
        }

        database.ref(`users/${user}/chores/${chore.id}`).set(updatedChore)
    }
}

// event for when chore changes from the backend
export const watchChores = (id) => {
    return (dispatch, getState) => {
        const user = getState().settings.user;

        database.ref(`users/${user}/chores/${id}`).on('value', (snapshot) => {

        })
    }
}

export const getChores = (chores) => ({
    type: 'GET_CHORES',
    chores
});

// add getChores and make it result from the on statement

export const startGetChores = () => {
    console.log('triggered')
    return (dispatch, getState) => {
        const user = getState().settings.user;
        console.log(user)

        database.ref(`users/${user}/chores`).once('value').then((snapshot) => {
            const chores = []

            snapshot.forEach((childSnap) => {
                chores.push({
                    id: childSnap.key,
                    ...childSnap.val()
                })
            })

            console.log(chores)

            dispatch(getChores(chores))
        })
    }
}