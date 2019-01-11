const settingsDefault = {
    user: 'bobby',
    balance: 0
}

const settingsReducer = (state = settingsDefault, action) => {
    switch(action.type) {
        case 'CHANGE_USER':
            return {
                ...state,
                user: action.user
            }
        case 'GET_BALANCE':
        case 'CHANGE_BALANCE':
            return {
                ...state,
                balance: action.balance 
            }
        default: 
            return state;
    }
}

export default settingsReducer;