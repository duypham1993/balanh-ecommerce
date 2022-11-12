import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";


const Layout = () => {
  return (
    <Box className="flex-bw-center">
      <Sidebar />
      <Box component="main" className="main-content">
        <Outlet />
      </Box>
    </Box>
  )
};

export default Layout;