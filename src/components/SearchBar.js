import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import {
    InputBase
} from '@material-ui/core';
import {makeStyles, fade} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 'auto',
        width: 'auto',
        [theme.breakpoints.up('sm')]: {
          marginLeft: 'auto',
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100px',
        '&:focus': {
          width: '120px',
        },
        [theme.breakpoints.up('sm')]: {
          width: '300px',
          '&:focus': {
            width: '400px',
          }
        }
      }
}));

const SearchBar = ({history}) => {
    const [searchParams, setSearchParams] = useState('');
    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/search/?q=${searchParams}`);
        setSearchParams('')
    };

    return (
        <form className={classes.search} onSubmit={handleSubmit}>
                    <div className={classes.searchIcon}>
                    <SearchIcon />
                    </div>
                    <InputBase
                    onChange={(e) => setSearchParams(e.currentTarget.value)}
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    value={searchParams}
                    />
                </form>
    )
}

export default withRouter(SearchBar);
