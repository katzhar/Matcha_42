import React from 'react';
import st from "./account.module.css";
import * as axios from "axios";
import Input from '@material-ui/core/Input';
import {connect} from "react-redux";
import {setAuth} from "../../redux/auth-reducer";
import history from "../../history";


let PhotoGallery = (props) => {
    if (props.gallery)
        return (<div className={st.photoGallery}>
            {props.gallery.map((e, i) => {
                return (e) ? <img onClick={props.delPhoto} key={i} alt={i + 1} src={e} className={st.gallery}/> : null
            })}
        </div>)
    else
        return null;
}

class FormAccountPhoto extends React.Component {
    _isMounted = false;
    state = {
        buttonBlock: false,
        avatar: '',
        gallery: null
    }

   componentDidMount() {
       this._isMounted = true;
       axios.get("/account/photo")
           .then(res => {
               if(this._isMounted)
                   this.setState({avatar: res.data.avatar})
               if(this._isMounted)
                   this.setState({gallery: res.data.gallery})
                   if (typeof res.data.gallery !== 'undefined' && res.data.gallery.length === 4) {
                       if(this._isMounted)
                       this.setState({buttonBlock: true})
                   }

           })
   }

    delPhoto = (e) => {
        const conf = window.confirm(`Are you sure?`);
        if (conf) {
            let number = e.currentTarget.alt;
            let array = [];
            for (let i = 0; i < this.state.gallery.length; i++) {
                if (i + 1 !== Number(number))
                    array.push(this.state.gallery[i])
            }
            if(this._isMounted)
            this.setState({gallery: array})
            if(array.length < 4)
                this.setState({buttonBlock: false})
            if(this._isMounted)
            axios.delete(`account/photo/${number}`)
        }
    }

    sentPhoto =  (e) => {
        let redirectMatch = false;
        if (e.target.files.length) {
            let name = e.target.name;
            const formData = new FormData();
            formData.append(e.target.name, e.target.files[0]);
         axios.post("/account/photo", formData)
                .then(response => {
                            if (name === 'avatar') {
                                redirectMatch = (response.data.match === true && this.props.auth.match === false);
                                if (redirectMatch) {
                                    if(this._isMounted) {
                                        this.props.setAuth({
                                            _id: this.props.auth._id,
                                            login: this.props.auth.login,
                                            match: true
                                        })
                                        history.push('/match')
                                    }
                                }
                                if(this._isMounted)
                                this.setState({avatar: response.data.avatar})
                            } else {
                                if(this._isMounted)
                                this.setState({gallery: response.data.gallery})
                            }
                            if (name === 'gallery' && typeof response.data.gallery !== 'undefined' && response.data.gallery.length === 4) {
                                if(this._isMounted)
                                this.setState({buttonBlock: true})
                            }
                    }
                )
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div className={st.accountRight}>
                <div className={st.formAccountPhoto}>
                    <img alt='avatar'
                         src={this.state.avatar || 'https://memepedia.ru/wp-content/uploads/2018/01/94e-%E2%80%94-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F.jpg'}/>
                    <form action="/account/photo" method="post" encType="multipart/form-data">
                        <div className={st.fileUpload}>
                            <label>
                                <Input type="file" onChange={this.sentPhoto.bind(this)} name="avatar"/>
                                <span>Select avatar</span></label>
                        </div>
                        <div className={st.fileUpload}>
                            <label>
                                <Input type="file" disabled={this.state.buttonBlock} onChange={this.sentPhoto.bind(this)} name="gallery"/>
                                <span>Select other pictures</span></label>
                        </div>
                    </form>
                </div>
                <p>Photo Gallery</p>
                <PhotoGallery delPhoto={this.delPhoto} gallery={this.state.gallery}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {setAuth})(FormAccountPhoto);