import React from 'react';
import s from './notification.module.css'
import {connect} from "react-redux";
import axios from 'axios';
import {pushNotificationRecipient, setNotifications, setViewCount} from "../../redux/notification-reducer";

let ActionNotifications = (props) => {
    return (props.notifications.map((elem, i) => {
        switch (elem.info.action) {
            case 'like':
                return (
                    <div key={i} className={s.info}>
                        <a href={`/profile/${elem.login._id}`}>{elem.login.login}</a> <p> like you </p>
                    </div>)
            case 'dislike':
                return (
                    <div key={i} className={s.info}>
                        <a href={`/profile/${elem.login._id}`}>{elem.login.login}</a> <p> dislike you </p>
                    </div>)
            case 'msg':
                return (<div key={i} className={s.info}>
                    <p>You have a message </p><a
                    href={`/chat/${elem.login._id}/${elem.login.login}`}>{elem.login.login}</a>
                </div>)
            case 'visit':
                return (
                    <div key={i} className={s.info}>
                        <p>Your profile looked </p><a href={`/profile/${elem.login._id}`}>{elem.login.login}</a>
                    </div>)
            case 'match':
                return (<div key={i} className={s.info}>
                    <p>You match with </p><a href={`/chat/${elem.login._id}/${elem.login.login}`}>{elem.login.login}</a>
                </div>)
            default:
                return (
                    <div key={i} className={s.info}>
                        <p>{elem.info.action} </p><p style={{color: 'red'}}>{elem.login.login}</p>
                    </div>)
        }
    }))
}

class Notifications extends React.Component {
    componentDidMount() {
            this.props.setViewCount(this.props.notifications.length);
            axios.get(`/notifications?viewcount=${this.props.count}`)

    }

    render() {
        return (<div className={s.modal}>
                <ActionNotifications notifications={this.props.notifications}/>
                <button onClick={this.props.tModal}>close</button>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        notifications: state.notifications.notifications,
        count: state.notifications.count
    }
}


export default connect(mapStateToProps, {setNotifications, pushNotificationRecipient, setViewCount})(Notifications);