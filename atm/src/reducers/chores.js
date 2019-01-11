const choresReducerDefaultState = []

const choresReducer = (state = choresReducerDefaultState, action) => {
    switch(action.type) {
        case 'GET_CHORES':
            return action.chores
        // case 'VERIFY_CHORE':
        //     const chores = state.map((chore) => {
        //         if(chore.id === action.id) {
        //             chore.verify = true;
        //         }
        //     });
        //     return chores;
        default:
            return state
    }
}

export default choresReducer;