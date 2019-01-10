import { database } from '../index';

export const changeUser = (user) => ({
    type: 'CHANGE_USER',
    user
});


/* PAGE */

export const getPage = (page) => ({
    type: 'GET_PAGE',
    page
});

export const startGetPage = () => {
    return (dispatch, getState) => {
        const user = getState().settings.user;

        database.ref(`users/${user}/atm_page`).on('value', (snapshot) => {
            dispatch(getPage(snapshot.val()));
        })
    }
}

export const changePage = (page) => {
    type: 'CHANGE_PAGE',
    page
}

export const startChangePage = (page) => {
    return (dispatch, getState) => {
        dispatch(changePage(page));

        const user = getState().settings.user;
        database.ref(`users/${user}/atm_page`).set(page);
    }
}


/* BALANCE */

export const getBalance = (balance) => {
    return {
        type: 'CHANGE_BALANCE',
        balance
    }
}

export const startGetBalance = () => {
    return (dispatch, getState) => {
        const user = getState().settings.user;

        database.ref(`users/${user}/balance`).on('value', (snapshot) => {

            dispatch(getBalance(snapshot.val()));
        })
    }
}