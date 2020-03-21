import React, {useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles'

import {Paper, Typography} from "@material-ui/core";
import {skillTree} from "../../bootstrap/defaultItems";
import {convertObjectstoArray} from "../../shared/utility";
import SkillGroup from "../SkillGroup/SkillGroup";


const styles = theme => ({
    root: {},
});
/**
 * Created by Doa on 27-1-2020.
 */

const loopThroughObjects = (object) => {
    const myArray = [];
    let result = {};
    for (var key in object) {
        // skip loop if the property is from prototype
        if (!object.hasOwnProperty(key)) continue;
        var obj = object[key];
        console.log('object');
        console.log(obj);
        myArray.push({[key]: obj})
        // for (var prop in obj) {
        //     // skip loop if the property is from prototype
        //     if (!obj.hasOwnProperty(prop)) continue;
        //     console.log(prop + " = " + obj[prop]);
        //    result = {[prop]: obj[prop]}
        // }
        // myArray.push({[key]: result})
    }
    return myArray

};

const Landing = withStyles(styles)(
    ({classes}) => {
        // create a function that converts our simple bootstrap into the nested objects we need.

        const [skills, setSkills] = useState(loopThroughObjects(skillTree));
        const groups=(loopThroughObjects(skillTree));
        console.log(groups);
        console.log('these are the values I need');
        groups.map(group => {
            console.log(group);
            for (let groupName in group) {
                for (let skillName in group[groupName] )
                console.log(skillName + '=' + group[groupName][skillName])
            }
        });


        return (
            <Paper>
                {skills.map((group, index) => {
                    //console.log(group)
                    const name = Object.keys(group)[0];
                    const skills = group[name];
                    console.log ('skills');
                    console.log(skills);
                    return (
                        <div key={index}>
                            <Typography>{name}</Typography>
                            {/*<SkillGroup skillSet={skills} groupName={name}/>*/}
                        </div>
                        )
                }
                )}
            </Paper>);
    });

export default Landing;