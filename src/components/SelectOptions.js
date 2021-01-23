import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

// material-ui styles
const useStyles = makeStyles(theme => ({
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
      },
    label: {
        textTransform: 'capitalize',
    },
    select : {
        [theme.breakpoints.up('xs')]: {
            height: '2.2rem',
        }
    }
}));



const SelectOptions = ({category, handleChange, selectItems}) => {
    const classes = useStyles();

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
            <Select
            className={classes.select}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={category}
            onChange={(e) => handleChange(e.target.value)}
            label='Category'
            >
            {
                selectItems.map((item, index) => {
                    return(
                        <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
                    )
                })
            }
            </Select>
        </FormControl>
    )
}

export default SelectOptions
