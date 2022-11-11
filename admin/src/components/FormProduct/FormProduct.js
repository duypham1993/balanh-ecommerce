import "./form-product.scss";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Tabs, Grid, Tab, Box, Switch, FormControlLabel, Autocomplete, TextField, FormGroup } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import { getCategories } from "../../redux/slice/categorySlice";
import { getSuppliers } from "../../redux/slice/supplierSlice";
import { getOrigin } from "../../redux/slice/originSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectArrOrigin, selectArrSuppliers, selectObjectData } from "../../redux/selectors";
import CustomTreeItem from "./CustomTreeItem/CustomTreeItem";

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
  const { inputs, setInputs, file, setFile, handleOnSubmit, products, currentProduct, imgURLsFirebase, imgURLsLocal, arrDelImg, setArrDelImg } = props;
  const dispatch = useDispatch();
  const [valueTabs, setValueTabs] = useState(0);
  const objectCategories = useSelector(selectObjectData);
  const arrOrigin = useSelector(selectArrOrigin);
  const arrSuplliers = useSelector(selectArrSuppliers);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // get categories, suppliers, origin for select menu
    dispatch(getCategories());
    dispatch(getSuppliers());
    dispatch(getOrigin());
  }, [])

  useEffect(() => {
    // set categories of update product
    renderTree(objectCategories)
  }, [inputs.categories])

  const handleChangeTabs = (e, newValue) => {
    setValueTabs(newValue);
  }

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setInputs({ ...inputs, [name]: checked })
    } else {
      setInputs({ ...inputs, [name]: value });
    }
  }

  const handleAutoComplete = (name, value) => {
    setInputs({ ...inputs, [name]: value })
  }

  const handleMultiCheckbox = (e) => {
    const { checked, value } = e.target;
    checked ?
      setInputs({ ...inputs, categories: [...inputs.categories, value] })
      :
      setInputs({ ...inputs, categories: inputs.categories.filter(item => item !== value) })
  }

  const handleDelImgFirebase = (img) => {
    setArrDelImg([...arrDelImg, img]);
    setInputs({ ...inputs, imgs: imgURLsFirebase.filter((item) => item !== img) });
  };

  const handleDelImgLocal = (index) => {
    const tempFile = file.filter((item, i) => i !== index);
    setFile(tempFile);
  }

  const validate = (inputs) => {
    const errors = {};
    const formatSKU = /^[0-9a-zA-Z]+$/;

    if (!formatSKU.test(inputs.sku)) {
      errors.sku = "Mã không hợp lệ!";
    }

    if (!inputs.sku || !inputs.sku.trim()) {
      errors.sku = "Vui lòng điền vào mục này!";
    }
    products.map(item => {
      if (currentProduct) {
        if (currentProduct._id !== item._id && item.sku === inputs.sku) {
          return errors.sku = "Mã đã tồn tại!"
        }
      } else {
        if (item.sku === inputs.sku) {
          return errors.sku = "Mã đã tồn tại!"
        }
      }
    })

    if (!inputs.name || !inputs.name.trim()) {
      errors.name = "Vui lòng điền vào mục này!";
    }

    if (!inputs.desc || !inputs.desc.trim()) {
      errors.desc = "Vui lòng điền vào mục này!";
    }

    if (!inputs.costPrice) {
      errors.costPrice = "Vui lòng điền vào mục này!";
    }

    if (!inputs.price) {
      errors.price = "Vui lòng điền vào mục này!";
    }

    if (!inputs.categories.length) {
      errors.categories = "Vui lòng chọn mục này!";
    }

    if (!inputs.origin || !inputs.origin.trim()) {
      errors.origin = "Vui lòng điền vào mục này!";
    }

    if (!inputs.supplier || !inputs.supplier.trim()) {
      errors.supplier = "Vui lòng điền vào mục này!";
    }

    if (!inputs.packing || !inputs.packing.trim()) {
      errors.packing = "Vui lòng điền vào mục này!";
    }

    if ((imgURLsLocal && !imgURLsLocal.length) && (imgURLsFirebase && !imgURLsFirebase.length)) {
      errors.file = "Vui lòng up ảnh!";
    }

    return errors;
  }

  const submitForm = async (e) => {
    e.preventDefault();
    setFormErrors(validate(inputs));
    Object.keys(validate(inputs)).length === 0 && handleOnSubmit();
  }

  const renderTree = (nodes) => {
    let check = false;
    for (let i = 0; i < inputs.categories.length; i++) {
      if (inputs.categories[i] === nodes._id) {
        check = true;
      }
    }
    return (
      <CustomTreeItem
        key={nodes._id}
        nodeId={nodes._id || "temp"}
        label={nodes.name}
        ContentProps={{ value: nodes._id, check: check }}
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </CustomTreeItem>
    )
  };
  console.log(imgURLsLocal);
  return (
    <form className="form-product" onSubmit={(e) => submitForm(e)}>
      <div className="form-product__item form-product__item--title">
        <input type="text" name="name" placeholder="Tên sản phẩm" className="input-default form-product__input form-product__input--title" value={inputs.name} onChange={(e) => handleOnChange(e)} />
      </div>
      <div>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={valueTabs} onChange={handleChangeTabs} aria-label="basic tabs example">
              <Tab label="Cài đặt cơ bản" {...a11yProps(0)} />
            </Tabs>
          </Box>
          <TabPanel value={valueTabs} index={0} className="form-product__tabpanel">
            <Grid container columnSpacing={{ xs: 0, sm: 3, lg: 6 }}>
              <Grid item xs={12} sm={6} lg={9} className="form-product__col">
                <Grid item xs={12} className="form-product__item form-product__upload">
                  {(imgURLsLocal && imgURLsLocal.length) || (imgURLsFirebase && imgURLsFirebase.length) ?
                    <div className="form-product__wrapper-preview" >
                      <label htmlFor="img" className="form-product__item-preview form-product__upload-preview">
                        <AddCircleOutlineIcon className="form-product__upload-icon" />
                      </label>
                      {imgURLsFirebase && imgURLsFirebase.map((item, index) => {
                        return (
                          <div className="form-product__item-preview" key={index}>
                            <img src={item} alt={"imgage " + index} className="form-product__imgs-preview" />
                            <HighlightOffTwoToneIcon className="form-product__del-img" onClick={() => handleDelImgFirebase(item)} />
                          </div>
                        )
                      })}
                      {imgURLsLocal && imgURLsLocal.map((item, index) => {
                        return (
                          <div className="form-product__item-preview" key={index}>
                            <img src={item} alt={"imgage " + index} className="form-product__imgs-preview" />
                            <HighlightOffTwoToneIcon className="form-product__del-img" onClick={() => handleDelImgLocal(index)} />
                          </div>
                        )
                      })}
                    </div>
                    :
                    <label htmlFor="img" className="form-product__upload-desc">
                      <AddAPhotoIcon className="form-product__upload-icon" />
                      <span>Tải hình ảnh ở đây</span>
                      <span><strong>Kích thước khuyến cáo là 800x800px cho ảnh mặc định</strong></span>
                      <span><em>Định dạng JPG, GIF hoặc PNG.</em></span>
                    </label>
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
                  <p className={formErrors.file ? "form-product__error show" : "form-product__error"}>{formErrors.file}</p>
                </Grid>
                <Grid item xs={12} className="form-product__item form-product__item--desc">
                  <h5 className="form-product__title">Mô tả sản phẩm</h5>
                  <textarea
                    name="desc"
                    placeholder="Mô tả sơ lược sản phẩm"
                    value={inputs.desc}
                    onChange={(e) => handleOnChange(e)}
                  />
                  <p className={formErrors.desc ? "form-product__error show" : "form-product__error"}>{formErrors.desc}</p>

                </Grid>
                <Grid container item xs={12} >
                  <Grid item xs={12} lg={6} className="form-product__item form-product__item--origin">
                    <h5 className="form-product__title">Xuất xứ</h5>
                    <Autocomplete
                      className="form-product__autocomplete"
                      value={inputs.origin}
                      onChange={(e, value) => handleAutoComplete("origin", value)}
                      options={arrOrigin}
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <p className={formErrors.origin ? "form-product__error show" : "form-product__error"}>{formErrors.origin}</p>
                  </Grid>
                  <Grid item xs={12} lg={6} className="form-product__item form-product__item--origin">
                    <h5 className="form-product__title">Nhà cung cấp</h5>
                    <Autocomplete
                      className="form-product__autocomplete"
                      value={inputs.supplier}
                      onChange={(e, value) => handleAutoComplete("supplier", value)}
                      options={arrSuplliers}
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <p className={formErrors.supplier ? "form-product__error show" : "form-product__error"}>{formErrors.supplier}</p>
                  </Grid>
                </Grid>

              </Grid>
              <Grid item xs={12} sm={6} lg={3} className="form-product__col">
                <Grid item xs={12} className="form-product__item form-product__sku">
                  <h5 className="form-product__title">Mã tham chiếu</h5>
                  <input
                    type="text"
                    name="sku"
                    className="input-default form-product__input"
                    value={inputs.sku}
                    onChange={(e) => handleOnChange(e)}
                  />
                  <p className={formErrors.sku ? "form-product__error show" : "form-product__error"}>{formErrors.sku}</p>
                </Grid>
                <Grid item xs={12} className="form-product__item form-product__qty">
                  <h5 className="form-product__title">Số lượng</h5>
                  <input
                    type="number"
                    name="qty"
                    className="input-default form-product__input"
                    value={inputs.qty}
                    onChange={(e) => handleOnChange(e)}
                  />
                  <p className={formErrors.qty ? "form-product__error show" : "form-product__error"}>{formErrors.qty}</p>
                </Grid>
                <Grid container columnSpacing={{ xs: 0, md: 2 }} className="form-product__price">
                  <h5 className="form-product__title">Giá</h5>
                  <Grid item xs={12} md={6} className="form-product__item form-product__subitem">
                    <p className="form-product__subtitle">Giá nhập</p>
                    <div className="form-product__subwrapper">
                      <input
                        type="number"
                        name="costPrice"
                        className="input-default form-product__input form-product__input--sub"
                        value={inputs.costPrice}
                        onChange={(e) => handleOnChange(e)}
                      />
                      <span className="form-product__icon">₫</span>
                    </div>
                    <p className={formErrors.costPrice ? "form-product__error show" : "form-product__error"}>{formErrors.costPrice}</p>
                  </Grid>
                  <Grid item xs={12} md={6} className="form-product__item form-product__subitem">
                    <p className="form-product__subtitle">Giá bán</p>
                    <div className="form-product__subwrapper">
                      <input
                        type="number"
                        name="price"
                        className="input-default form-product__input form-product__input--sub"
                        value={inputs.price}
                        onChange={(e) => handleOnChange(e)}
                      />
                      <span className="form-product__icon">₫</span>
                    </div>
                    <p className={formErrors.price ? "form-product__error show" : "form-product__error"}>{formErrors.price}</p>
                  </Grid>
                </Grid>
                <Grid item xs={12} className="form-product__item form-product__qty">
                  <h5 className="form-product__title">Quy cách đóng gói</h5>
                  <input
                    type="text"
                    name="packing"
                    className="input-default form-product__input"
                    value={inputs.packing}
                    onChange={(e) => handleOnChange(e)}
                  />
                  <p className={formErrors.packing ? "form-product__error show" : "form-product__error"}>{formErrors.packing}</p>
                </Grid>
                <Grid item xs={12} className="form-product__item form-product__categories">
                  <h5 className="form-product__title">Danh mục</h5>
                  <TreeView
                    aria-label="icon expansion"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    sx={{ flexGrow: 1, overflowY: 'auto' }}
                    className="custom-list"
                  >
                    <FormGroup
                      onChange={(e) => handleMultiCheckbox(e)}
                    >
                      {renderTree(objectCategories)}
                    </FormGroup>
                  </TreeView>
                  <p className={formErrors.categories ? "form-product__error show" : "form-product__error"}>{formErrors.categories}</p>
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
              label={inputs.isActive ? "Trực tuyến" : "Ngoại tuyến"}
              labelPlacement="start"
              name="isActive"
              checked={inputs.isActive}
              onChange={e => handleOnChange(e)}
              className="form-product__switch"
            />
          </div>
          <div>
            <button className="btn-default bot-nav__btn" type="submit">Lưu</button>
          </div>
        </div>
      </div>
    </form >
  );
};

export default FormProduct;