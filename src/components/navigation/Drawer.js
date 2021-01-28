import React from 'react';
import {withRouter} from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    IconButton,
    ListItemIcon
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import MovieIcon from '@material-ui/icons/Movie';
import TvIcon from '@material-ui/icons/Tv';

const useStyles = makeStyles({
    drawer: {
        width: '200px',
    },
    button: {
        marginLeft: 'auto',
    },
    active: {
        color: '#009688',
    }
})

const DrawerComponent = ({open, setOpen, history, location}) => {
    const classes = useStyles();

    const menuItems = [
        {name:'Trending', route: '/'},
        {name: 'Movies', route: '/movies'},
        {name: 'Tv Shows', route: '/tv-shows'}
    ];

    const handleClick = (route) => {
        history.push(route);
        setOpen(false)
    }

    const setIcon = (name) => {
        switch (name) {
            case 'Trending':
                return <TrendingUpIcon /> 
            case 'Movies':
                return <MovieIcon />    
            case 'Tv Shows':
                return <TvIcon />        
            default:
                return
        }
    }

    return (
        <Drawer onBackdropClick={() => setOpen(false)} open={open} variant='temporary' className={classes.drawer} anchor='left'>
            <IconButton className={classes.button}>
                <ChevronLeftIcon onClick={() => setOpen(false)}/>
            </IconButton>
            <Divider />
            <ListItem button onClick={() => handleClick('/')}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary='MediaHub' />
            </ListItem>
            <Divider />
            <List>
                {menuItems.map((item) => (
                <ListItem className={location.pathname === item.route && classes.active} button key={item.name} onClick={() => handleClick(item.route)}>
                    <ListItemIcon>{setIcon(item.name)}</ListItemIcon>
                    <ListItemText primary={item.name} />
                </ListItem>
                ))}
            </List>
        </Drawer>
    )
}

export default withRouter(DrawerComponent)
