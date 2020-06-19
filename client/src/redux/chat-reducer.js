const UPDATE_NEW_MESS_TEXT = 'UPDATE-NEW-MESS-TEXT';
const ADD_MESS = 'ADD-MESS';
const SET_USERS_CHAT = 'SET_USERS_CHAT';
const SET_MESSAGE_CHAT = 'SET_MESSAGE_CHAT';
const PUSH_MESSAGE_RECIPIENT = 'PUSH_MESSAGE_RECIPIENT';

let initialState = {
    users: [],
    message: [],
    newMessText: ''
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESS :
            return {
                ...state,
                message: [...state.message, {sender: action.sender, msg: state.newMessText}],
                newMessText: ''
            };
        case UPDATE_NEW_MESS_TEXT:
            return {
                ...state,
                newMessText: action.text
            };
        case SET_USERS_CHAT:
            return {...state, users: action.users}
        case SET_MESSAGE_CHAT:
            return {...state, message: action.message}
        case PUSH_MESSAGE_RECIPIENT:
            return {
                ...state,
                message: [...state.message, {sender: action.message.sender, msg: action.message.msg}]
            };
        default :
            return (state);
    }
}

export const addMess = (sender) => ({type: ADD_MESS, sender});
export const setUsersChat = (users) => ({type: SET_USERS_CHAT, users});
export const setMessageChat = (message) => ({type: SET_MESSAGE_CHAT, message});
export const updateNewMessText = (text) => ({type: UPDATE_NEW_MESS_TEXT, text: text});
export const pushMessageRecipient = (message) => ({type: PUSH_MESSAGE_RECIPIENT, message});

export default chatReducer;