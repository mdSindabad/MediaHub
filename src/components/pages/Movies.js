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
import PaginationComponent from '../Pagination';

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
    },
}))

const Movies = () => {
    const classes = useStyles();

    // select options
    const selectItems = [
        {name:'Popular', value:'popular'},
        {name:'Now Playing', value:'now_playing'},
        {name:'Top Rated', value:'top_rated'},
        {name:'Upcoming', value:'upcoming'},
    ];

    // initial movie state
    const initialState = {
        isLoading: true,
        data: [],
        error: ''
    };

    // local state
    const [state, setState] = useState(initialState);
    const [category, setCategory] = useState('popular');
    const [page, setPage] = useState(1);

    // pagination function
    const pageChange = (event, page) => {
        setPage(page)
    };

    // category change function
    const categoryChange = (category) => {
        // setPage(1);
        setCategory(category);
    };

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

        // sending api request after 0.5second
        setTimeout(() => {
            axios.get(`https://api.themoviedb.org/3/movie/${category}?api_key=${keys}&language=en-US&page=${page}`)
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
    }, [category, page]);

    return (
        <>
            <Grid container justify='space-between'>
                <Grid item xs={11}>
                    <SelectOptions selectItems={selectItems} category={category} handleChange={categoryChange} />
                </Grid>
                <Grid item xs={1}>
                    <Typography variant='body2' component='h6' className={classes.pageNum}>Page: {page}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='subtitle2'component='h3' className={classes.title}>Tv Shows/ {selectItems.map(item => item.value === category && item.name)}</Typography>
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
            <Grid container justify='center' className={classes.page}>
                <Grid item>
                    <PaginationComponent page={page} handleChange={pageChange} />
                </Grid>
            </Grid>
        </>
    )
}

export default Movies

