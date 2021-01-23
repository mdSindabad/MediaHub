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
import PaginationComponent from '../Pagination';

// material-ui styles
const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '0.5rem',
        cursor: 'pointer'
    },
    title: {
        marginTop: '0.5rem',
        fontSize: '1.5rem',
    },
    page: {
        marginBottom: '1.5rem',
    },
    pageNum: {
        marginTop: '0.5rem',
    }
}))

const Home = () => {
    const classes = useStyles();

    // initial state
    const initialState = {
        isLoading: true,
        data: [],
        error: ''
    };

    // local state
    const [state, setState] = useState(initialState);
    const [page, setPage] = useState(1);
    
    // pagination function
    const pageChange = (event, page) => {
        setTimeout(() => {
            setPage(page)
        }, 300);
    };

    // fetching api with useEffect
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

        // api call after 0.5sec
        setTimeout(() => {
            axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${keys}&language=en-US&page=${page}`)
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
    }, [page]);


    return (
        <>
            <Grid container justify='space-between'>
                <Grid item>
                    <Typography variant='subtitle2'component='h3' className={classes.title}>Trending</Typography>  
                </Grid>
                <Grid item>
                    {
                        !state.isLoading && !state.error !== '' ? (
                            <Typography variant='body2' component='h6' className={classes.pageNum}>Page: {page}</Typography>
                        ) : null
                    }
                </Grid>
            </Grid>
            <Grid container justify={state.isLoading || state.error !== '' ? 'center' : 'flex-start'} spacing={1} className={classes.root}>
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
            <Grid container justify='center' className={classes.page}>
                <Grid item>
                    {
                        !state.isLoading && state.error === '' ? (
                            <PaginationComponent page={page} handleChange={pageChange} />
                        ) : null
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default Home
