import React, {useState} from "react";
import st from "../reset-pass/reset-pass.module.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import * as axios from "axios";

const mail = React.createRef();

const FormMail = () => {

    let [err, setErr] = useState('');

    let sentForm = (e) => {
        e.preventDefault();
        let data = {
            email: mail.current.value
        }
        axios.post("/resetpassword", data).then(res => {
                setErr(res.data.msg);
            }
        )
    }
    return (
        <div className={st.reset}>
            <p><b>Trouble Logging In?</b></p>
            <p>Enter your email and we'll send you a link to get back into your account.</p>
            <form action='/resetpassword' method='post'>

                <TextField
                    id="outlined-required"
                    name='email'
                    label="email"
                    type="email"
                    inputRef={mail}
                    autoComplete="current-username"
                    variant="outlined"
                />
                <p style={{color: 'red'}}>{err}</p>
                <Button onClick={sentForm} type='submit'>Change Password</Button></form>
        </div>
    );
}

export default FormMail;