import React from 'react';
import {Switch, Route} from 'react-router-dom'
import {Home, Movies, TvShows, MovieDetails, SearchPage} from './pages';
import {Container} from '@material-ui/core';

const MainBody = () => {
    return (
        <Switch>
            <Route path='/details:id' component={MovieDetails} />
            <Container>
                <Route path='/search' component={SearchPage} />
                <Route path='/movies' component={Movies} />
                <Route path='/tv-shows' component={TvShows} />
                <Route exact path='/' component={Home} />
            </Container>
        </Switch>
    )
}

export default MainBody
