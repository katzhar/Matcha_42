import {createStore, combineReducers} from 'redux';
import profileReducer from "./profile-reducer";
import chatReducer from "./chat-reducer"
import matchaReducer from "./matcha-reducer";
import authReducer from "./auth-reducer";
import notificationsReducer from "./notification-reducer";
import accountReducer from "./account-reducer";


let reducers = combineReducers({
    profilePage: profileReducer,
    chatPage: chatReducer,
    matchaPage: matchaReducer,
    auth: authReducer,
    notifications: notificationsReducer,
    account: accountReducer
});
let store = createStore(reducers);
window.store = store;

export default store;