import React from "react";
import s from "./match-nav.module.css";
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Preloader from "../common/preloader";
import * as axios from 'axios';
import {setCurrentPageFilter, setFilter} from "../../redux/matcha-reducer";
import {connect} from "react-redux";


const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class MatchNav extends React.Component {
    state = {
        preloader: false,
        expanded: false,
        age: [0, 100],
        location: [0, 100],
        fame: [0, 100],
        tags: [0, 5],
        page: 1,
        sort: ''
    };

    handleChangeAge = (sliderValues) => {
        this.setState({age: sliderValues});
    };
    handleChangeGeo = (sliderValues) => {
        this.setState({location: sliderValues});
    };
    handleChangeFame = (sliderValues) => {
        this.setState({fame: sliderValues});
    };
    handleChangeTags = (sliderValues) => {
        this.setState({tags: sliderValues});
    };
    handleChangeSort = (value) => {
        this.setState({sort: value.currentTarget.value});
    };

    onFilter = async () => {
        this.props.setFilter(this.state)
        this.props.setCurrentPageFilter(1);
        this.setState({preloader: true})
        await axios.post("match/filter", this.state)
            .then(response => {
                this.setState({preloader: false})
                this.props.setUsers(response.data)
            });
    };

    handleChange = (panel) => (event, isExpanded) => {
        this.setState({expanded: isExpanded ? panel : false});
    };

    render() {
        return (
            <div>
                {this.state.preloader ? <Preloader/> : null}
                <div className={s.nav}>
                    <div className={s.sort}>
                        <select onChange={this.handleChangeSort}>
                            <option value="" defaultValue>Sort by</option>
                            <option name='age' value="age">Age</option>
                            <option value="tags">Common tags</option>
                            <option value="fame_rating">Fame rating</option>
                            <option value="location">Location</option>
                        </select>
                        <Button value="Sort" type="submit" onClick={this.onFilter}>Sort</Button>
                    </div>
                    <div>
                        <ExpansionPanel style={{color: '#7448be'}} expanded={this.state.expanded === 'panel1'}
                                        onChange={this.handleChange('panel1')}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header">
                                <Typography component="div">FILTER</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails component="div">
                                <Typography style={{width: '100%'}} component="div">
                                    <div className={s.range}>
                                        <p>Age:</p>
                                        <div>
                                            <Range min={0} max={100} onChange={this.handleChangeAge}
                                                   defaultValue={[0, 100]}
                                                   tipFormatter={valueLocation => `${valueLocation}`}/>
                                        </div>
                                        <p>Location (km):</p>
                                        <div>
                                            <Range min={0} max={100} onChange={this.handleChangeGeo}
                                                   defaultValue={[0, 100]}
                                                   tipFormatter={valueLocation => `${valueLocation}`}/>
                                        </div>
                                        <p>Fame Rating:</p>
                                        <div>
                                            <Range min={0} max={100} onChange={this.handleChangeFame}
                                                   defaultValue={[0, 100]}
                                                   tipFormatter={valueLocation => `${valueLocation}`}/>
                                        </div>
                                        <p>Common tags:</p>
                                        <div>
                                            <Range min={0} max={5} onChange={this.handleChangeTags}
                                                   defaultValue={[0, 5]}
                                                   tipFormatter={valueLocation => `${valueLocation}`}/>
                                        </div>
                                        <div className={s.submitfilter}>
                                            <Button onClick={this.onFilter}>filter</Button>
                                        </div>
                                    </div>
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                </div>
            </div>
        )
    }
};

let mapStateToProps = (state) => {
    return {}
}
export default connect(mapStateToProps, {setFilter, setCurrentPageFilter})(MatchNav);