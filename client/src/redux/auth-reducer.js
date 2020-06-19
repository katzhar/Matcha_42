const SET_AUTH = 'SENT-STATE';

let initialState = {
    login: '',
    _id: '',
    match: ''
}
const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH :
            return {login: action.auth.login, _id: action.auth._id, match: action.auth.match};
        default :
            return (state);
    }
}

export const setAuth = (auth) => ({type: SET_AUTH, auth: auth});

export default chatReducer;