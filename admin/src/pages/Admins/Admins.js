import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import SubmitAlert from '../../components/SubmitAlert/SubmitAlert';
import { deleteAdmin, getAdmins } from '../../redux/slice/adminSlice';
import { DELETE_ADMIN_SUCCESS } from '../../shared/constants';
import Loading from '../../components/Loading/Loading';

const Admins = () => {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(50);
  const [selectionModel, setSelectionModel] = useState([]);
  const { admins, isLoading } = useSelector(state => state.admin);
  const [mess, setMess] = useState({});

  useEffect(() => {
    dispatch(getAdmins())
      .unwrap()
      .catch((error) => {
        setMess({ error: error.other })
      })
  }, []);

  const selectedAdmins = admins?.filter(item => selectionModel.includes(item._id));

  const handleDelete = (item) => {
    dispatch(deleteAdmin(item._id))
      .unwrap()
      .then(() => {
        setMess({ success: DELETE_ADMIN_SUCCESS })
      })
      .catch((error) => {
        setMess({ error: error.other })
      })
  };

  const columns = [
    {
      field: "lastName",
      headerName: "Họ và tên đệm",
      headerClassName: "wrapper_data-grid__header",
      flex: 1,
      minWidth: 100
    },

    {
      field: "firstName",
      headerName: "Tên",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "role",
      headerName: "Chức vụ",
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
            <Link to={"/admins/" + item.row._id} className="link-default">
              <button className="flex-bw-center btn-df btn-df--edit text-small">
                <span>Update</span>
                <EditIcon className="text-default" />
              </button>
            </Link>
            <CustomDialog item={item} selectedItems={selectedAdmins} handleDelete={handleDelete} />
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
            <Link to='/admins/create' className='btn-df'>Tạo quản trị viên mới</Link>
          </div>
          <div className="wrapper_data-grid admins">
            <DataGrid
              rows={admins}
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

export default Admins;