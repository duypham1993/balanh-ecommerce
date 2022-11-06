import "./categories.scss";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategoriesWithoutRoot } from "../../redux/selectors";
import { getCategories } from "../../redux/slice/categorySlice";
import { selectisFetching } from "../../redux/selectors";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const Categories = () => {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(50);
  const [selectionModel, setSelectionModel] = useState([]);
  const categoriesWithoutRoot = useSelector(selectCategoriesWithoutRoot);
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const selectedCategories = [...categoriesWithoutRoot.filter(item => selectionModel.includes(item._id))];

  const columns = [
    {
      field: "img",
      headerName: "Hình ảnh",
      headerClassName: "categories__header",
      flex: 0.7,
      minWidth: 150,
      sortable: false,
      renderCell: (item) => {
        return (
          <img src={item.row.img} alt="category-image" className="categories__img" />
        );
      },
    },

    {
      field: "name",
      headerName: "Danh mục",
      headerClassName: "categories__header",
      flex: 1,
      minWidth: 150
    },

    {
      field: "desc",
      headerName: "Mô tả",
      headerClassName: "categories__header",
      minWidth: 150,
      flex: 2,
    },
    {
      field: "slug",
      headerName: "Đường dẫn",
      headerClassName: "categories__slug",
      minWidth: 150,
      flex: 1,
    },

    {
      field: "isActive",
      minWidth: 100,
      headerName: "Trạng thái",
      headerClassName: "categories__header",
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
      headerClassName: "categories__header",
      minWidth: 210,
      flex: 0.6,
      sortable: false,
      renderCell: (item) => {
        return (
          <>
            <Link to={"/categories/" + item.row._id} className="link-default">
              <button className="flex-bw-center btn-default btn-default--edit text-small">
                <span>Update</span>
                <EditIcon className="text-default" />
              </button>
            </Link>
            <CustomDialog item={item} selectedCategories={selectedCategories} />
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex-r-c">
        <Link to='/categories/create' className='btn-default'>Tạo danh mục mới</Link>
      </div>
      <div className="categories">
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

    </>
  )
};

export default Categories;