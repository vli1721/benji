const choresReducerDefaultState = []

const choresReducer = (state = choresReducerDefaultState, action) => {
    switch(action.type) {
        case 'GET_CHORES':
            return action.chores
        default:
            return state
    }
}

export default choresReducer;