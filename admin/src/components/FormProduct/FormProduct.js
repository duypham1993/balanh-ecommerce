import "./form-product.scss";
import { useEffect, useState } from "react";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`product-tabpanel-${index}`} aria-labelledby={`product-tab-${index}`} {...other} >
      {value === index && (
        <>{children}</>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `product-tab-${index}`,
    'aria-controls': `product-tabpanel-${index}`,
  };
}

const FormProduct = (props) => {
  const [open, setOpen] = useState(true);
  const [valueTabs, setValueTabs] = useState(0);
  const [sku, setSku] = useState("");
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [costPrice, setCostPrice] = useState(0);
  const [file, setFile] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [desc, setDesc] = useState("");
  const [packing, setPacking] = useState("");
  const [origin, setOrigin] = useState("");
  const [supplier, setSupplier] = useState("");
  const [categories, setCategories] = useState([]);

  const handleClick = () => {
    setOpen(!open);
  };

  let imgUrls = file.map(item => URL.createObjectURL(item));

  useEffect(() => {
    if (props.product) {
      setSku(props.product.sku);
      setQty(props.product.qty);
      setPrice(props.product.price);
      setCostPrice(props.product.costPrice);
      setDesc(props.product.desc);
      setIsActive(props.product.isActive);
    }
  }, [props.product]);

  const handleChangeTabs = (e, newValue) => {
    setValueTabs(newValue);
  }

  const handleDelImg = (index) => {
    const fileTemp = file.filter((item, i) => i !== index);
    imgUrls = fileTemp.map(item => URL.createObjectURL(item));
    setFile(fileTemp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    file.map(item => {
      const fileName = new Date().getTime() + item.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, item);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
          });
        }
      );
    });
  }

  return (
    <form className="form-product">
      <div className="form-product__item form-product__item--title">
        <input type="text" name="title" placeholder="Tên sản phẩm" className="form-product__input form-product__input--title" />
      </div>
      <div>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={valueTabs} onChange={handleChangeTabs} aria-label="basic tabs example">
              <Tab label="Cài đặt cơ bản" {...a11yProps(0)} />
            </Tabs>
          </Box>
          <TabPanel value={valueTabs} index={0} className="form-product__tabpanel">
            <Grid container>
              <Grid container item xs={12} sm={9}>
                <Grid item xs={12} className="form-product__item form-product__upload">
                  {!file.length ?
                    <label htmlFor="img" className="form-product__upload-desc">
                      <AddAPhotoIcon className="form-product__upload-icon" />
                      <span>Tải hình ảnh ở đây</span>
                      <span><strong>Kích thước khuyến cáo là 800x800px cho ảnh mặc định</strong></span>
                      <span><em>Định dạng JPG, GIF hoặc PNG.</em></span>
                    </label> :
                    <div className="form-product__wrapper-preview" >
                      <label htmlFor="img" className="form-product__item-preview form-product__upload-preview">
                        <AddCircleOutlineIcon className="form-product__upload-icon" />
                      </label>
                      {imgUrls.map((item, index) => {
                        return (
                          <div className="form-product__item-preview" key={index}>
                            <img src={item} alt={"imgage " + index} className="form-product__imgs-preview" />
                            <HighlightOffTwoToneIcon className="form-product__del-img" onClick={() => handleDelImg(index)} />
                          </div>
                        )
                      })}
                    </div>
                  }

                  <input
                    hidden
                    type="file"
                    id="img"
                    name="img"
                    multiple
                    accept="image/*"
                    onChange={e => setFile(prev => [...prev, ...e.target.files])}
                  />
                </Grid>
                <Grid item xs={12} className="form-product__item form-product__item--desc">
                  <h5 className="form-product__title">Mô tả sản phẩm</h5>
                  <textarea
                    name="desc"
                    placeholder="Mô tả sơ lược sản phẩm"
                    value={desc}
                    onChange={e => setDesc(e.target.value)} />
                </Grid>
                <Grid container item xs={12} className="form-product__item form-product__price">
                  <Grid item xs={6} className="form-product__item form-product__item--origin">
                    <h5 className="form-product__title">Xuất xứ</h5>
                    <Select
                      name="origin"
                      value={origin}
                      className="form-product__input"
                      onChange={(e) => setOrigin(e.target.value)}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={6} className="form-product__item form-product__item--origin">
                    <h5 className="form-product__title">Nhà cung cấp</h5>
                    <Select
                      name="supplier"
                      value={supplier}
                      className="form-product__input"
                      onChange={(e) => setSupplier(e.target.value)}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </Grid>
                </Grid>

              </Grid>
              <Grid container item xs={12} sm={3}>
                <Grid item xs={12} className="form-product__item form-product__sku">
                  <h5 className="form-product__title">Mã tham chiếu</h5>
                  <input
                    type="text"
                    name="sku"
                    className="form-product__input"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} className="form-product__item form-product__qty">
                  <h5 className="form-product__title">Số lượng</h5>
                  <input
                    type="number"
                    name="qty"
                    className="form-product__input"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  />
                </Grid>
                <Grid container item xs={12} className="form-product__item form-product__price">
                  <h5 className="form-product__title">Giá</h5>
                  <Grid item xs={6} className="form-product__subitem">
                    <p className="form-product__subtitle">Giá nhập</p>
                    <div className="form-product__subwrapper">
                      <input
                        type="number"
                        name="costPrice"
                        className="form-product__input form-product__input--sub"
                        value={costPrice}
                        onChange={(e) => setCostPrice(e.target.value)}
                      />
                      <span className="form-product__icon">₫</span>
                    </div>

                  </Grid>
                  <Grid item xs={6} className="form-product__subitem">
                    <p className="form-product__subtitle">Giá bán</p>
                    <div className="form-product__subwrapper">
                      <input
                        type="number"
                        name="price"
                        className="form-product__input form-product__input--sub"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      <span className="form-product__icon">₫</span>
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs={12} className="form-product__item form-product__qty">
                  <h5 className="form-product__title">Quy cách đóng gói</h5>
                  <input
                    type="text"
                    name="packing"
                    className="form-product__input"
                    value={packing}
                    onChange={(e) => setPacking(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} className="form-product__item form-product__categories">
                  <h5 className="form-product__title">Danh mục</h5>
                  <List disablePadding className="form-product__list">
                    <ListItem onClick={handleClick} disablePadding>
                      {open ? <ExpandMore /> : <ExpandLess />}
                      <FormControlLabel
                        control={<Checkbox disabled checked />}
                        label="Trang chủ"
                        labelPlacement="end"
                      />
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <List disablePadding className="form-product__sublist">
                        <ListItem disablePadding>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Chọn lọc"
                            labelPlacement="end"
                          />
                        </ListItem>
                        <ListItem disablePadding>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Đồ tươi"
                            labelPlacement="end"
                          />
                        </ListItem>
                        <ListItem disablePadding>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Nước trái cây"
                            labelPlacement="end"
                          />
                        </ListItem>
                        <ListItem disablePadding>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Bột sữa hạt"
                            labelPlacement="end"
                          />
                        </ListItem>
                        <ListItem disablePadding>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Đồ tươi"
                            labelPlacement="end"
                          />
                        </ListItem>
                      </List>
                    </Collapse>
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
        </Box>
      </div>
      <div className="form-product__b-nav">
        <div className="flex-bw-center form-product__b-wrapper">
          <div>
            <FormControlLabel
              control={<Switch color="success" />}
              label={isActive ? "Trực tuyến" : "Ngoại tuyến"}
              labelPlacement="start"
              name="isActive"
              checked={isActive}
              onChange={e => setIsActive(e.target.checked)}
              className="form-product__switch"
            />
          </div>
          <div>
            <button className="btn-default bot-nav__btn" type="submit" onClick={(e) => handleSubmit(e)}>Lưu</button>
          </div>
        </div>
      </div>
    </form >
  );
};

export default FormProduct;