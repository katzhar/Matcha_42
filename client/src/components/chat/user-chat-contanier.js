import {updateNewMessText, addMess, setUsersChat, setMessageChat, pushMessageRecipient} from '../../redux/chat-reducer';
import UserChat from "./user-chat";
import {connect} from "react-redux";
import React from "react";
import * as axios from "axios";
import st from "./user-chat.module.css";
import socket from "../../ socket/socket-client";
import {withRouter} from "react-router-dom";
import history from "../../history";


class UserChatContanier extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            client: socket(),
            chatlogin: '',
            chatid: ''
        }

        this.onMessageReceived = this.onMessageReceived.bind(this)

    }

    componentDidMount() {
        let user_id = this.props.match.params.id;
        let user_login = this.props.match.params.login;
        if (user_id) {
            this.setState({chatlogin: user_login, chatid: user_id})
            axios.get(`/chat/${user_id}`)
                .then(response => {
                    if(!response.data.msg) {
                        this.props.setMessageChat(response.data)
                    }
                    else {
                        history.push('/')
                    }
                })
        }
        this.state.client.registerHandler(this.onMessageReceived)
    }

    componentWillUnmount() {
        this.state.client.unregisterHandler()
    }

    onMessageReceived(entry) {
        if(entry.recipient === this.props.auth._id && entry.sender === this.props.match.params.id)
        this.props.pushMessageRecipient(entry);
    }

    render() {
        return (<div className={st.chat}>
            <UserChat s_message={this.state.client.message} chatid={this.state.chatid}
                      chatlogin={this.state.chatlogin}{...this.props}/>
        </div>)
    }
}

let mapStateToProps = (state) => {
    return {
        newMessText: state.chatPage.newMessText,
        message: state.chatPage.message,
        auth: state.auth
    }
}
let WithUrlContainerComponent = withRouter(UserChatContanier);

export default connect(mapStateToProps, {
    setUsersChat,
    addMess,
    updateNewMessText,
    setMessageChat,
    pushMessageRecipient
})(WithUrlContainerComponent);