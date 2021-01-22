import React from 'react';
import {Switch, Route} from 'react-router-dom'
import {Home, Movies, TvShows, MovieDetails} from './pages';

const MainBody = () => {
    return (
        <Switch>
            <Route path='/movies:id' component={MovieDetails} />
            <Route path='/movies' component={Movies} />
            <Route path='/tv-shows' component={TvShows} />
            <Route path='/' component={Home} />
        </Switch>
    )
}

export default MainBody
