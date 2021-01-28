import React from 'react';
import {Switch, Route} from 'react-router-dom'
import {Home, Movies, TvShows, MovieDetails, SearchPage} from './pages';
import {Container, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        paddingBottom: '3.5rem',
    }
}))
const MainBody = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Switch>
                <Container>
                    <Route path='/details:id' component={MovieDetails} />
                    <Route path='/search' component={SearchPage} />
                    <Route path='/movies' component={Movies} />
                    <Route path='/tv-shows' component={TvShows} />
                    <Route exact path='/' component={Home} />
                </Container>
            </Switch>
        </div>
    )
}

export default MainBody
