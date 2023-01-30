import { useEffect, useState } from "react";
import './update-order.scss';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCurrentOrder, updateOrder } from "../../../redux/slice/orderSlice";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { formatCurrency } from "../../../utils/formatCurrency";
import moment from 'moment';
import CircleIcon from '@mui/icons-material/Circle';
import Loading from "../../../components/Loading/Loading";

const UpdateOrder = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading, currentOrder } = useSelector(state => state.order);
  const { mess, setMess } = useState({});
  const arrStatus = ["Đặt hàng thành công", "Xác nhận đơn hàng", "Đơn hàng đang trên đường vận chuyển", "Đơn hàng đã hoàn thành"];
  const cancelStatus = "Đơn hàng đã huỷ";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getCurrentOrder(id));
  }, [id]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const currentStatus = currentOrder.status?.slice(-1)[0].title;
  const indexUpdate = arrStatus.indexOf(currentStatus) + 1;

  const handleUpdate = () => {
    const updateStatus = { status: arrStatus[indexUpdate] }
    dispatch(updateOrder({ id: id, status: updateStatus }));
  }

  const handleCancelOrder = () => {
    const updateStatus = { status: cancelStatus };
    dispatch(updateOrder({ id: id, status: updateStatus }));
  }

  return (
    <>
      {
        isLoading ?
          <Loading /> :
          <>
            {
              Object.keys(currentOrder).length > 0 &&
              <div className="update-order">
                <div className="update-order__title">
                  <p>{`Mã đơn hàng: ${currentOrder.codeOrder} | ${currentStatus}`}</p>
                </div>
                <Grid container className="update-order__info">
                  <Grid item xs={6}>
                    <p>{currentOrder.customerName}</p>
                    <p>{currentOrder.address.name}</p>
                    <p>{currentOrder.address.phone}</p>
                    <p>{`${currentOrder.address.address.street}, ${currentOrder.address.address.wards}, ${currentOrder.address.address.district}, ${currentOrder.address.address.city}`}</p>
                    <p>{currentOrder.address.note}</p>
                  </Grid>
                  <Grid item xs={6}>
                    {[...currentOrder.status].reverse().map((status, index, arr) => (
                      <div key={index} className="status">
                        <div className='status__icon-wrapper'>
                          <CircleIcon className="status__icon" />
                        </div>
                        <div className="status__time">
                          {moment(status.time).format("hh:mm DD-MM-YYYY")}
                        </div>
                        <div className="status__title">
                          {status.title}
                        </div>
                      </div>
                    ))}
                  </Grid>
                </Grid>
                <TableContainer component={Paper} variant="outlined" square >
                  <Table size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell align="right">Sản phẩm</TableCell>
                        <TableCell align="right">Số lượng</TableCell>
                        <TableCell align="right">Đơn giá</TableCell>
                        <TableCell align="right">Thành tiền</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentOrder.products?.map((product, index) => (
                        <TableRow
                          key={index}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell align="right">{product.name}</TableCell>
                          <TableCell align="right">{product.qty}</TableCell>
                          <TableCell align="right">{formatCurrency(product.price)}</TableCell>
                          <TableCell align="right">{formatCurrency(product.qty * product.price)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={4} align="center">Phí ship</TableCell>
                        <TableCell align="right">{formatCurrency(currentOrder.shippingFee)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ fontWeight: 'bold' }}>Tổng tiền</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>{formatCurrency(currentOrder.amount + currentOrder.shippingFee)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                {currentStatus !== arrStatus.slice(-1)[0] && currentStatus !== cancelStatus &&
                  <div className="flex-bw-center">
                    <button className="btn-df btn-df--del" onClick={handleClickOpen}>Huỷ đơn hàng</button>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                    >
                      <DialogTitle>Huỷ Đơn Hàng?</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Đơn hàng này sẽ bị huỷ. Vui lòng xác nhận!
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Quay lại</Button>
                        <Button onClick={handleCancelOrder} autoFocus>
                          Huỷ đơn hàng
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <button className="btn-df" onClick={handleUpdate}>Cập nhật đơn hàng</button>
                  </div>
                }
              </div>
            }
          </>
      }
    </>
  );
};

export default UpdateOrder;