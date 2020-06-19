const SET_TAGS = 'SET_TAGS';
const ADD_TAGS = 'ADD_TAGS';
const RESET_ACCOUNT = 'RESET_ACCOUNT';

let initialState = {
    tags: ['']
}
const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TAGS :
            return ({...state, tags: [...state.tags, action.tags]})
        case SET_TAGS :
            return ({...state, tags: action.tags})
        case RESET_ACCOUNT :
            return ({ tags: ['']})
        default :
            return (state);

    }
}
export const setTags = (tags) => ({type: SET_TAGS, tags});
export const addTags = (tags) => ({type: ADD_TAGS, tags});
export const resetAccount = () => ({type: RESET_ACCOUNT});

export default accountReducer;