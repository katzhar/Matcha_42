import React from 'react';
import NavSignHelp from './nav-sign-help';
import Button from '@material-ui/core/Button';
import s from "./auth.module.css"
import TextField from "@material-ui/core/TextField";
import history from "../../history";
import {setAuth} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import * as axios from 'axios';


class FormSignin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {err: ''}
    }
     inputPass = React.createRef();
    inputLog = React.createRef();

    sentData = async (e) => {

        e.preventDefault();
        let data = {
            login: this.inputLog.current.value,
            password: this.inputPass.current.value
        }
        await axios.post("/auth", data).then(res => {
            if (!res.data.msg) {
                this.props.setAuth(res.data);
                if (res.data.match)
                    history.push('/match');
                else {
                    history.push('/account');
                }
            } else
                this.setState({err: res.data.msg})
        })
    }

    render() {
        return (
            <div>
                <div className={s.cont_form}>
                    <div className={s.welcome}>
                        <p>Welcome to the Matcha, little adventurer!</p>
                    </div>
                    <form action='/auth' method='post'>
                        <div className={s.input}>
                            <TextField
                                id="outlined-required"
                                name='login'
                                label="username"
                                type="text"
                                autoComplete="current-username"
                                variant="outlined"
                                inputRef={this.inputLog}
                            /></div>
                        <div className={s.input}>
                            <TextField
                                id="outlined-password-input"
                                label="password"
                                type="password"
                                name="password"
                                autoComplete="current-password"
                                variant="outlined"
                                inputRef={this.inputPass}
                            /></div>
                        <p style={{color: 'red'}}>{this.state.err}</p>
                        <Button variant="contained" onClick={this.sentData.bind(this)} color="primary" type='submit'>Log
                            In</Button>
                    </form>
                </div>
                <NavSignHelp status={'signin'}/>
                <NavSignHelp status={'forgot'}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps, {setAuth})(FormSignin);