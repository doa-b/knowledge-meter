import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";

import {AuthUserContext} from '../../components/Session';
import {withFirebase} from "../../components/Firebase";

import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Snackbar from '@material-ui/core/Snackbar';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import IconButton from '@material-ui/core/IconButton';
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from "@material-ui/core/Dialog";
import {updateObject} from "../../shared/utility";

import {fetchSkillTree} from "../../bootstrap/defaultItems";
import Group from "./Group/Group";
import Spinner from "../../components/ui/Spinner/Spinner";
import LegendDialog from "../../components/ui/LegendDialog/LegendDialog";

const styles = () => ({
    root: {
        flexGrow: 1,
        textAlign: 'center'
    },
    container:
        {
            width: '100%'
        }
});

const loopThroughObjects = (object) => {
    const myArray = [];
    for (let key in object) {
        // skip loop if the property is from prototype
        if (!object.hasOwnProperty(key)) continue;
        let obj = object[key];
        myArray.push({[key]: obj})
    }
    return myArray;
};

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
/**
 * Created by Doa on 27-1-2020.
 */
const Knowledge = withStyles(styles)(
    ({classes, firebase, match, showControls, showZeroXP}) => {
        const preLoaddedSkillSet = fetchSkillTree();
        const knowledgeId = match.params.id || '0001';
        const name = knowledgeId.split('-');
        const [skillSet, setSkillSet] = useState(preLoaddedSkillSet);
        const [loading, setLoading] = useState(true);
        const [showInfo, setShowInfo] = useState(true);
        const [showDialog, setShowDialog] = useState(false);

        useEffect(() => {
            if (loading) {
                firebase.knowledge(knowledgeId).once("value")
                    .then(snapshot => {
                        if (snapshot.val()) {
                            setSkillSet(prevState => updateObject(prevState, snapshot.val()));
                            console.log('fetched data');
                            (console.log(snapshot.val()));
                        }
                        setLoading(false);
                    });
            }
        });

        return (
            <>
                {loading ? (<Spinner/>) : (
                    <AuthUserContext.Consumer>
                        {authUser => {
                            return (
                                <div className={classes.root}>
                                        <Typography variant='h2'>{knowledgeId !=='0001' ? 'Knowledge of ' + name[0] + ' ' + name[1] : ''}
                                            <IconButton onClick={()=> setShowDialog(true)}>
                                                <InfoIcon/>
                                            </IconButton>
                                        </Typography>  
                                    <Grid className={classes.container} container alignItems='center' justify='space-around' alignContent='center'>
                                        {loopThroughObjects(skillSet).map((group, index) =>
                                            <Group key={index}
                                                   skillGroup={group}
                                                   groupName={Object.keys(group)[0]}
                                                   user={authUser}
                                                   knowlegdeId={knowledgeId}
                                                   showZeroXP={showZeroXP}
                                                   showControls={showControls}
                                            />)}
                                    </Grid>
                                    <Snackbar
                                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                        open={showInfo && !showZeroXP}
                                        autoHideDuration={6000}
                                        onClose={()=>setShowInfo(false)}>
                                        <Alert onClose={()=>setShowInfo(false)} severity="info">
                                            Skills with 0 experience are hidden
                                        </Alert>
                                    </Snackbar>
                                </div>)
                        }}
                    </AuthUserContext.Consumer>
                )}
                <Dialog open={showDialog} onClose={()=> setShowDialog(false)}>
                   <LegendDialog/>

                </Dialog>
            </>);
    });

const mapStateToProps = (state) => {
    return {
        showControls: state.preferences.showControls,
        showZeroXP: state.preferences.showZeroXP
    }
};

export default compose(
    withFirebase,
    connect(mapStateToProps)
)(Knowledge);