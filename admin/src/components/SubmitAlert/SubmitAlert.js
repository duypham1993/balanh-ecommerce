import { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const SubmitAlert = (props) => {
  const { statusSubmit, mess } = props;
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    (statusSubmit === "fulfilled" || statusSubmit === "rejected") && setOpen(true);
  }, [statusSubmit]);

  return (
    <>
      {statusSubmit === "fulfilled" &&
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
            {mess.success}
          </Alert>
        </Snackbar>
      }
      {statusSubmit === "rejected" &&
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