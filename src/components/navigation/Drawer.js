import React from 'react';
import {withRouter} from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    IconButton,

} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const useStyles = makeStyles({
    drawer: {
        width: '200px',
    },
    button: {
        marginLeft: 'auto',
    }
})

const DrawerComponent = ({open, setOpen, history}) => {
    const classes = useStyles();

    const menuItems = [{name: 'Movies', route: '/movies'}, {name: 'Tv Shows', route: '/tv-shows'},{name:'Trending', route: '/'}]

    const handleClick = (route) => {
        history.push(route);
        setOpen(false)
    }

    return (
        <Drawer open={open} variant='temporary' className={classes.drawer} anchor='left'>
            <IconButton className={classes.button}>
                <ChevronLeftIcon onClick={() => setOpen(false)}/>
            </IconButton>
            <Divider />
            <ListItem button onClick={() => handleClick('/')}>
                <ListItemText primary='MediaHub' />
            </ListItem>
            <Divider />
            <List>
                {menuItems.map((item) => (
                <ListItem button key={item.name} onClick={() => handleClick(item.route)}>
                    <ListItemText primary={item.name} />
                </ListItem>
                ))}
            </List>
            <Divider />
            <ListItem button>
                <ListItemText primary='About' />
            </ListItem>
        </Drawer>
    )
}

export default withRouter(DrawerComponent)
