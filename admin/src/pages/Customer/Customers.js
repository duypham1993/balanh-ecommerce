import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import SubmitAlert from '../../components/SubmitAlert/SubmitAlert';
import { deleteCustomer, getCustomers } from '../../redux/slice/customerSlice';
import { DELETE_CUSTOMER_SUCCESS } from '../../shared/constants';
import Loading from '../../components/Loading/Loading';

const Custommer = () => {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(50);
  const [selectionModel, setSelectionModel] = useState([]);
  const { isLoading, customers } = useSelector(state => state.customer);
  const [mess, setMess] = useState({})

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  const selectedCustomerS = customers && [...customers.filter(item => selectionModel.includes(item._id))];

  const handleDelete = (item) => {
    dispatch(deleteCustomer(item._id))
      .unwrap()
      .then(() => {
        setMess({ success: DELETE_CUSTOMER_SUCCESS });
      })
      .catch((error) => {
        error.other && setMess({ error: error.other });
      })
  };

  const columns = [
    {
      field: "gender",
      headerName: "Giới tính",
      headerClassName: "wrapper_data-grid__header",
      flex: 0.2,
      minWidth: 100
    },
    {
      field: "name",
      headerName: "Họ và tên",
      headerClassName: "wrapper_data-grid__header",
      flex: 1,
      minWidth: 100
    },

    {
      field: "email",
      headerName: "Email",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "isActive",
      minWidth: 100,
      headerName: "Trạng thái",
      headerClassName: "wrapper_data-grid__header",
      flex: 0.5,
      renderCell: (item) => {
        return (
          <>
            {item.row.isActive ?
              <DoneIcon className="icon-active" /> :
              <CloseIcon className="icon-inactive" />
            }
          </>
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
            <Link to={"/customers/" + item.row._id} className="link-default">
              <button className="flex-bw-center btn-df btn-df--edit text-small">
                <span>Update</span>
                <EditIcon className="text-default" />
              </button>
            </Link>
            <CustomDialog item={item} selectedItems={selectedCustomerS} handleDelete={handleDelete} />
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
          <div className="flex-r-c">
            <Link to='/customers/create' className='btn-df'>Tạo khách hàng mới</Link>
          </div>
          <div className="wrapper_data-grid customers">
            <DataGrid
              rows={customers}
              disableSelectionOnClick
              columns={columns}
              disableColumnMenu
              getRowId={(row) => row._id}
              checkboxSelection={true}
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
}

export default Custommer;