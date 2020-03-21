import React, {useState} from 'react';
import clsx from "clsx";

import withStyles from '@material-ui/core/styles/withStyles'
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Paper, Typography, Grid} from "@material-ui/core";

import {updateObject} from "../../../shared/utility";
import {withFirebase} from "../../../components/Firebase";




const styles = () => ({
    root: {},
    paper: {
        maxWidth: 320,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        margin: 10
    },
    skill: {
        display: 'flex',
        maxWidth: 300,
        justifyContent: 'space-between',
    },
    level: {
        marginLeft: 10
    },
    button: {
        Width: 60,
    },
    title: {
        textAlign: 'center',
        borderBottom: '1px solid #115293',
        marginBottom: 5
    },
    buttonContainer: {
        marginTop: 5,
        display: 'flex',
        justifyContent: 'space-between',
        textAlign: 'center',
    },
    container: {
        display: 'inline-block',
        textAlign: 'center'
    },
    hidden: {
        display: 'none'
    }
});
/**
 * Created by Doa on 19-3-2020.
 */
const Group = withStyles(styles)(
    ({
         classes, skillGroup, user, firebase, knowlegdeId = '0000', groupName = '',
         showControls, showZeroXP
     }) => {
        const [skills, setSkills] = useState(skillGroup[groupName]);
        const [isChanged, setIsChanged] = useState(false);
        const [newSkill, setNewSkill] = useState(null);

        const handleSkillChange = (name, value) => {
            // only editable when registered user
            if (user) {
                if (value == null) value = 0;
                setSkills(updateObject(skills, {[name]: value}));
                setIsChanged(true)
            }
        };

        const handleNewSkillLevelChange = (value) => {
            // only editable when registered user
            if (user) {
                if (value == null) value = 0;
                setNewSkill(updateObject(newSkill, {level: value}));
            }
        };

        const handleNewSkillTitleChange = event => {
            if (user) {
                setNewSkill(updateObject(newSkill, {title: event.target.value}));
                setIsChanged(true)
            }
        };

        const saveSkills = () => {
            if (user) {
                let updatedSkills = skills;
                if (newSkill && newSkill.title) {
                    // add new skill to skills
                    setSkills(updateObject(skills, {[newSkill.title]: newSkill.level}));
                    updatedSkills = (updateObject(updatedSkills, {[newSkill.title]: newSkill.level}));
                    setNewSkill(null)
                }
                firebase.knowledge(knowlegdeId).child(groupName).update(updatedSkills)
                    .then( () => setIsChanged(false));
            }
        };

        const addSkill = () => {
            setNewSkill({title: '', level: 0})
        };

        const removeNewSkill = () => {
            setNewSkill(null);
            setIsChanged(false);
        };


        return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <div className={classes.container}>
                    <Paper className={classes.paper} elevation={4}>
                        <div className={classes.title}>
                            <Typography variant='h4'>{groupName}</Typography>
                        </div>
                        {Object.entries(skills).sort().map((skill, index) => {
                            if (skill[1] === 0 && !showZeroXP) return null;
                            return (<div key={index} className={classes.skill}>
                                {skill[0]}
                                <Rating className={classes.level}
                                        name={skill[0]}
                                        max={4}
                                        value={parseInt(skill[1])}
                                        onChange={(event, newValue) => {
                                            handleSkillChange(skill[0], newValue)
                                        }}
                                />
                            </div>)
                        })}
                        {newSkill ? (
                            <form noValidate autoComplete="off" className={classes.skill}>
                                <TextField
                                    size="small"
                                    id="newSkill"
                                    value={newSkill.title}
                                    onChange={handleNewSkillTitleChange}/>
                                <Rating className={classes.level}
                                        name='newSkill'
                                        max={4}
                                        value={newSkill.level}
                                        onChange={(event, newValue) => {
                                            handleNewSkillLevelChange(newValue)
                                        }}
                                />
                            </form>
                        ) : null}
                        <div className={clsx(classes.buttonContainer, {[classes.hidden]: !user}, {[classes.hidden]: !showControls})}>
                            <Button
                                disabled={!isChanged}
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                onClick={saveSkills}
                            >
                                Save
                            </Button>
                            {newSkill
                                ? (<Button
                                    size='small'
                                    className={classes.button}
                                    variant="contained"
                                    color="secondary"
                                    onClick={removeNewSkill}
                                >
                                    CANCEL
                                </Button>)
                                : (<Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    onClick={addSkill}
                                >
                                    ADD
                                </Button>)}

                        </div>
                    </Paper>
                </div>

            </Grid>);
    });

export default withFirebase(Group);