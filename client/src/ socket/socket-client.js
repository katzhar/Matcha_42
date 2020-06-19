import io from 'socket.io-client';


export default function () {
    const socket = io('ws://localhost:3027', {transports: ['websocket']});

    function registerHandler(onMessageReceived) {
        socket.on('chat message', onMessageReceived)
    }

    function unregisterHandler() {
        socket.off('chat message')
    }

    function registerNotification(onNotifReceived) {
        socket.on('notif', onNotifReceived)
    }

    function unregisterNotification() {
        socket.off('notif')
    }

    function message(mess) {
        socket.emit('chat message', mess)
    }

    function notif(data) {
        socket.emit('notif', data)
    }

    return {
        notif,
        message,
        registerHandler,
        unregisterHandler,
        registerNotification,
        unregisterNotification
    }
}