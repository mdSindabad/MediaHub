import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import Drawer from './Drawer';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SearchBar from '../SearchBar';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('lg')]: {
            paddingLeft: '3rem',
            paddingRight: '3rem',
        }
    },
    buttons: {
        marginLeft: 'auto',
    },
    logo: {
        cursor: 'pointer',
        '&:hover': {
            color: '#1de9b6',
        }
    },
}));

const Navbar = (props) => {
    const [open, setOpen] = useState(false);

    const theme = useTheme();
    const classes = useStyles();
    
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const handleClick = (route) => {
        props.history.push(route)
    }

    

    return (
        <AppBar position='sticky' className={classes.root}>
            <Toolbar>
                <Typography variant='h5' component='h5' className={classes.logo} onClick={() => handleClick('/')}>
                    MediaHub
                </Typography>
                <SearchBar />
                {
                    matches ? 
                    // large devices navbar
                    <Box className={classes.buttons}>
                        <Button variant={props.location.pathname === '/' ? 'outlined' : 'text'} onClick={() => handleClick('/')} color='inherit'>Home</Button>
                        <Button variant={props.location.pathname === '/movies' ? 'outlined' : 'text'} onClick={() => handleClick('/movies')} color='inherit'>Movie</Button>
                        <Button variant={props.location.pathname === '/tv-shows' ? 'outlined' : 'text'} onClick={() => handleClick('/tv-shows')} color='inherit'>Tv Shows</Button>
                    </Box> : 
                    // mobile navbar with drawer
                    <Box className={classes.buttons}>
                        <IconButton color='inherit' onClick={() => setOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer open={open} setOpen={setOpen} />
                    </Box>
                }
            </Toolbar>
        </AppBar>
    )
}

export default withRouter(Navbar);