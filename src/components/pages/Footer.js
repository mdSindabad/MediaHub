import React from 'react';
import {
    Grid,
    makeStyles
} from '@material-ui/core';

// material-ui styles
const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#3f51b5',
        padding: '0.5rem',
        color: '#fff',
        bottom: '0',
        position: 'fixed'
    },
    child: {
        textAlign: 'center',
    }
}))

const Footer = () => {
    const classes = useStyles();
    return (
        <Grid container className={classes.root}>
            <Grid className={classes.child} item xs={12}>
                &#169; Sindabad
            </Grid>
            <Grid className={classes.child} item xs={12}>
                <span>API from: </span>
                <b>TMDB</b>
            </Grid>
        </Grid>
    )
}

export default Footer
