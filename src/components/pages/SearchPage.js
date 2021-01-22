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


const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '0.5rem',
        cursor: 'pointer'
    },
    title: {
        marginTop: '0.5rem',
        fontSize: '1.5rem',
    }
}))

const SearchPage = (props) => {
    const classes = useStyles();
    const initialState = {
        isLoading: true,
        data: [],
        error: ''
    };
    const [state, setState] = useState(initialState);

    const queryString = props.location.search.split('=')[1];
    useEffect(() => {
        const keys = process.env.REACT_APP_API_KEY;
        setState(prevState => {
            return {
                ...prevState,
                isLoading: true,
                data: [],
                error: ''
            }  
        });
        setTimeout(() => {
            axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${keys}&language=en-US&page=1&include_adult=false&query=${queryString}`)
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
        }, 500);
    }, [queryString]);

    return (
        <>
            <Typography variant='subtitle2'component='h3' className={classes.title}>Search results for: {queryString}</Typography>
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
                                item.poster_path ? 
                                <Grid key={item.id} item xs={6} sm={3} md={2}>
                                    <CardItem item={item} />
                                </Grid> : null
                            )
                        })
                }
            </Grid>
        </>
    )
}

export default SearchPage

