import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddInfo from "./add-info";
import FormAccountPhoto from "./form-account-photo";
import FormAccount from "./form-account";
import ChangePassword from "./changepassword-account";
import Popularity from "./popularity";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        margin: 'auto'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

const Account = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            <ExpansionPanel style={{color: '#7448be'}} expanded={expanded === 'panel1'}
                            onChange={handleChange('panel1')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1bh-content"
                                       id="panel1bh-header">
                    <Typography component="div" className={classes.heading}>Additional Information</Typography>
                    <Typography component="div" className={classes.secondaryHeading}>This form is required for
                        match</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails component="div">
                    <Typography style={{width: '100%'}} component="div">
                        <AddInfo/>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel style={{color: '#7448be'}} expanded={expanded === 'panel2'}
                            onChange={handleChange('panel2')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel2bh-content"
                                       id="panel2bh-header">
                    <Typography className={classes.heading}>Profile Photo</Typography>
                    <Typography className={classes.secondaryHeading}>You must upload an avatar for match
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography component="div">
                        <FormAccountPhoto/>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel style={{color: '#7448be'}} expanded={expanded === 'panel3'}
                            onChange={handleChange('panel3')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel3bh-content"
                                       id="panel3bh-header">
                    <Typography className={classes.heading}>Edit Profile</Typography>
                    <Typography className={classes.secondaryHeading}>
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography component="div">
                        <FormAccount/>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel style={{color: '#7448be'}} expanded={expanded === 'panel4'}
                            onChange={handleChange('panel4')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel4bh-content"
                                       id="panel4bh-header">
                    <Typography className={classes.heading}>Change Password</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography component="div">
                        <ChangePassword/>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel style={{color: '#7448be'}} expanded={expanded === 'panel5'}
                            onChange={handleChange('panel5')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel5bh-content"
                                       id="panel2bh-header">
                    <Typography className={classes.heading}>Popularity</Typography>
                    <Typography className={classes.secondaryHeading}>
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography component="div">
                        <Popularity/>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}
export default Account;