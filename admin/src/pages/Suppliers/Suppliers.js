import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatusSupplierSubmit, selectSuppliers } from "../../redux/selectors";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { deleteSupplier, getSuppliers, resetStatusSubmit } from "../../redux/slice/supplierSlice";
import SubmitAlert from '../../components/SubmitAlert/SubmitAlert';

const Suppliers = () => {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(50);
  const [selectionModel, setSelectionModel] = useState([]);
  const suppliers = useSelector(selectSuppliers);
  const statusSubmit = useSelector(selectStatusSupplierSubmit);
  const mess = {
    success: "Xoá thành công!",
    error: "Xoá thất bại!"
  }

  useEffect(() => {
    dispatch(getSuppliers());
    dispatch(resetStatusSubmit());
  }, []);

  const selectedSuppliers = suppliers && [...suppliers.filter(item => selectionModel.includes(item._id))];

  const handleDelete = (item) => {
    dispatch(deleteSupplier(item._id));
  };

  const columns = [
    {
      field: "name",
      headerName: "Nhà cung cấp",
      headerClassName: "wrapper_data-grid__header",
      flex: 1,
      minWidth: 150
    },

    {
      field: "sku",
      headerName: "Mã tham chiếu",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
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
            <Link to={"/suppliers/" + item.row._id} className="link-default">
              <button className="flex-bw-center btn-default btn-default--edit text-small">
                <span>Update</span>
                <EditIcon className="text-default" />
              </button>
            </Link>
            <CustomDialog item={item} selectedItems={selectedSuppliers} handleDelete={handleDelete} />
          </>
        );
      },
    },
  ];

  // alert popup control
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <div className="flex-r-c">
        <Link to='/suppliers/create' className='btn-default'>Tạo nhà cung cấp mới</Link>
      </div>
      <div className="wrapper_data-grid suppliers">
        <DataGrid
          rows={suppliers}
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
        statusSubmit={statusSubmit}
        mess={mess}
      />
    </>
  )
}

export default Suppliers;