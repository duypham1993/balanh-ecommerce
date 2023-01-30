import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import SubmitAlert from '../../components/SubmitAlert/SubmitAlert';
import { getAllOrders } from '../../redux/slice/orderSlice';
import { formatCurrency } from '../../utils/formatCurrency';
import Loading from '../../components/Loading/Loading';

const OrdersList = () => {
  const [pageSize, setPageSize] = useState(50);
  const dispatch = useDispatch();
  const [selectionModel, setSelectionModel] = useState([]);
  const { isLoading, orders } = useSelector(state => state.order);
  const [mess, setMess] = useState({});

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const columns = [
    {
      field: "codeOrder",
      headerName: "Mã ĐH",
      headerClassName: "wrapper_data-grid__header",
      flex: 0.7,
      minWidth: 150,
      sortable: false
    },

    {
      field: "customerName",
      headerName: "Tên khách hàng",
      headerClassName: "wrapper_data-grid__header",
      flex: 1,
      minWidth: 150
    },

    {
      field: "customerEmail",
      headerName: "Email",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 150,
      flex: 1,
      renderCell: (item) => {
        const address = item.row.address.address;
        return (
          <p>{`${address.street}, ${address.wards}, ${address.district}, ${address.city}`}</p>
        )
      }
    },
    {
      field: "amount",
      headerName: "Tiền hàng",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 100,
      flex: 0.4,
      renderCell: (item) => (
        <p>{formatCurrency(item.row.amount)}</p>
      )
    }, {
      field: "shippingFee",
      headerName: "Phí ship",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 100,
      flex: 0.4,
      renderCell: (item) => (
        <p>{formatCurrency(item.row.shippingFee)}</p>
      )
    },

    {
      field: "status",
      minWidth: 100,
      headerName: "Trạng thái ĐH",
      headerClassName: "wrapper_data-grid__header",
      flex: 0.5,
      renderCell: (item) => {
        const arrStatus = item.row.status;
        return (
          <div>{arrStatus[arrStatus.length - 1].title}</div>
        )
      }
    },

    {
      field: "action",
      headerName: "Hành động",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 210,
      flex: 0.6,
      sortable: false,
      renderCell: (item) => {
        return (
          <>
            <Link to={"/orders/" + item.row._id} className="link-default">
              <button className="flex-bw-center btn-df btn-df--edit text-small">
                <span>Chi tiết đơn hàng</span>
                <EditIcon className="text-default" />
              </button>
            </Link>
          </>
        );
      },
    },
  ];
  return (
    <>
      {isLoading ?
        <Loading /> :
        <>
          <div className="wrapper_data-grid productList"  >
            <DataGrid
              rows={orders}
              disableSelectionOnClick
              columns={columns}
              disableColumnMenu
              getRowId={(row) => row._id}
              checkboxSelection
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[20, 50, 100]}
              pagination
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
              }}
              selectionModel={selectionModel}
            />
          </div>
          <SubmitAlert
            mess={mess}
          />
        </>
      }
    </>
  )
};

export default OrdersList;