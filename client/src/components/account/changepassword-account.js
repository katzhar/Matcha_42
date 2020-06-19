import React, {useState} from 'react';
import st from "./account.module.css";
import Button from "@material-ui/core/Button";
import s from "../auth/auth.module.css";
import TextField from "@material-ui/core/TextField";
import * as axios from "axios";

const pass = React.createRef();
const new1 = React.createRef();
const new2 = React.createRef();


let ChangePassword = () => {
    let [err, setErr] = useState('');

    let sentForm = async (e) => {
        e.preventDefault();
        let data = {
            newpassword: new1.current.value,
            newpassword2: new2.current.value,
            password: pass.current.value
        }
        await axios.post("/account/changepassword", data).then(res => {
                setErr(res.data.msg);
            }
        )
    }
    return (
        <div className={st.account}>
            <div className={st.accountRight}>
                <form action='/account/changepassword' method='post'>
                    <div className={s.input}>
                        <TextField
                            label="old password"
                            type='password' name='password'
                            autoComplete="current-password"
                            inputRef={pass}
                            variant="outlined"
                        /></div>
                    <div className={s.input}>
                        <TextField
                            label="new password"
                            type='password' name='newpassword'
                            inputRef={new1}
                            autoComplete="current-password"
                            variant="outlined"
                        /></div>
                    <div className={s.input}>
                        <TextField
                            label="confirm new password"
                            type='password' name='newpassword2'
                            inputRef={new2}
                            autoComplete="current-password"
                            variant="outlined"
                        /></div>
                    <p style={{color: 'red'}}>{err}</p>
                    <Button onClick={sentForm} type={'submit'}>Submit</Button>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword;