import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import {DialogTitle} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import Rating from '@material-ui/lab/Rating';

const styles = theme => ({
    root: {},
    level: {
        marginLeft: 10
    },
    skill: {
        display: 'flex',
        maxWidth: 300,
        justifyContent: 'space-between',
    },
});

const caption = ['No experience', 'Basic Knowledge', 'Experienced', 'Very Experienced', 'Expert'];
/**
 * Created by Doa on 21-3-2020.
 */
const LegendDialog = withStyles(styles)(
    ({classes}) => {
        return (
            <>
                <DialogTitle>Legend</DialogTitle>
                <DialogContent dividers>
                    {caption.map((skill, index) => (

                        <div className={classes.skill}>
                            <b>{skill}</b>
                            <Rating key={index} className={classes.level}
                                    name={skill}
                                    max={4}
                                    value={index}
                            />
                        </div>
                    ))}
                </DialogContent>
            </>);
    });

export default LegendDialog;