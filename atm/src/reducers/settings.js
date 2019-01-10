const settingsDefault = {
    user: null
}

const settingsReducer = (state = settingsDefault, action) => {
    switch(action.type) {
        case 'CHANGE_USER':
            return {
                ...state,
                user: action.user
            }
        case 'GET_PAGE':
        case 'CHANGE_PAGE':
            return {
                ...state,
                page: action.page
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