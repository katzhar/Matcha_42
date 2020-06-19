import React from "react";
import st from "./user-chat.module.css"

const Message = (props) => {
    return (props.message.map((e, i) => {
        if (e.sender !== props.login)
            return (<div key={i} className={st.messageuser}><p>{e.msg}</p></div>);
        else
            return (<div key={i} className={st.messageme}><p>{e.msg}</p></div>);
    }))
}

export default Message;