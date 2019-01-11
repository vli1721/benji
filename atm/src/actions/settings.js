import { database } from '../index';


/* IMAGE STUFF */
export const changeNumFaces = (num_faces) => ({
    type: 'CHANGE_NUM_FACES',
    num_faces
});

export const changeExpression = (expression) => ({
    type: 'CHANGE_EXPRESSION',
    expression
});


/* USER */

export const changeUser = (user) => ({
    type: 'CHANGE_USER',
    user
});


/* BALANCE */

export const getBalance = (balance) => {
    return {
        type: 'GET_BALANCE',
        balance
    }
}

export const startGetBalance = () => {
    return (dispatch, getState) => {
        const user = getState().settings.user;

        console.log(user)

        database.ref(`users/${user}/balance`).once('value', (snapshot) => {

            dispatch(getBalance(snapshot.val()));
        })
    }
}

export const watchBalance = () => {
    return (dispatch, getState) => {
        const user = getState().settings.user;

        console.log(user)

        database.ref(`users/${user}/balance`).on('value', (snapshot) => {

            console.log(snapshot)
            dispatch(getBalance(snapshot.val()));
        })
    }
}

export const changeBalance = (balance) => {
    return {
        type: 'CHANGE_BALANCE',
        balance
    }
}

export const startChangeBalance = (balance) => {
    return (dispatch, getState) => {
        dispatch(changeBalance(balance));
        const user = getState().settings.user;
        database.ref(`users/${user}/balance`).set(balance)
    }
}


/* GOAL */
export const getGoal = (goal) => ({
    type: 'GET_GOAL',
    goal
});

// goal
export const startGetGoal = () => {
    return (dispatch, getState) => {
        const user = getState().settings.user;
        database.ref(`users/${user}/goal`).once('value', (snapshot) => {
            dispatch(getGoal(snapshot.val()));
        })
    }
}

export const getGoalPrice = (goalPrice) => ({
    type: 'GET_GOAL_PRICE',
    goalPrice
});

// goal
export const startGetGoalPrice = () => {
    return (dispatch, getState) => {
        const user = getState().settings.user;
        database.ref(`users/${user}/goal-price`).once('value', (snapshot) => {
            dispatch(getGoalPrice(snapshot.val()));
        })
    }
}


