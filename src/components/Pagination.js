import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Pagination = () => {
  const classes = useStyles();

  const handleChange = (e) => {
      console.log(e.target.value)
  }

  return (
    <div className={classes.root}>
      <Pagination onChange={handleChange} count={10} variant="outlined" shape="rounded" />
    </div>
  );
}

export default Pagination;