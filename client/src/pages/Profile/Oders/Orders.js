import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../../../redux/slice/orderSlice';
import { getLocalCurrentUser } from '../../../utils/localStorage';
import moment from 'moment';
import { formatCurrency } from "../../../utils/formatCurrency";
import { Link } from 'react-router-dom';
import "./orders.scss";
import Loading from '../../../components/Loading/Loading';

const Orders = () => {
  const dispatch = useDispatch();
  const { _id } = getLocalCurrentUser();
  const arrHeader = ["Mã ĐH", "Thời gian", "Địa chỉ", "Ship", "Tiền hàng", "Lưu ý", "Trạng thái", ""];
  const { orders, isLoading } = useSelector(state => state.order);

  useEffect(() => {
    dispatch(getUserOrders(_id));
  }, []);

  return (
    <>
      {isLoading ?
        <Loading />
        :
        orders.length ?
          <div className='bg-white p-3 shadow-sm orders'>
            <Table responsive className='border m-0'>
              <thead>
                <tr>
                  {arrHeader.map((item, index) => (
                    <th key={index} className='border align-middle'>{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders?.map((order, index) => (
                  <tr key={index}>
                    <td className='border'>{order.codeOrder}</td>
                    <td className='border'>{moment(order.status[order.status.length - 1].time).format("hh:mm DD-MM-YYYY")}</td>
                    <td className='border'>{`${order.address.address.street}, ${order.address.address.wards}, ${order.address.address.district}, ${order.address.address.city}`}</td>
                    <td className='border'>{formatCurrency(order.shippingFee)}</td>
                    <td className='border'>{formatCurrency(order.amount)}</td>
                    <td className='border'>{order.note}</td>
                    <td className='border'>{order.status[order.status.length - 1].title}</td>
                    <td className='border'><Link to={`/orders/${order._id}`} className="link-df link-df--gray text-decoration-underline">Chi tiết</Link></td>
                  </tr>
                ))}

              </tbody>
            </Table>
          </div> :
          <div className='bg-white p-3 shadow-sm orders'>Bạn chưa đặt đơn hàng nào gần đây!</div>
      }
    </>

  );
};

export default Orders;