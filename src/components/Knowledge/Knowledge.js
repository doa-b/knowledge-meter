import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import withStyles from '@material-ui/core/styles/withStyles'
import {withAuthorization, AuthUserContext} from '../Session/';
import {withFirebase} from "../Firebase";

import {skillTree, fetchSkillTree} from "../../bootstrap/defaultItems";
import Group from "../Group/Group";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import {updateObject} from "../../shared/utility";

const styles = theme => ({
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
    for (var key in object) {
        // skip loop if the property is from prototype
        if (!object.hasOwnProperty(key)) continue;
        var obj = object[key];
        myArray.push({[key]: obj})
    }
    return myArray;
};
/**
 * Created by Doa on 27-1-2020.
 */
const Knowledge = withStyles(styles)(
    ({classes, firebase, match}) => {
        const preLoaddedSkillSet = fetchSkillTree();
        const knowledgeId = match.params.id || '0000';
        const name = knowledgeId.split('-');
        const [skillSet, setSkillSet] = useState(preLoaddedSkillSet);
        const [loaded, setLoading] = useState(false);
        useEffect(() => {
            if (!loaded) {
                setLoading(true);
                firebase.knowledge(knowledgeId).once("value")
                    .then(snapshot => {
                        if (snapshot.val()) {
                            setSkillSet(prevState => updateObject(prevState, snapshot.val()));
                            console.log('fetched data');
                            (console.log(snapshot.val()))
                        }
                    });
            }
        },);

        const resetAll = () => {
            firebase.knowledge(knowledgeId).remove()
            setSkillSet(preLoaddedSkillSet)
        };

        return (
            <>
                <AuthUserContext.Consumer>
                    {authUser => {
                        return (
                            <div className={classes.root}>
                                <Typography variant='h2'>{'Knowledge of ' + name[0] + ' ' + name[1]}</Typography>
                                {/*<button onClick={resetAll}>*/}
                                {/*    Reset All to default*/}
                                {/*</button>*/}
                                <Grid className={classes.container} container alignItems='center' justify='space-around' alignContent='center'>
                                    {loopThroughObjects(skillSet).map((group, index) =>
                                        <Group key={index}
                                               skillGroup={group}
                                               user={authUser}
                                               knowlegdeId={knowledgeId}/>)}                                </Grid>

                            </div>)
                    }}
                </AuthUserContext.Consumer>

            </>);
    });

//  broad-grained authorization condition
const condition = authUser => !!authUser;

export default compose(
    withFirebase
)(Knowledge);