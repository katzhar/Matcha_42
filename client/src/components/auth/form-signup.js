import React, {useState} from 'react';
import NavSignHelp from './nav-sign-help'
import Button from '@material-ui/core/Button';
import s from "./auth.module.css";
import TextField from "@material-ui/core/TextField";
import * as axios from 'axios';

const fn = React.createRef();
const ln = React.createRef();
const login = React.createRef();
const mail = React.createRef();
const pass = React.createRef();

const FormSignup = () => {
    let [err,setErr] = useState('');
    let [blockButton,setBlock] = useState(false);

   let sentData = async (e) => {
       setBlock(true);
        e.preventDefault();
        let data = {
            login: login.current.value,
            password: pass.current.value,
            fn : fn.current.value,
            ln : ln.current.value,
            email : mail.current.value
        }

        await axios.post("/signup", data).then(res => {
                setErr(res.data.msg)
            setBlock(false);

        })
    }

        return (
            <div>
                <div className={s.cont_form}>
                    <div className = {s.welcome}>
                        <p>Welcome to the Matcha, little adventurer!</p>
                    </div>
                    <form action='/signup' method='post'>
                        <div className={s.input}>
                            <TextField
                                name='fn'
                                label="first name"
                                type="text"
                                autoComplete="current-fn"
                                inputRef={fn}
                                variant="outlined"
                            /></div>
                        <div className={s.input}>
                            <TextField
                                name='ln'
                                label="last name"
                                type="text"
                                inputRef={ln}
                                autoComplete="current-ln"
                                variant="outlined"
                            /></div>
                        <div className={s.input}>
                            <TextField
                                name='login'
                                label="username"
                                type="text"
                                inputRef={login}
                                autoComplete="current-username"
                                variant="outlined"
                            /></div>
                        <div className={s.input}>
                            <TextField
                                name='email'
                                label="email"
                                type="email"
                                inputRef={mail}
                                autoComplete="current-username"
                                variant="outlined"
                            /></div>
                        <div className={s.input}>
                            <TextField
                                label="password"
                                type="password"
                                name="password"
                                inputRef={pass}
                                autoComplete="current-password"
                                variant="outlined"
                            /></div>
                        <p style={{color: 'red'}}>{err}</p>
                        <Button onClick={sentData}  disabled={blockButton} variant="contained" color="primary" type='submit'>Join</Button>
                    </form>
                </div>
                <NavSignHelp status="signup"/>
            </div>
        )
    }

export default FormSignup;