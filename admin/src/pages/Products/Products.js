import "./products.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Box from "@mui/material/Box";

const Products = () => {
  return (
    <Box className="products-page flex-bw-center">
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        Products page
      </Box>
    </Box>
  );
};

export default Products;