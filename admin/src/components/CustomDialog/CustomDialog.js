import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import DeleteOutline from "@mui/icons-material/DeleteOutline";

const CustomDialog = ({ item, selectedItems, handleDelete }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteItem = (item) => {
    handleDelete(item);
    open && handleClose();
  }

  const handleMultiDelete = (items) => {
    items.map(item => deleteItem(item));
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
          <Button onClick={() => selectedItems.length > 0 ? handleMultiDelete(selectedItems) : deleteItem(item.row)} autoFocus>
            Xoá
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomDialog;