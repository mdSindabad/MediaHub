import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CardItem from '../CardItem';
import {
    Grid,
    makeStyles,
    CircularProgress,
    Typography,
} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import SelectOptions from '../SelectOptions';

// material-ui styles
const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '0.5rem',
        cursor: 'pointer'
    },
    title: {
        marginTop: '0.5rem',
        fontSize: '1rem',
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.5rem',
        }
    },
}))


const TvShows = () => {
    const classes = useStyles();

    // select options
    const selectItems = [
        {name:'Popular', value:'popular'},
        {name:'Top Rated', value:'top_rated'},
        {name:'Airing Today', value:'airing_today'},
        {name:'On The Air', value:'on_the_air'},
    ];

    // initial tv-shows state
    const initialState = {
        isLoading: true,
        data: [],
        error: ''
    };

    // local state
    const [state, setState] = useState(initialState);
    const [category, setCategory] = useState('popular');

    useEffect(() => {
        const keys = process.env.REACT_APP_API_KEY;
         // clearing current state
            setState(prevState => {
                return {
                    ...prevState,
                    isLoading: true,
                    data: [],
                    error: ''
                }  
            });

        // sending api request after 0.5 second
        setTimeout(() => {
            axios.get(`https://api.themoviedb.org/3/tv/${category}?api_key=${keys}&language=en-US&page=1`)
            .then(response => {
                setState(prevState => {
                    return {
                        ...prevState,
                        isLoading: false,
                        data: response.data.results,
                        error: ''
                    }  
                })
            })
            .catch(error => {
                setState(prevState => {
                    return {
                        ...prevState,
                        isLoading: false,
                        data: [],
                        error: error.message
                    }  
                })
            });
        }, 500)
    }, [category]);

    return (
        <>
            <Grid container justify='space-between'>
                <Grid item>
                    <Typography variant='subtitle2'component='h3' className={classes.title}>Tv Shows/ {selectItems.map(item => item.value === category && item.name)}</Typography>
                </Grid>
                <Grid item>
                    <SelectOptions selectItems={selectItems} category={category} setCategory={setCategory} />
                </Grid>
            </Grid>
            <Grid container justify={state.isLoading ? 'center' : 'flex-start'} spacing={1} className={classes.root}>
                {
                    state.isLoading ?
                    <Grid item>
                        <CircularProgress />
                    </Grid> :
                    state.error ? 
                        <Grid item>
                            <Alert severity="error">{state.error}</Alert>
                        </Grid> :
                        state.data.map(item => {
                            return (
                                <Grid key={item.id} item xs={6} sm={3} md={2}>
                                    <CardItem item={item} />
                                </Grid>
                            )
                        })
                }
            </Grid>
        </>
    )
}

export default TvShows

