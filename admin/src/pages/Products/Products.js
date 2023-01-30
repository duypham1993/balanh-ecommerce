import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { deleteProduct, getProducts } from "../../redux/slice/productSlice";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import SubmitAlert from '../../components/SubmitAlert/SubmitAlert';
import Loading from '../../components/Loading/Loading';

const ProductList = () => {
  const [pageSize, setPageSize] = useState(50);
  const dispatch = useDispatch();
  const [selectionModel, setSelectionModel] = useState([]);
  const { isLoading, products } = useSelector(state => state.product);
  const [mess, setMess] = useState({});

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const selectedProducts = [...products.filter(item => selectionModel.includes(item._id))];

  const handleDelete = (item) => {
    dispatch(deleteProduct(item._id));
  };

  const columns = [
    {
      field: "imgs",
      headerName: "Hình ảnh",
      headerClassName: "wrapper_data-grid__header",
      flex: 0.7,
      minWidth: 150,
      sortable: false,
      renderCell: (item) => {
        return (
          <img src={item.row.imgs[0]} alt="category-image" className="wrapper_data-grid__img" />
        );
      },
    },

    {
      field: "name",
      headerName: "Tên sản phẩm",
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
      field: "desc",
      headerName: "Mô tả",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "categories",
      headerName: "Danh mục",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 150,
      flex: 1,
      renderCell: (item) => {
        // get info categories of product
        const categories = [...item.row.categories].reverse();
        const lastIndex = categories?.length - 1;
        return categories?.map((category, index) => index === lastIndex ? category.name : `${category.name}, `
        );
      }
    },
    {
      field: "costPrice",
      headerName: "Giá nhập",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 100,
      flex: 0.5,
    }, {
      field: "price",
      headerName: "Giá bán",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 100,
      flex: 0.5,
    }, {
      field: "qty",
      headerName: "Số lượng",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 100,
      flex: 0.5,
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
            <Link to={"/products/" + item.row._id} className="link-default">
              <button className="flex-bw-center btn-df btn-df--edit text-small">
                <span>Update</span>
                <EditIcon className="text-default" />
              </button>
            </Link>
            <CustomDialog item={item} selectedItems={selectedProducts} handleDelete={handleDelete} />
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
            <Link to='/products/create' className='btn-df'>Sản phẩm mới</Link>
          </div>
          <div className="wrapper_data-grid productList"  >
            <DataGrid
              rows={products}
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

export default ProductList;