import React, {useEffect} from 'react';
import CardItem from '../CardItem';
import {
    Grid,
    makeStyles,
    CircularProgress,
    Typography,
} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import SelectOptions from '../SelectOptions';
import PaginationComponent from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_tv_data } from '../store/actions';

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
    page: {
        marginBottom: '1.5rem',
    },
    pageNum: {
        marginTop: '0.5rem',
        textAlign: 'right',
    }
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

     // redux state
     const dispatch = useDispatch();
     const {isLoading, data, error} = useSelector(states => states.tv);
 
     // local state
     const category = data.category || 'popular';
 
     // pagination function
     const pageChange = (event, page) => {
         dispatch(fetch_tv_data(page, category));
     };
 
     // category change function
     const categoryChange = (category) => {
         dispatch(fetch_tv_data(1, category));
     };
 
     useEffect(() => {
         if(isLoading) {
             dispatch(fetch_tv_data(1, category));
         }
     }, []);

    return (
        <>
            <Grid container justify='space-between'>
                <Grid item xs={10}>
                    <SelectOptions selectItems={selectItems} category={category} handleChange={categoryChange} />
                </Grid>
                <Grid item xs={2}>
                    {
                        !isLoading && error === '' ? (
                            <Typography variant='body2' component='h6' className={classes.pageNum}>Page: {data.page}</Typography>
                        ) : null
                    }
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='subtitle2'component='h3' className={classes.title}>Tv Shows/ {selectItems.map(item => item.value === category && item.name)}</Typography>
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
                        !isLoading && error === '' ? (
                            <PaginationComponent page={data.page} handleChange={pageChange} />
                        ) : null
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default TvShows

