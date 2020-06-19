const SET_NOTIFICATIONS = 'SET_NOTIFICATION';
const PUSH_NOTIFICATION = 'PUSH_NOTIFICATION';
const SET_VIEWCOUNT = "SET_VIEWCOUNT";

let initialState = {
    notifications: [],
    count: 0,
    viewcount: 0
}
const NotificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.notifications.notifications,
                count: (typeof action.notifications.notifications === "undefined") ? 0 : action.notifications.notifications.length,
                viewcount: action.notifications.viewcount
            }
        case PUSH_NOTIFICATION:
            return {
                ...state,
                notifications: [...state.notifications, {
                    info: {action: action.notification.action},
                    login: {login: action.notification.login, _id: action.notification.sender}
                }],
                count: state.count + 1
            };
        case SET_VIEWCOUNT:
            return {
                ...state, notifications: [...state.notifications],
                viewcount: action.count
            };
        default :
            return (state);
    }
}

export const setNotifications = (notifications) => ({type: SET_NOTIFICATIONS, notifications});
export const setViewCount = (count) => ({type: SET_VIEWCOUNT, count});
export const pushNotificationRecipient = (notification) => ({type: PUSH_NOTIFICATION, notification});

export default NotificationsReducer;