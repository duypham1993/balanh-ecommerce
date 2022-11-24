import "./sidebar.scss";
import logo from "../../assets/imgs/logo.png";
import { useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import InventoryIcon from '@mui/icons-material/Inventory';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CustomBreadcrumb from "../CustomBreadcrumb/CustomBreadcrumb";
import Account from "../Account/Account";
import HandshakeIcon from '@mui/icons-material/Handshake';
import MenuItem from './MenuItem';




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
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const menu1 = [
    {
      icon: <ShoppingBasketIcon />,
      title: 'Đơn hàng',
      children: [
        {
          title: 'Đơn hàng',
          link: "/orders",
        }
      ]
    },
    {
      icon: <InventoryIcon />,
      title: 'Sản phẩm',
      children: [
        {
          title: 'Sản phẩm',
          link: "/products",
        },
        {
          title: 'Danh mục sản phẩm',
          link: "/categories"
        },
        {
          title: 'Kho hàng',
          link: "/stock"
        }
      ]
    },
    {
      icon: <HandshakeIcon />,
      title: "Đối tác",
      children: [
        {
          title: "Xuất xứ",
          link: "/origin"
        },
        {
          title: "Nhà cung cấp",
          link: "/suppliers"
        }
      ]
    },
    {
      icon: <SupportAgentIcon />,
      title: "Khách hàng",
      children: [
        {
          title: "Tài khoản",
          link: "/customers",
        },
        {
          title: "Địa chỉ",
          link: "/delivery-info",
        },
      ]
    }
  ];
  const menu2 = [
    {
      icon: <SupervisorAccountIcon />,
      title: 'Quản trị thành viên',
      children: [
        {
          title: "Quản trị thành viên",
          link: "/admins"
        }
      ]
    }
  ];
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
      <AppBar position="fixed" open={open} className="navbar">
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ marginRight: 5, ...(open && { display: 'none' }), }}>
            <MenuIcon />
          </IconButton>
          <CustomBreadcrumb />
        </Toolbar>
        <div className="navbar__account">
          <Account />
        </div>
      </AppBar>
      <Drawer variant="permanent" open={open} className={open ? "sidebar" : "sidebar hidden"}>
        <DrawerHeader sx={{ justifyContent: "space-between" }}>
          <img src={logo} alt="logo" className="sidebar__logo" />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <ul className="sidebar__list-item">
          {menu1.map((item, index) => {
            const depthLevel = 0;
            return (
              <MenuItem
                item={item}
                key={index}
                depthLevel={depthLevel}
              />
            );
          })}
        </ul>
        <Divider />
        <ul className="sidebar__list-item">
          {menu2.map((item, index) => {
            const depthLevel = 0;
            return (
              <MenuItem
                item={item}
                key={index}
                depthLevel={depthLevel}
              />
            );
          })}
        </ul>
      </Drawer>
    </>
  );
}
