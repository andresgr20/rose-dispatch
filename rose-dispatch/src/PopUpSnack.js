import React, {useContext,useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {taskContext} from './App'
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function PopUpSnack() {
    const {state, dispatch} = useContext(taskContext);

  const handleClose = (event) => {
    dispatch({ type: 'show', payload: false});
  };

  return (
      <Snackbar open={state.show} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          It has been successfully added!
        </Alert>
      </Snackbar>
  );
}
