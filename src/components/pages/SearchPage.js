import React, {useEffect} from 'react';
import CardItem from '../CardItem';
import {
    Grid,
    makeStyles,
    CircularProgress,
    Typography,
} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import PaginationComponent from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_search_data } from '../store/actions';

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

    // extracting search parameters
    const queryString = props.location.search.split('=')[1];
    
    // redux state
    const dispatch = useDispatch();
    const {isLoading, data, error} = useSelector(states => states.search);

    // pagination function
    const pageChange = (event, page) => {
        dispatch(fetch_search_data(page, queryString));
    };

    // fetching api with useEffect
    useEffect(() => {
        if(isLoading) {
            dispatch(fetch_search_data(1, queryString));
        }
    }, []);

    return (
        <>
            <Grid container justify='space-between'>
                <Grid item>
                <Typography variant='subtitle2'component='h3' className={classes.title}>Search results for: {queryString}</Typography>  
                </Grid>
                <Grid item>
                    {
                        (!isLoading && error === '') || data ? (
                            <Typography variant='body2' component='h6' className={classes.pageNum }>Page: {data.page}</Typography>
                        ) : null
                    }
                </Grid>
            </Grid>
            <Grid container justify={isLoading || error !== '' ? 'center' : 'flex-start'} spacing={1} className={classes.root}>
                {
                    isLoading ?
                    <Grid item>
                        <CircularProgress />
                    </Grid> :
                    error ? 
                        <Grid item>
                            <Alert severity="error">{error}</Alert>
                        </Grid> :
                        data.items.map(item => {
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
                        !isLoading && error === '' ? (
                            <PaginationComponent page={data.page} handleChange={pageChange} />
                        ) : null
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default SearchPage

