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

const SearchPage = (props) => {
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
        setPage(page)
    };

    // extracting search parameters
    const queryString = props.location.search.split('=')[1];

    // send api request
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

        // senging api request after 0.5sec
        setTimeout(() => {
            axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${keys}&language=en-US&page=${page}&include_adult=false&query=${queryString}`)
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
    }, [queryString, page]);

    return (
        <>
            <Grid container justify='space-between'>
                <Grid item>
                <Typography variant='subtitle2'component='h3' className={classes.title}>Search results for: {queryString}</Typography>  
                </Grid>
                <Grid item>
                    {
                        (!state.isLoading && state.error === '') || state.data ? (
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
                                item.poster_path ? 
                                <Grid key={item.id} item xs={6} sm={3} md={2}>
                                    <CardItem item={item} />
                                </Grid> : null
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

export default SearchPage

