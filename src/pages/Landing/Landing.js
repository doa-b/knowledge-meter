import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import {Redirect} from 'react-router-dom'
import {AuthUserContext} from "../../components/Session";
import * as ROUTES from '../../shared/routes';
import Typography from "@material-ui/core/Typography";

const styles = () => ({
    root: {
        textAlign: 'center',
        marginTop: '20'
    },
});
/**
 * Created by Doa on 21-3-2020.
 */
const Landing = withStyles(styles)(
    ({classes}) => {
        return (
            <AuthUserContext.Consumer>
                {authUser => {
                    return (
                        <>
                            {(authUser)
                                ? (
                                    <>
                                        <Redirect
                                            to={ROUTES.KNOWLEDGE + `/${authUser.firstName.toLowerCase()}-${authUser.lastName.toLowerCase()}`}/>
                                    </>
                                )
                                : (
                                    <div className={classes.root}>
                                    <Typography variant='h6'>
                                        Please sign-up to showcase your own knowledge
                                    </Typography>
                                    <Typography>
                                        <a href={ROUTES.KNOWLEDGE + `/0001`}>Or view an example</a>
                                    </Typography>
                                </div>)
                            }
                        </>
                    )
                }}
            </AuthUserContext.Consumer>);
    });

export default Landing;