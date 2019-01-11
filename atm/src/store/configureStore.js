import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import settingsReducer from '../reducers/settings';
import choresReducer from '../reducers/chores';

export default () => {
    const store = createStore(
        combineReducers({
            settings: settingsReducer,
            chores: choresReducer
        }),
        applyMiddleware(thunk)
    );

    return store;
};