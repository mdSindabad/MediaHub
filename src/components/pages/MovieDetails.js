import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
    Grid,
    makeStyles,
    Typography,
    Button,
    CircularProgress,
} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import LiveTvIcon from '@material-ui/icons/LiveTv';

// material-ui styles
const useStyles = makeStyles(theme => ({
    root: {
        background: bg => (`linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7) 30%), url(${bg.url})`),
        backgroundSize: 'cover !important',
        backgroundPosition: 'center top !important',
        width: '100%',
        height: '100%',
        backgroundAttachment: 'fixed !important',
        [theme.breakpoints.up('sm')]: {
            height: '100vh',
        }
    },
    details: {
        color: '#fff',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingBottom: '1rem',
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '5rem',
            paddingRight: '5rem',
            paddingTop: '10rem',
            color: '#fff',
        }
    },
    poster_img: {
        maxHeight: '10rem',
        position: 'relative',
        right: 0,
        marginTop: '5rem',
        borderRadius: '5%',
        [theme.breakpoints.up('sm')]: {
            maxHeight: '15rem',
            borderRadius: '5%',
            marginLeft: '2rem',
        }
    },
    ceiling: {
        marginTop: '5rem',
    },
    button: {
        marginTop: '1rem',
    }
}))

const MovieDetails = (props) => {
    
    // extracting url
    const id = props.match.url.split(':')[1];
    const media_type = props.location.search.split('=')[1];
    
    // initial state
    const initialState = {
        isLoading: true,
        data: [],
        error: ''
    };
    
    // local state
    const [state, setState] = useState(initialState);
    
    // variable
    const bg = {url: `${process.env.REACT_APP_IMG_URL}${state.data.backdrop_path}`};

    // initiate material-ui classes
    const classes = useStyles(bg);

    //send api request
    useEffect(() => {
        const keys = process.env.REACT_APP_API_KEY;

        // senging api request after 0.5sec
        setTimeout(() => {
            axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${keys}&language=en-US`)
            .then(response => {
                console.log(response.data)
                setState(prevState => {
                    return {
                        ...prevState,
                        isLoading: false,
                        data: response.data,
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
    }, []);

    return (
        <>
            <Grid container justify={state.isLoading || state.error !== '' ? 'center' : 'flex-start'} spacing={1}>
                {
                    state.isLoading ?
                    <Grid item className={classes.ceiling}>
                        <CircularProgress color='secondary' />
                    </Grid> :
                    state.error ? 
                    <Grid item className={classes.ceiling}>
                        <Alert severity="error">{state.error}</Alert>
                    </Grid> :
                    <div div className={classes.root}>
                        <Grid container className={classes.details} justify='center'>
                            <Grid item xs={12} sm={4}>
                                <img className={classes.poster_img} src={`${process.env.REACT_APP_IMG_URL}${state.data.poster_path}`} alt='poster-image' />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Typography gutterBottom variant='h3' content='h3'>{state.data.title || state.data.name}</Typography>
                                <Typography gutterBottom variant='body1' content='p'>{state.data.overview}</Typography>
                                <Typography gutterBottom variant='body1' content='p'><b>Release Date:</b> {state.data.release_date}</Typography>
                                <Typography gutterBottom variant='body1' content='p'><b>Rating:</b> {state.data.original_language}</Typography>
                                <Typography gutterBottom variant='body1' content='p'><b>Rating:</b> {state.data.vote_average}</Typography>
                                <Typography gutterBottom variant='body1' content='p'><b>Vote Count:</b> {state.data.vote_count}</Typography>
                                <Button 
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<LiveTvIcon />}
                                >Watch Trailer</Button>
                            </Grid>
                        </Grid>
                    </div>
                }
            </Grid>
        </>
    )
}

export default MovieDetails
