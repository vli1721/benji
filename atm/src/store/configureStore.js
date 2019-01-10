import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import settingsReducer from '../reducers/settings';

export default () => {
    const store = createStore(
        combineReducers({
            settings: settingsReducer
        }),
        applyMiddleware(thunk)
    );

    return store;
};