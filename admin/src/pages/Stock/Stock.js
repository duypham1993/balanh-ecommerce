import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { getProducts } from "../../redux/slice/productSlice";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import UpdateQty from '../../components/UpdateQty/UpdateQty';
import Loading from '../../components/Loading/Loading';

const Stock = () => {
  const [pageSize, setPageSize] = useState(50);
  const dispatch = useDispatch();
  const [selectionModel, setSelectionModel] = useState([]);
  const { isLoading, products } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const columns = [
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
      flex: 0.5,
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
      field: "supplier",
      headerName: "Nhà cung cấp",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 100,
      flex: 0.5,
      renderCell: (item) => {
        return (
          item.row.supplier.name
        )
      }
    },
    {
      field: "origin",
      headerName: "Xuất xứ",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 100,
      flex: 0.5,
      renderCell: (item) => {
        return (
          item.row.origin.name
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
      field: "qty",
      headerName: "Số lượng",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 100,
      flex: 0.4
    },

    {
      field: "action",
      headerName: "Cập nhật",
      headerClassName: "wrapper_data-grid__header",
      minWidth: 210,
      flex: 0.6,
      sortable: false,
      renderCell: (item) => {
        return (
          <UpdateQty id={item.row._id} />
        );
      },
    },
  ];
  return (
    <>
      {isLoading ?
        <Loading /> :
        <>
          <div className="wrapper_data-grid stock"  >
            <DataGrid
              rows={products}
              disableSelectionOnClick
              columns={columns}
              disableColumnMenu
              getRowId={(row) => row._id}
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
      }
    </>
  )
};

export default Stock;