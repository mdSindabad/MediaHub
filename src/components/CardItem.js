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
    //   background: 'primary',
      position: 'relative',
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
        borderRadius: '5%',
    }
  });


const CardItem = ({item}) => {
    const classes = useStyles();
    const releaseDate = item.release_date? item.release_date : item.first_air_date;
    const year = releaseDate.split('-')[0];
    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={`${process.env.REACT_APP_IMG_URL}${item.poster_path}`}
                title="Contemplative Reptile"
            />
            <CardContent>
                <Typography gutterBottom noWrap variant="h6" component="h6">
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
            </CardContent>
        </Card>
    )
}

export default CardItem
