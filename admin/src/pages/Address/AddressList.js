import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import SubmitAlert from '../../components/SubmitAlert/SubmitAlert';
import { deleteAddress, getAddresssList } from '../../redux/slice/addressSlice';
import Loading from '../../components/Loading/Loading';

const AddressList = () => {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(50);
  const [selectionModel, setSelectionModel] = useState([]);
  const { isLoading, addressList } = useSelector(state => state.address);
  const [mess, setMess] = useState({});

  useEffect(() => {
    dispatch(getAddresssList());
  }, []);

  const selectedAddressList = addressList && [...addressList.filter(item => selectionModel.includes(item._id))];

  const handleDelete = (item) => {
    dispatch(deleteAddress(item._id));
  };

  const columns = [
    {
      field: "email",
      headerName: "Email",
      headerClassName: "wrapper_data-grid__header",
      flex: 1,
      minWidth: 150
    },

    {
      field: "name",
      headerName: "Họ tên người nhận",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "street",
      headerName: "Địa chỉ",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 150,
      flex: 1,
      renderCell: (item) => {
        return (
          <>
            {item.row.address.street
            }
          </>
        )
      }
    },
    {
      field: "wards",
      headerName: "Phường/Xã",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 150,
      flex: 1,
      renderCell: (item) => {
        return (
          <>
            {item.row.address.wards
            }
          </>
        )
      }
    },
    {
      field: "strict",
      headerName: "Quận/Huyện",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 150,
      flex: 1,
      renderCell: (item) => {
        return (
          <>
            {item.row.address.district
            }
          </>
        )
      }
    },
    {
      field: "city",
      headerName: "Tỉnh/Thành phố",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 150,
      flex: 1,
      renderCell: (item) => {
        return (
          <>
            {item.row.address.city
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
            <Link to={"/addresses/" + item.row._id} className="link-default">
              <button className="flex-bw-center btn-df btn-df--edit text-small">
                <span>Update</span>
                <EditIcon className="text-default" />
              </button>
            </Link>
            <CustomDialog item={item} selectedItems={selectedAddressList} handleDelete={handleDelete} />
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
            <Link to='/addresses/create' className='btn-df'>Tạo địa chỉ mới</Link>
          </div>
          <div className="wrapper_data-grid addressList">
            <DataGrid
              rows={addressList}
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

export default AddressList;