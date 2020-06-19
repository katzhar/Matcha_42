const SET_PROFILE = 'SET_PROFILE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    profile: null,
    isFetching: true
};
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return ({...state, profile: action.profile});
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        default:
            return state;
    }
}
export const setProfile = (profile) => ({type: SET_PROFILE, profile});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export default profileReducer;