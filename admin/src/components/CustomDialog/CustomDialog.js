import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { useLocation } from 'react-router-dom';

const CustomDialog = ({ item, selectedItems, handleDelete }) => {
  const location = useLocation();
  const pathName = location.pathname.substring(1).toLowerCase();
  const [open, setOpen] = useState(false);

  const arrAlert = [
    {
      key: "products",
      title: "Xoá sản phẩm?",
      content: "Các sản phẩm này sẽ bị xoá. Vui lòng xác nhận!"
    },
    {
      key: "categories",
      title: "Xoá Danh Mục?",
      content: "Xoá danh mục này đồng thời sẽ xoá các danh mục con. Vui lòng xác nhận!"
    },
    {
      key: "origin",
      title: "Xoá Xuất Xứ?",
      content: "Các mục xuất xứ này sẽ bị xoá. Vui lòng xác nhận!"
    },
    {
      key: "suppliers",
      title: "Xoá Nhà Cung Cấp?",
      content: "Các nhà cung cấp này sẽ bị xoá. Vui lòng xác nhận!"
    },
    {
      key: "admins",
      title: "Xoá Tài Khoản Quản Trị Viên?",
      content: "Các tài khoản quản trị viên này sẽ bị xoá. Vui lòng xác nhận!"
    },
    {
      key: "customers",
      title: "Xoá Tài Khoản Khách Hàng?",
      content: "Các tài khoản khách hàng này sẽ bị xoá. Vui lòng xác nhận!"
    },
    {
      key: "addresses",
      title: "Xoá Địa Chỉ Khách Hàng?",
      content: "Các địa chỉ này sẽ bị xoá. Vui lòng xác nhận!"
    }
  ];
  let alert = {};

  arrAlert.forEach(item => {
    if (pathName === item.key) {
      alert = item;
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteItem = async (item) => {
    await handleDelete(item);
    open && handleClose();
  }

  const handleMultiDelete = (items) => {
    items.map(item => deleteItem(item));
  }

  return (
    <div>
      <button className="flex-bw-center btn-df btn-df--del text-small" onClick={() => handleClickOpen()}>
        <span>Delete</span>
        <DeleteOutline className="text-default" />
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          {alert.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {alert.content}
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