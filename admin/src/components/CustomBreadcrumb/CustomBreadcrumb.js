import "./custom-breadcrumb.scss";
import { Link, useLocation } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';


const CustomBreadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  console.log(pathnames);
  const breadcrumbNameMap = {
    '/orders': 'Đơn hàng',
    '/products': 'Sản phẩm',
    '/categories': 'Danh mục sản phẩm',
    '/customer': 'Khách hàng',
    '/admins': 'Quản trị thành viên',
  };

  return (
    <div className="custom-breadcurmb">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/">
          Home
        </Link>
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