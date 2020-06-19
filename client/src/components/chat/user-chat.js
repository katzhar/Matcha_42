import React, {useEffect} from "react";
import st from "./user-chat.module.css"
import Message from "./post-message";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';


let UserChat = (props) => {
    let messagesEnd = React.createRef();
    let newMess = React.createRef();

    let onAddMess = async (e) => {

        e.preventDefault();
        let data = {
            action: 'msg',
            login2: props.chatlogin,
            login: props.auth.login,
            sender: props.auth._id,
            recipient: props.chatid,
            msg: props.newMessText
        }
        props.addMess(props.auth._id);
        props.s_message(data)
    };

    let onAddMessEnter = async (e) => {
        if (e.key === 'Enter') {
          onAddMess(e);
        }
    }

    let onMessChange = () => {
        let text = newMess.current.value;
        props.updateNewMessText(text);
    }
    useEffect(() => {
        messagesEnd.current.scrollIntoView({behavior: "smooth"});
    });

    return (
        <div className={st.chatpost}>
            <NavLink className={st.return} to='/chat'> <ArrowBackOutlinedIcon/> <p>Back</p></NavLink>
            <div className={st.header}><p>{props.chatlogin}</p></div>
            <div className={st.message}>
                <Message login={props.auth._id} message={props.message}/>
                <div style={{float: "left", clear: "both"}}
                     ref={messagesEnd}>
                </div>
            </div>
            <div className={st.sentmessage}>
                <textarea onKeyUp={onAddMessEnter} onChange={onMessChange} ref={newMess} value={props.newMessText}/>
                <Button onClick={onAddMess}>sent message</Button>
            </div>
        </div>
    )
}
export default UserChat;