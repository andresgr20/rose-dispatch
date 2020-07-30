import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {taskContext} from './App'
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function PopUpSnack() {
    const {state, dispatch} = useContext(taskContext);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event) => {
    setOpen(false);
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
