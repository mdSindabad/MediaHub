import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CardItem from '../CardItem';
import {
    Grid,
    makeStyles,
    CircularProgress
} from '@material-ui/core';
import {Alert} from '@material-ui/lab';


const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '0.5rem',
        cursor: 'pointer'
    },
    card: {
        
    }
}))

const Home = (props) => {
    const classes = useStyles();
    const initialState = {
        isLoading: true,
        data: [],
        error: ''
    };
    const [state, setState] = useState(initialState);

    useEffect(() => {
        const keys = process.env.REACT_APP_API_KEY;
        setTimeout(() => {
            axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${keys}&language=en-US`)
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
    }, []);


    console.log(props)


    return (
        <Grid container  justify='center'spacing={1} className={classes.root}>
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
    )
}

export default Home
