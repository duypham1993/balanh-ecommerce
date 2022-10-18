import "./product-list.scss";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProduct } from "../../../redux/apiCalls";
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutline from "@mui/icons-material/DeleteOutline";


const ProductList = () => {
  const [pageSize, setPageSize] = useState(50);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProduct(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(dispatch, id);
  };

  const columns = [
    {
      field: "imgs",
      headerName: "Hình ảnh",
      width: 220,
      sortable: false
    },

    {
      field: "title",
      headerName: "Tên sản phẩm",
      width: 200,
    },

    {
      field: "SKU",
      headerName: "Mã tham chiếu",
      width: 200,
    },

    {
      field: "categories",
      headerName: "Danh mục",
      width: 200,
    },

    {
      field: "costPrice",
      headerName: "Giá nhập",
      width: 160,
    },

    {
      field: "price",
      headerName: "Giá bán",
      width: 160,
    },
    { field: "qty", headerName: "Số lượng", width: 200 },
    { field: "isActive", headerName: "Trạng thái", width: 200 },
    {
      field: "action",
      headerName: "Hành động",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/products/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex-r-c">
        <Link to='/add-product' className='btn-default'>Sản phẩm mới</Link>
      </div>
      <div className="productList" style={{ height: '400px' }} >
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
        />
      </div>
    </>
  )
};

export default ProductList;