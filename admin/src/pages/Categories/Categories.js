import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategoriesWithoutRoot } from "../../redux/selectors";
import { deleteCategory, getCategories } from "../../redux/slice/categorySlice";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { delImgFireBase } from "../../utils/uploadFirebase";
import SubmitAlert from '../../components/SubmitAlert/SubmitAlert';
import { DELETE_CATEGORY_SUCCESS } from '../../shared/constants';
import Loading from '../../components/Loading/Loading';

const Categories = () => {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(50);
  const [selectionModel, setSelectionModel] = useState([]);
  const categoriesWithoutRoot = useSelector(selectCategoriesWithoutRoot);
  const { isLoading } = useSelector(state => state.category);
  const [mess, setMess] = useState({});

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const selectedCategories = [...categoriesWithoutRoot.filter(item => selectionModel.includes(item._id))];

  const handleDelete = (item) => {
    dispatch(deleteCategory(item._id))
      .unwrap()
      .then(() => {
        setMess({ success: DELETE_CATEGORY_SUCCESS });
        delImgFireBase(item.img);
      })
      .catch((error) => {
        setMess({ error: error.other });
      })
  };

  const columns = [
    {
      field: "img",
      headerName: "Hình ảnh",
      headerClassName: "wrapper_data-grid__header",
      flex: 0.7,
      minWidth: 150,
      sortable: false,
      renderCell: (item) => {
        return (
          <img src={item.row.img} alt="category-image" className="wrapper_data-grid__img" />
        );
      },
    },

    {
      field: "name",
      headerName: "Danh mục",
      headerClassName: "wrapper_data-grid__header",
      flex: 1,
      minWidth: 150
    },

    {
      field: "desc",
      headerName: "Mô tả",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 150,
      flex: 2,
    },
    {
      field: "slug",
      headerName: "Đường dẫn",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 150,
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
            <Link to={"/categories/" + item.row._id} className="link-default">
              <button className="flex-bw-center btn-df btn-df--edit text-small">
                <span>Update</span>
                <EditIcon className="text-default" />
              </button>
            </Link>
            <CustomDialog item={item} selectedItems={selectedCategories} handleDelete={handleDelete} />
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
            <Link to='/categories/create' className='btn-df'>Tạo danh mục mới</Link>
          </div>
          <div className="wrapper_data-grid categories">
            <DataGrid
              rows={categoriesWithoutRoot}
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
};

export default Categories;