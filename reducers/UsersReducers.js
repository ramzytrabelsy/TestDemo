const initialState = {
    Users_Data: [], User: "" , Publications : []
}


function Users(state = initialState, action) {
    let nextState;

    switch (action.type) {
        case 'PUSH_USERS':
            nextState = {
                ...state,
                Users_Data: action.payload
            };
            console.log('PUSH_USERS')
            return nextState || state
        case 'PUSH_User':
            nextState = {
                ...state,
                User: action.payload
            };
            console.log('PUSH_User')
            console.log(action.payload)
            return nextState || state

        case 'PUSH_Publications':
            nextState = {
                ...state,
                Publications: action.payload
            };
            console.log('PUSH_Publications')
            console.log(action.payload)
            return nextState || state
        case 'DELETE_PUBLICATION':

            console.log('DELETE PUBLICATION')
            const Delete_Index = state.Publications.findIndex(item => item.id === action.payload)
            console.log(Delete_Index)
            if (Delete_Index !== -1 ){

                nextState = {
                    ...state,
                    Publications: state.Publications.filter((item, index) => index !== Delete_Index),

                }
            }

            console.log(state.User)

            return nextState || state

        default:
            return state;
    }
}

export default Users