import "./origin.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrigin, deleteOrigin, getOrigin, updateOrigin } from "../../redux/slice/originSlice";
import { selectOrigin } from "../../redux/selectors";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import AddOrigin from "../../components/Origin/AddOrigin/AddOrigin";

const Origin = () => {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(50);
  const [selectionModel, setSelectionModel] = useState([]);
  const [name, setName] = useState("");
  const [formError, setFormError] = useState("");
  const [edit, setEdit] = useState({});
  const origin = useSelector(selectOrigin);
  const isEditEmpty = Object.keys(edit).length === 0;
  const selectedOrgin = [...origin.filter(item => selectionModel.includes(item._id))];

  useEffect(() => {
    dispatch(getOrigin());
  }, []);

  const validate = () => {
    let error;

    if (!name || !name.trim()) {
      error = "Vui lòng điền vào mục này!";
    }

    origin.map(item => {
      if (item.name === name) {
        return error = "Địa điểm đã tồn tại!";
      }
    })

    return error;
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newOrigin = {
      name: name
    }
    setFormError(validate());
    !validate() && dispatch(addOrigin(newOrigin));
  }

  const handleDelete = (item) => {
    dispatch(deleteOrigin(item._id));
  }

  const handleEdit = (item) => {
    if (!isEditEmpty && item.row._id === edit.id) {
      const updatedOrigin = { name: edit.name };
      const id = edit.id;

      dispatch(updateOrigin({ id, updatedOrigin }))
      setEdit({});
      return
    }

    setEdit({
      id: item.row._id,
      name: item.row.name
    });
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
          <>
            {!isEditEmpty && item.row._id === edit.id ?
              <input type="text" className="input-default" name="name" vlaue={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} />
              :
              <p>{item.row.name}</p>
            }
          </>
        );
      },
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
            <button className="flex-bw-center btn-default btn-default--edit text-small" onClick={(e) => handleEdit(item)}>
              {!isEditEmpty && item.row._id === edit.id ?
                <span>Submit</span>
                :
                <>
                  <span>Update</span>
                  <EditIcon className="text-default" />
                </>
              }

            </button>
            <CustomDialog item={item} origin={origin} handleDelete={handleDelete} selectedItems={selectedOrgin} />
          </>
        );
      },
    },
  ];

  return (
    <>
      <AddOrigin
        handleOnSubmit={handleOnSubmit}
        name={name}
        setName={setName}
        formError={formError}
      />
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

    </>
  )
}

export default Origin;