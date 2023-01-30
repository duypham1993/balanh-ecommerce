import { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const SubmitAlert = ({ mess }) => {
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    Object.keys(mess).length && setOpen(true);
  }, [mess]);

  return (
    <>
      {mess.success &&
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
            {mess.success}
          </Alert>
        </Snackbar>
      }
      {mess.error &&
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
            {mess.error}
          </Alert>
        </Snackbar>
      }
    </>
  )
}

export default SubmitAlert;