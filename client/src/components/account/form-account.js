import React from 'react';
import st from "./account.module.css";
import Button from "@material-ui/core/Button";
import * as axios from 'axios';
import s from "../auth/auth.module.css";
import TextField from "@material-ui/core/TextField";


class FormAccount extends React.Component {
    _isMounted = false;
    state = {
        phdata: {},
        data: {},
        err: ''
    };

    componentDidMount() {
        this._isMounted = true;
        axios.get('/account/edit')
            .then(response => {
                if (this._isMounted)
                    this.setState({data: response.data, phdata: response.data})
            })
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    sentForm = async (e) => {
        e.preventDefault();
        await axios.post("/account/edit", this.state.data).then(res => {
                this.setState({err: res.data.msg})
            }
        )
    }

    render() {
        return (
            <div className={st.account}>
                <div className={st.accountRight}>
                    <form  action='/account/edit' method='post'>
                        <div className={s.input}>
                            <TextField
                                name='fn'
                                label="first name"
                                type="text"
                                autoComplete="current-fn"
                                variant="outlined"
                                onChange={(e) => this.setState({data: {...this.state.data,fn: e.currentTarget.value}})}
                                placeholder={this.state.phdata.fn}
                            /></div>
                        <div className={s.input}>
                            <TextField
                                name='ln'
                                label="last name"
                                type="text"
                                autoComplete="current-ln"
                                variant="outlined"
                                onChange={(e) => this.setState({data: {...this.state.data,ln: e.currentTarget.value}})}
                                placeholder={this.state.phdata.ln}
                            /></div>
                        <div className={s.input}>
                            <TextField
                                name='login'
                                label="login"
                                type="text"
                                autoComplete="current-username"
                                variant="outlined"
                                onChange={(e) => this.setState({data: {...this.state.data,login: e.currentTarget.value}})}
                                placeholder={this.state.phdata.login}
                            /></div>
                        <div className={s.input}>
                            <TextField
                                name='email'
                                label="email"
                                type="email"
                                autoComplete="current-username"
                                variant="outlined"
                                onChange={(e) => this.setState({data: {...this.state.data,email: e.currentTarget.value}})}
                                placeholder={this.state.phdata.email}
                            /></div>
                        <p style={{color: 'red'}}>{this.state.err}</p>
                        <Button onClick={this.sentForm} type='submit'>Submit</Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default FormAccount;