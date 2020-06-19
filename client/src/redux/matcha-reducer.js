const LIKE = 'LIKE';
const DISLIKE = 'DISLIKE';
const BLOCK = 'BLOCK';
const SET_USERS = 'SET_USERS';
const SET_FILTER = 'SET_FILTER';
const SET_CURRENT_PAGE_FILTER = 'SET_CURRENT_PAGE_FILTER';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    filterMatch: {
        preloader: false,
        expanded: false,
        age: [0, 100],
        location: [0, 100],
        fame: [0, 100],
        tags: [0, 5],
        page: 1,
        sort: ''
    },
    users: [],
    isFetching: true,
    pageSize: 5,
    totalUsersCount: 5,
    currentPage: 1,
};

const matchaReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIKE:
            return {
                ...state, filterMatch: {...state.filterMatch},
                users: state.users.map(u => {
                    if (u.info._id === action.userId) {
                        return {...u, info: {...u.info, like: true}}
                    }
                    return u;
                })
            }
        case DISLIKE:
            return {
                ...state, filterMatch: {...state.filterMatch},
                users: state.users.map(u => {
                    if (u.info._id === action.userId) {
                        return {...u, info: {...u.info, like: false}}
                    }
                    return u;
                })
            }
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case SET_CURRENT_PAGE_FILTER:
            return {
                ...state,
                currentPage: action.numberPage,
                filterMatch: {...state.filterMatch, page: action.numberPage}
            }
        case SET_USERS:
            return {
                ...state,
                totalUsersCount: action.users.count,
                filterMatch: {...state.filterMatch},
                users: action.users.users
            }
        case SET_FILTER:
            return {...state, filterMatch: action.filter}
        case BLOCK:
            return {
                ...state, filterMatch: {...state.filterMatch},
                users: state.users.map(u => {
                    if (u.info._id === action.userId) {
                        return {...u, info: {...u.info, block: true}}
                    } else if (u.info.block)
                        return {...u, info: {...u.info, block: false}}
                    else
                        return {...u, info: {...u.info, block: false}}
                })
            }
        default:
            return state;
    }
}
export const setFilter = (filter) => ({type: SET_FILTER, filter});
export const like = (userId) => ({type: LIKE, userId});
export const dislike = (userId) => ({type: DISLIKE, userId});
export const block = (userId) => ({type: BLOCK, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPageFilter = (numberPage) => ({type: SET_CURRENT_PAGE_FILTER, numberPage});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export default matchaReducer;