import React, {Component} from "react";
import * as axios from "axios";
import {NavLink} from "react-router-dom";
import st from "./reset-pass.module.css";
import s from "../auth/auth.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const npass = React.createRef();
const cpass = React.createRef();

class ResetPass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            err: "",
            key: window.location.pathname.split("/")[2],
        };
    }

    componentDidMount() {
        axios.post("/reset", this.state)
            .then(res => {
                this.setState({err: res.data.msg})
            })
    }

    sentForm = async (e) => {
        e.preventDefault();
        let data = {
            newpass: npass.current.value,
            confpass: cpass.current.value,
            key: this.state.key
        }

        axios.post("/newpassword", data)
            .then(res => {
                this.setState({err: res.data.msg})
            })
    }

    render() {
        return (
            <div className={st.reset}>
                <p>Create a new password</p>
                <form method='post' action='/newpassword'>
                    <div className={s.input}>
                        <TextField
                            label="new password"
                            type="password"
                            name="newpass"
                            inputRef={npass}
                            autoComplete="current-password"
                            variant="outlined"/></div>
                    <div className={s.input}>
                        <TextField
                            label="confirm new password"
                            type="password"
                            name="confpass"
                            inputRef={cpass}
                            autoComplete="current-password"
                            variant="outlined"
                        /></div>
                    <p style={{color: 'red'}}>{this.state.err}</p>
                    <Button onClick={this.sentForm} type='submit'>Change Password</Button>
                </form>
                <div style={{margin:'auto',padding :' 0 0 15px 0'}}><NavLink to='/auth'> Sign in </NavLink></div>
            </div>)
    }
}

    export default ResetPass;