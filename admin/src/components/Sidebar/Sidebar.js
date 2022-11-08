import "./sidebar.scss";
import logo from "../../assets/imgs/logo.png";
import { useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { NavLink } from "react-router-dom";
import CustomBreadcrumb from "../CustomBreadcrumb/CustomBreadcrumb";
import Account from "../Account/Account";
import ForestIcon from '@mui/icons-material/Forest';
import StoreIcon from '@mui/icons-material/Store';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar() {
  const itemArr1 = ['Đơn hàng', 'Sản phẩm', 'Danh mục sản phẩm', "Xuất xứ", "Nhà cung cấp", 'Khách hàng'];
  const iconArr1 = [<ShoppingBasketIcon />, <InventoryIcon />, <CategoryIcon />, <ForestIcon />, <StoreIcon />, <SupportAgentIcon />];
  const linkArr1 = ["/orders", "products", "categories", "origin", "suppliers", "customer"];
  const itemArr2 = ['Quản trị thành viên'];
  const iconArr2 = [<SupervisorAccountIcon />];
  const linkArr2 = ["/admins"];
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open} className="sidebar__header">
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ marginRight: 5, ...(open && { display: 'none' }), }}>
            <MenuIcon />
          </IconButton>
          <CustomBreadcrumb />
        </Toolbar>
        <div className="sidebar__account">
          <Account />
        </div>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ justifyContent: "space-between" }}>
          <img src={logo} alt="logo" className="sidebar__logo" />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {itemArr1.map((text, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton sx={{ justifyContent: open ? 'initial' : 'center', p: 0 }} >
                <NavLink to={linkArr1[index]} className="sidebar__link">
                  <Box component="span" sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', display: 'inline-flex' }}>{iconArr1[index]}</Box>
                  <Box component="span" sx={{ opacity: open ? 1 : 0, display: open ? 'inline-block' : 'none' }}>{text}</Box>
                </NavLink>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {itemArr2.map((text, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton sx={{ justifyContent: open ? 'initial' : 'center', p: 0 }} >
                <NavLink to={linkArr2[index]} className="sidebar__link">
                  <Box component="span" sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', display: 'inline-flex' }}>{iconArr2[index]}</Box>
                  <Box component="span" sx={{ opacity: open ? 1 : 0, display: open ? 'inline-block' : 'none' }}>{text}</Box>
                </NavLink>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
