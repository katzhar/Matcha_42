import React from "react";
import s from "./user-chat-nav.module.css"
import * as axios from "axios";
import Preloader from "../common/preloader";


class UserChatNav extends React.Component {
    _isMounted = false;
    state = {
        chatUser: [],
        preload: false
    }

    componentDidMount() {
        this._isMounted = true;
        let url = '?'+ Math.random();
        this.setState({preload: true})
        axios.get(`/chat${url}`)
            .then(response => {
               if (this._isMounted)
                this.setState({preload: false})
                if (this._isMounted)
                this.setState({chatUser: response.data})
            })
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div className={s.wrapper}>
                <>{(this.state.preload) ? <Preloader/> : null}
                    <div className={s.nav}>
                        {this.state.chatUser.map((user, i) => {
                                return (
                                    <div key={i} className={s.userdiv}><img
                                        className={(user.online.online) ? s.imgnav : s.imgnavoff}

                                        src={user.avatar}
                                        alt='userphoto'/>
                                        <a href={`/chat/${user.info._id}/${user.info.login}`}>{user.info.login}</a></div>
                                )
                            }
                        )}
                    </div>
                </>
            </div>)
    }
}

export default UserChatNav;