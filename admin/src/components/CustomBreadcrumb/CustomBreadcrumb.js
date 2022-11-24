import "./custom-breadcrumb.scss";
import { Link, useLocation } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';


const CustomBreadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((item) => item);
  const breadcrumbNameMap = {
    '/orders': 'Đơn hàng',
    '/products': 'Sản phẩm',
    '/products/create': 'Tạo sản phẩm',
    '/categories': 'Danh mục sản phẩm',
    '/categories/create': 'Tạo danh mục sản phẩm',
    '/stock': 'Kho hàng',
    '/origin': 'Xuất xứ',
    '/suppliers': 'Nhà cung cấp',
    '/suppliers/create': 'Tạo nhà cung cấp',
    '/customer': 'Khách hàng',
    '/customer/create': 'Tạo tài khoản khách hàng',
    '/delivery-info': 'Địa chỉ khách hàng',
    '/delivery-info/create': 'Tạo địa chỉ khách hàng',
    '/admins': 'Quản trị thành viên',
    '/admins/create': 'Tạo tài khoản quản trị',
  };

  return (
    <div className="custom-breadcurmb">
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/" className="link-default">Trang chủ</Link>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          return last ? (
            <Typography color="text.primary" key={to}>
              {breadcrumbNameMap[to]}
            </Typography>
          ) : (
            <Link underline="hover" color="inherit" to={to} key={to}>
              {breadcrumbNameMap[to]}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default CustomBreadcrumb;