import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { deleteCategory } from '../../redux/slice/categorySlice';
import { delImgFireBase } from '../../services/uploadFirebase';

export default function CustomDialog({ item, selectedCategories }) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (category) => {
    dispatch(deleteCategory(category._id));
    await delImgFireBase(category.img);
    open && handleClose();
  };

  const handleMultiDelete = (categories) => {
    categories.map(item => handleDelete(item));
  }

  return (
    <div>
      <button className="flex-bw-center btn-default btn-default--del text-small" onClick={() => handleClickOpen()}>
        <span>Delete</span>
        <DeleteOutline className="text-default" />
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          {"Xoá Danh Mục?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Xoá danh mục này đồng thời sẽ xoá các danh mục con. Vui lòng xác nhận!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Quay lại</Button>
          <Button onClick={() => selectedCategories.length > 0 ? handleMultiDelete(selectedCategories) : handleDelete(item.row)} autoFocus>
            Xoá
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
