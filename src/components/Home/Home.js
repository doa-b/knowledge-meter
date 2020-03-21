import React, {useEffect} from 'react';
import {compose} from "redux";
import withStyles from '@material-ui/core/styles/withStyles'
import {withAuthorization, AuthUserContext} from '../Session/';
import { withFirebase } from "../Firebase";

import {skillTree} from "../../bootstrap/defaultItems";
import Group from "../Group/Group";

const styles = theme => ({
    root: {},
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
const Home = withStyles(styles)(
    ({classes, firebase}) => {

        useEffect(()=> {
            // set listener for database
       //    firebase.user(user.uid).child('knowledge').on('value', ((snapshot) => {
         //      console.log(snapshot.val());
       //    }))
        // return remove callback
        });

        return (
            <>
                <AuthUserContext.Consumer>
                    {authUser => {
                        return (<>
                            <h1>Home Page</h1>
                            <p>The Home Page is accessible by every signed in user.</p>
                            {loopThroughObjects(skillTree).map((group, index) =>
                                <Group key={index} skillGroup={group} user={authUser}/>)}
                        </>)
                    }}
                </AuthUserContext.Consumer>

            </>);
    });

//  broad-grained authorization condition
const condition = authUser => !!authUser;

export default compose(
    withAuthorization(condition),
    withFirebase
) (Home);