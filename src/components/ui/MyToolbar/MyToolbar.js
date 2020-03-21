import React from 'react';
import {AuthUserContext} from '../../Session'

import { withStyles} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    toolBar: {
        alignItems: 'center'
    },
    corner: {
        marginLeft: 'auto'
    },
    toolbarMargin: theme.mixins.toolbar,
    aboveDrawer: {
        zIndex: theme.zIndex.drawer + 1
    },
    logo: {
        height: 35,
        marginTop: 5,
        marginRight: 10
    },
    message: {
        color: 'inherit'
    }
});

const MyToolbar = withStyles(styles)(
    ({classes, title, onMenuClick}) => (
        <>
            <AppBar className={classes.aboveDrawer}>
                <Toolbar className={classes.toolBar}>
                    <IconButton
                        className={classes.menuButton}
                        color='inherit'
                        aria-label='Menu'
                        onClick={onMenuClick}
                    >
                        <MenuIcon/>
                    </IconButton>

                    {/*Sign up to showcase your own knowledge!*/}
                    {(title === 'Home') ? (
                        <AuthUserContext.Consumer>
                            {authUser => !authUser
                                ? (
                                    <Typography variant='h5' color='inherit'>
                                        Sign up to showcase your own knowledge!
                                    </Typography>
                                )
                                : (
                                    <Typography variant='h5' color='inherit'>
                                        {title}
                                    </Typography>)}

                        </AuthUserContext.Consumer>
                    ) : null}
                    <div className={classes.corner}>
                    </div>
                    <AuthUserContext.Consumer>
                        {authUser => authUser ? (
                            <Avatar

                                alt='logged in user'
                                src={authUser.imageUrl}/>
                        ) : null}

                    </AuthUserContext.Consumer>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbarMargin}/>
        </>
    )
);

export default MyToolbar;