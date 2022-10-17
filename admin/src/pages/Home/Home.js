import "./home.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Box from "@mui/material/Box";


const Home = () => {
  return (
    <Box className="home-page flex-bw-center">
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        Home page
      </Box>
    </Box>
  );
};

export default Home;