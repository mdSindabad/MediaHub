import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    CardMedia,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      maxWidth: '200px',
      background: '#f1f8e9',
      position: 'relative',
      transition: 'all 0.3s ease',
      '&:hover': {
          transform: 'scale(1.02)'
      },
    },
    media: {
      height: 250,
    },
    badge: {
        position: 'absolute',
        right: 0,
        top: 0,
        background: '#ff4569',
        padding: '0.2rem',
        borderRadius: '10%',
        color: '#fff',
    },
    rating: {
        position: 'absolute',
        background: '#14a37f',
        right: '0.5rem',
        bottom: '0.5rem',
        width: '2rem',
        height: '2rem',
        paddingTop: '0.37rem',
        textAlign: 'center',
        borderRadius: '50%',
        color: '#fff',
    },
    title: {
        fontSize: '1.1rem',
        fontWeight: '500',
    }
  });


const CardItem = ({item}) => {
    const classes = useStyles();
    const releaseDate = item.release_date? item.release_date : item.first_air_date;
    const year = releaseDate ? releaseDate.split('-')[0] : '????';
    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={`${process.env.REACT_APP_IMG_URL}${item.poster_path}`}
                title="Contemplative Reptile"
            />
            <CardContent>
                <Typography gutterBottom noWrap className={classes.title}>
                    {item.title? item.title : item.name}
                </Typography>
                {
                    item.media_type ? 
                    <Typography className={classes.badge} variant="subtitle2" component="p">
                    {item.media_type}
                    </Typography> : null
                }
                <Typography variant="body2" component="p">
                {year}
                </Typography>
                <Typography className={classes.rating} variant="body2" component="p">
                {item.vote_average}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardItem
