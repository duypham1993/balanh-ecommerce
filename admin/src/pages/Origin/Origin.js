import "./origin.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrigin, getOrigin } from "../../redux/slice/originSlice";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import { DataGrid } from '@mui/x-data-grid';
import AddOrigin from "../../components/Origin/AddOrigin/AddOrigin";
import UpdateOrigin from "../../components/Origin/UpdateOrigin/UpdateOrigin";
import SubmitAlert from "../../components/SubmitAlert/SubmitAlert";
import { DELETE_ORIGIN_SUCCESS } from "../../shared/constants";
import Loading from "../../components/Loading/Loading";

const Origin = () => {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(50);
  const [selectionModel, setSelectionModel] = useState([]);
  const { isLoading, origin } = useSelector(state => state.origin);
  const selectedOrgin = [...origin.filter(item => selectionModel.includes(item._id))];
  const [mess, setMess] = useState({});

  useEffect(() => {
    dispatch(getOrigin());
  }, []);

  const handleDelete = (item) => {
    dispatch(deleteOrigin(item._id))
      .unwrap()
      .then(() => {
        setMess({ success: DELETE_ORIGIN_SUCCESS });
      })
      .catch((error) => {
        error.other && setMess({ error: error.other });
      })
  }

  const columns = [
    {
      field: "name",
      headerName: "Xuất xứ",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 150,
      flex: 1,
      renderCell: (item) => {
        return (
          <p>{item.row.name}</p>
        );
      },
    },

    {
      field: "action",
      headerName: "Hành động",
      headerClassName: "wrapper_data-grid__header",
      width: 210,
      sortable: false,
      renderCell: (item) => {
        return (
          <>
            <UpdateOrigin item={item.row} setMess={setMess} />
            <CustomDialog item={item} origin={origin} handleDelete={handleDelete} selectedItems={selectedOrgin} />
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
          <AddOrigin setMess={setMess} />
          <div className="wrapper_data-grid origin">
            <DataGrid
              rows={origin}
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
          <SubmitAlert mess={mess} />
        </>
      }
    </>
  )
}

export default Origin;