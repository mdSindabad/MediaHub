import React from 'react';
import {Modal, Backdrop, makeStyles} from '@material-ui/core';

// material-ui styles
const useStyles = makeStyles(theme => ({
    modal: {
        width: '100%',
        margin: '100px auto',
        borderRadius: '5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        width: '100%',
    }
}))

const YoutubeModal = (props) => {
    const classes = useStyles()
    const {open, handleClose} = props;
    return (
        <>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <div>
                    {props.children}
                </div>
            </Modal>
        </>
    )
}

export default YoutubeModal
