import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateOrigin } from '../../../redux/slice/originSlice';
import { UPDATE_ORIGIN_SUCCESS } from '../../../shared/constants';

const UpdateOrigin = ({ item, setMess }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(item.name);
  const [formError, setFormError] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const updatedOrigin = {
      name: name
    };

    name.trim() && dispatch(updateOrigin({ updatedOrigin: updatedOrigin, id: item._id }))
      .unwrap()
      .then(() => {
        setMess({ success: UPDATE_ORIGIN_SUCCESS });
        setOpen(false);
      })
      .catch((error) => {
        error.name && setFormError(error.name);
        error.other && setMess({ error: error.other });
      })
  }

  return (
    <div>
      <button className="flex-bw-center btn-df btn-df--edit text-small" onClick={handleClickOpen}>
        <span>Update</span>
        <EditIcon className="text-default" />
      </button>
      <Dialog open={open} onClose={handleClose} className="custom-dialog">
        <DialogTitle>Xuất Xứ</DialogTitle>
        <DialogContent>
          <input type="text" className="input-default w-100" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          <p className="add-origin__error">{formError}</p>
        </DialogContent>
        <DialogActions>
          <button className="flex-bw-center btn-df btn-df--edit text-small" onClick={handleSubmit}>Xác nhận</button>
          <button className="flex-bw-center btn-df btn-df--del text-small" onClick={handleClose}>Quay lại</button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateOrigin;