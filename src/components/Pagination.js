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

const PaginationComponent = ({page, handleChange}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination page={page} color='primary' onChange={handleChange} count={10} shape="rounded" />
    </div>
  );
}

export default PaginationComponent;