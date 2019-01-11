const settingsDefault = {
    user: undefined,
    balance: 0,
    expression: undefined,
    num_faces: undefined
}

const settingsReducer = (state = settingsDefault, action) => {
    switch(action.type) {
        case 'CHANGE_NUM_FACES':
            return {
                ...state,
                num_faces: action.num_faces
            }
        case 'CHANGE_EXPRESSION':
            return {
                ...state,
                expression: action.expression
            }
        case 'CHANGE_USER':
            return {
                ...state,
                user: action.user
            }
        case 'GET_BALANCE':
            return {
                ...state,
                balance: action.balance 
            }
        default: 
            return state;
    }
}

export default settingsReducer;