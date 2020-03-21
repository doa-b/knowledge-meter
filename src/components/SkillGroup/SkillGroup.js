import React, {useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import {Paper, Typography} from "@material-ui/core";
import {AuthUserContext} from "../Session";

const styles = theme => ({
    root: {},
});

const loopThroughObjects = (object) => {
    const myArray = [];
    for (var key in object) {
        // skip loop if the property is from prototype
        if (!object.hasOwnProperty(key)) continue;
        var obj = object[key];
        console.log('object');
        console.log(obj);
        myArray.push(obj)
    }
    return myArray;
};

/**
 * Created by Doa on 18-3-2020.
 */
const SkillGroup = withStyles(styles)(
    ({classes, skillSet, groupName}) => {
        const skillsArray = [];
        for (let skillName in skillSet) {
            skillsArray.push({[skillName]: skillSet[skillName]})
        }
        const [skills, setSkills] = useState(skillSet);

        const saveGroup = () => {
            // save whole state to FireBase
        };


        return (
            <>
                <AuthUserContext.Consumer>
                    {authUser => {
                        return (
                            <>
                                <Typography variant="h4">{authUser.name + ' ' + groupName}</Typography>
                                {skillsArray.map((skill, index) => {
                                        const name = Object.keys(skill)[0];
                                        const level = skill[name];
                                        return (
                                            // should become a separate object, in which we pass setState
                                            // to save changes to value
                                            <div key={index}>
                                                <Typography>{name + ': ' + level}</Typography>
                                                <button onClick={() => setSkills((prevState) => {
                                                    prevState[name] = 12;
                                                    return ({
                                                        ...prevState
                                                    })
                                                })}>
                                                    Increase Skill
                                                </button>
                                                <button onClick={() => setSkills({[name]: 12})}>
                                                    Better change
                                                </button>

                                            </div>
                                        )
                                    }
                                )}

                            </>
                        )
                    }}
                </AuthUserContext.Consumer>

            </>);
    });

export default SkillGroup;