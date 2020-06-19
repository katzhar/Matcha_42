import React from 'react';
import st from "./account.module.css";
import GoogleMapReact from 'google-map-react';
import Button from "@material-ui/core/Button";
import * as axios from 'axios';
import {addTags, setTags} from "../../redux/account-reducer";
import {connect} from "react-redux";
import {setAuth} from "../../redux/auth-reducer";
import history from "../../history";

const Marker = ({text}) => <div className={st.location}>{text}</div>;
const API_GOOGLE = 'AIzaSyDetGkVBc_Iwg3Wg87PUO5Nu5UioKMmIuY';

const Tags = (props) => {
    return (props.tags.map((tag, i) => {
        return <p key={i} datatype={tag} onClick={props.onDeleteTag}> #{tag}</p>
    }))
}

class AddInfo extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            center: [55.7522, 37.6156],
            zoom: 9,
            draggable: true,
            lat: '',
            lng: '',
            sex: '',
            sexpref: 'bi',
            bio: '',
            age: '',
            err: '',
        };

    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.getLocation();
            this.updState();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    inputAge = React.createRef();
    inputBio = React.createRef();

    updState = () => {
        axios.get('/account/addinfo')
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        bio: response.data.bio, sex: response.data.sex, sexpref: response.data.sexpref,
                        age: response.data.age
                    })
                    this.props.setTags(response.data.tags)
                }
            })
    }

    getLocation = () => {
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(this.showPosition, this.showPositionOff);
        else
            alert("Geolocation is not supported by this browser.");
    }

    showPositionOff = () => {
        axios.get(`http://ip-api.com/json/`)
            .then(data => {
                if (this._isMounted) {
                    this.setState({
                        center: [parseFloat(data.data.lat), parseFloat(data.data.lon)],
                        lat: parseFloat(data.data.lat),
                        lng: parseFloat(data.data.lon)
                    })
                }
            })
    }

    showPosition = (position) => {
        this.setState({
            center: [position.coords.latitude, position.coords.longitude],
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
    }

    onCircleInteraction(childKey, childProps, mouse) {
        this.setState({
            draggable: false,
            lat: mouse.lat,
            lng: mouse.lng
        });
    }

    onCircleInteraction3(childKey, childProps, mouse) {
        this.setState({draggable: true});
    }

    _onChange = ({center, zoom}) => {
        this.setState({
            center: center,
            zoom: zoom,
        });
    }

    addTag = (val) => {
        let value = val.currentTarget.value;
        let index = this.props.tags.indexOf(value);
        if (index === -1)
            this.props.addTags(value);
    }

    onDeleteTag = (e) => {
        let tag = e.currentTarget.getAttribute('datatype');
        let array = this.props.tags.filter(el => el !== tag);
        this.props.setTags(array);
    }

    sentData = () => {
        let data = {
            sex: this.state.sex,
            sexpref: this.state.sexpref,
            age: this.inputAge.current.value,
            bio: this.inputBio.current.value,
            tags: this.props.tags,
            lat: this.state.lat,
            lng: this.state.lng
        }

        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Origin": "*"
        }

        switch (true) {
            case (data.sex === ''):
                this.setState({err: 'Full field sex'});
                break;
            case (data.age === '' || isNaN(Number(data.age))):
                this.setState({err: 'full field age'});
                break;
            case (Number(data.age) < 18 && data.age !== ''):
                this.setState({err: 'You must be over 18 years old'});
                break;
            case (Number(data.age) > 100 && data.age !== ''):
                this.setState({err: 'Are you over 100 years old? Seriously?'});
                break;
            case (data.bio === ''):
                this.setState({err: 'Full field bio'});
                break;
            case (data.tags.length === 0 || (data.tags.length === 1 && data.tags[0] === '')):
                this.setState({err: 'Select tags'});
                break;
            default:
                this.setState({err: ''});
                let redirectMatch = false;
                fetch("/account/addinfo", {
                    method: "post",
                    headers: headers,
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then(res => {
                        if (this._isMounted) {
                            this.setState({err: 'data changed successfully'});
                            redirectMatch = (res.match === true && this.props.auth.match === false);
                            if (redirectMatch) {
                                this.props.setAuth({
                                    _id: this.props.auth._id,
                                    login: this.props.auth.login,
                                    match: true
                                })
                                history.push('/match')
                            }
                        }
                    })
        }
    };

    setAge = () => {
        this.setState({age: this.inputAge.current.value});
    }

    render() {
        return (
            <div className={st.accountRight}>
                <p className={st.nameform}>Sex:</p>
                <div className={st.radio}>
                    <input type='radio' checked={(this.state.sex === 'male' || false)} required name='sex' value='male'
                           onChange={() => {
                               this.setState({sex: 'male'})
                           }}/> <span>Male</span>
                    <input type='radio' required name='sex' checked={(this.state.sex === 'female' || false)}
                           value='female'
                           onChange={() => {
                               this.setState({sex: 'female'})
                           }}/> <span>Female</span>
                </div>
                <p className={st.nameform}>Sex Preference:</p>
                <div className={st.radio}>
                    <input type='radio' checked={(this.state.sexpref === 'male' || false)} required name='sexpref'
                           value='male'
                           onChange={() => {
                               this.setState({sexpref: 'male'})
                           }}/> <span>Male</span>
                    <input type='radio' checked={(this.state.sexpref === 'female' || false)} required name='sexpref'
                           onChange={() => {
                               this.setState({sexpref: 'female'})
                           }} value='female'/><span>Female</span>
                    <input type='radio' checked={(this.state.sexpref === 'bi' || false)} name='sexpref'
                           onChange={() => {
                               this.setState({sexpref: 'bi'})
                           }} value='bi'/> <span>Bisexuality</span>
                </div>
                <p className={st.nameform}>Age: <input className={st.age} value={(this.state.age || '')} name='age'
                                                       onChange={this.setAge}
                                                       ref={this.inputAge} required
                                                       min={18} max={99}/></p>
                <p className={st.nameform}>BIO: </p>
                <textarea value={this.state.bio} onChange={(e) => {
                    this.setState({bio: e.currentTarget.value})
                }} maxLength="200" ref={this.inputBio} required placeholder={this.state.bio} rows='5' name='bio'/>
                <div className={st.tags}>
                    <p className={st.nameform}>Select tags:</p>
                    <button className={st.tagsbutton} onClick={this.addTag} value="vegan">#vegan</button>
                    <button className={st.tagsbutton} onClick={this.addTag} value="sport">#sport</button>
                    <button className={st.tagsbutton} onClick={this.addTag} value="cinema">#cinema</button>
                    <button className={st.tagsbutton} onClick={this.addTag} value="music">#music</button>
                    <button className={st.tagsbutton} onClick={this.addTag} value="games">#games</button>
                </div>
                <p className={st.nameform}>Your tags:</p>
                <div className={st.tag}>
                    <Tags tags={this.props.tags} onDeleteTag={this.onDeleteTag}/>
                </div>
                <p className={st.nameform}>Location:</p>
                <div className='map'
                     style={{height: '300px', width: '100%', minWidth: '220px', maxWidth: '420px', margin: '15px 0'}}>
                    <GoogleMapReact draggable={this.state.draggable}
                                    bootstrapURLKeys={{key: API_GOOGLE}}
                                    onChange={this._onChange.bind(this)}
                                    center={this.state.center}
                                    zoom={this.state.zoom}
                                    onChildMouseDown={this.onCircleInteraction.bind(this)}
                                    onChildMouseUp={this.onCircleInteraction3.bind(this)}
                                    onChildMouseMove={this.onCircleInteraction.bind(this)}>
                        <Marker lat={this.state.lat} lng={this.state.lng} text=' '/>
                    </GoogleMapReact>
                </div>
                <span style={{color: 'red'}}>{this.state.err}</span>
                <Button className={st.formBtn} variant="contained" color="primary"
                        onClick={this.sentData}>Submit</Button>
            </div>)
    }
}

let mapStateToProps = (state) => {
    return {
        auth: state.auth,
        tags: state.account.tags
    }
}

export default connect(mapStateToProps, {addTags, setTags, setAuth})(AddInfo);