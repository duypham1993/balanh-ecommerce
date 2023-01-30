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
import { useSelector } from "react-redux";
import CustomTreeItem from "./CustomTreeItem/CustomTreeItem";

function TabPanel({ children, value, index, ...other }) {
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

const FormProduct = ({ formProduct, handleDelImgFirebase }) => {
  const [valueTabs, setValueTabs] = useState(0);
  const { treeCategories } = useSelector(state => state.category);
  const idRootCategory = treeCategories._id;
  const { origin } = useSelector(state => state.origin);
  const { suppliers } = useSelector(state => state.supplier)
  useEffect(() => {
    renderTree(treeCategories)
  }, [treeCategories]);

  const handleDelImgLocal = (index) => {
    const tempFile = formProduct.values.files.filter((item, i) => i !== index);
    formProduct.setFieldValue('files', tempFile);
  };

  const handleMultiCheckbox = (e) => {
    const { checked, value } = e.target;
    checked ?
      formProduct.setFieldValue('categories', [...formProduct.values.categories, value])
      :
      formProduct.setFieldValue('categories', formProduct.values.categories.filter(item => item !== value))
  }

  const handleChangeTabs = (e, newValue) => {
    setValueTabs(newValue);
  }

  const renderTree = (nodes) => {
    // set checked for categories
    let check = false;
    for (let i = 0; i < formProduct.values.categories?.length; i++) {
      if (formProduct.values.categories[i] === nodes._id) {
        check = true;
      }
    }
    return (
      <CustomTreeItem
        key={nodes._id}
        nodeId={nodes._id || "temp"}
        label={nodes.name}
        ContentProps={{ idRootCategory: idRootCategory, value: nodes._id, check: check }}
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </CustomTreeItem>
    )
  };

  return (
    <form className="form-product" onSubmit={formProduct.handleSubmit}>
      <div className="form-product__item form-product__item--title">
        <input type="text" name="name" placeholder="Tên sản phẩm" className="input-default form-product__input form-product__input--title" value={formProduct.values.name} onChange={formProduct.handleChange} onBlur={formProduct.handleBlur} />
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
                  {formProduct.values.files?.length || formProduct.values.imgsFirebase?.length ?
                    <div className="form-product__wrapper-preview" >
                      <label htmlFor="files" className="form-product__item-preview form-product__upload-preview">
                        <AddCircleOutlineIcon className="form-product__upload-icon" />
                      </label>
                      {formProduct.values.imgsFirebase?.map((item, index) => {
                        return (
                          <div className="form-product__item-preview" key={index}>
                            <img src={item} alt={"imgage " + index} className="form-product__imgs-preview" />
                            <HighlightOffTwoToneIcon className="form-product__del-img" onClick={() => handleDelImgFirebase(item)} />
                          </div>
                        )
                      })}
                      {formProduct.values.files?.map((item, index) => {
                        return (
                          <div className="form-product__item-preview" key={index}>
                            <img src={URL.createObjectURL(item)} alt={"imgage " + index} className="form-product__imgs-preview" />
                            <HighlightOffTwoToneIcon className="form-product__del-img" onClick={() => handleDelImgLocal(index)} />
                          </div>
                        )
                      })}
                    </div>
                    :
                    <label htmlFor="files" className="form-product__upload-desc" >
                      <AddAPhotoIcon className="form-product__upload-icon" />
                      <span>Tải hình ảnh ở đây</span>
                      <span><strong>Kích thước khuyến cáo là 800x800px cho ảnh mặc định</strong></span>
                      <span><em>Định dạng JPG, GIF hoặc PNG.</em></span>
                    </label>
                  }

                  <input
                    hidden
                    type="file"
                    id="files"
                    name="files"
                    multiple
                    accept="image/*"
                    onChange={(e) => formProduct.setFieldValue('files', [...formProduct.values.files, ...e.currentTarget.files])}
                  />
                  <p className={formProduct.touched.files && formProduct.errors.files && !formProduct.values.imgsFirebase?.length ? "form-product__error show" : "form-product__error"}>{formProduct.errors.files}</p>
                </Grid>
                <Grid item xs={12} className="form-product__item form-product__item--desc">
                  <h5 className="form-product__title">Mô tả sản phẩm</h5>
                  <textarea
                    name="desc"
                    placeholder="Mô tả sơ lược sản phẩm"
                    value={formProduct.values.desc}
                    onChange={formProduct.handleChange}
                    onBlur={formProduct.handleBlur}
                  />
                  <p className={formProduct.touched.desc && formProduct.errors.desc ? "form-product__error show" : "form-product__error"}>{formProduct.errors.desc}</p>

                </Grid>
                <Grid container item xs={12} >
                  <Grid item xs={12} lg={6} className="form-product__item form-product__item--origin">
                    <h5 className="form-product__title">Xuất xứ</h5>

                    <Autocomplete
                      className="form-product__autocomplete"
                      options={origin}
                      getOptionLabel={option => {
                        if (option.hasOwnProperty('name')) {
                          return option.name;
                        }
                        return option;
                      }}
                      onChange={(e, value) => value ? formProduct.setFieldValue('origin', value.name) : formProduct.setFieldValue('origin', '')}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      onBlur={formProduct.handleBlur}
                      sx={{ width: 300 }}
                      value={formProduct.values.origin}
                      renderInput={(params) => <TextField name="origin" value={formProduct.values.origin} {...params} />}
                    />

                    <p className={formProduct.touched.origin && formProduct.errors.origin ? "form-product__error show" : "form-product__error"}>{formProduct.errors.origin}</p>
                  </Grid>
                  <Grid item xs={12} lg={6} className="form-product__item form-product__item--origin">
                    <h5 className="form-product__title">Nhà cung cấp</h5>
                    <Autocomplete
                      className="form-product__autocomplete"
                      options={suppliers}
                      getOptionLabel={option => {
                        if (option.hasOwnProperty('name')) {
                          return option.name;
                        }
                        return option;
                      }}
                      onChange={(e, value) => value ? formProduct.setFieldValue('supplier', value.name) : formProduct.setFieldValue('supplier', '')}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      onBlur={formProduct.handleBlur}
                      sx={{ width: 300 }}
                      value={formProduct.values.supplier}
                      renderInput={(params) => <TextField name="supplier"  {...params} />}
                    />
                    <p className={formProduct.touched.supplier && formProduct.errors.supplier ? "form-product__error show" : "form-product__error"}>{formProduct.errors.supplier}</p>
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
                    value={formProduct.values.sku}
                    onChange={formProduct.handleChange}
                    onBlur={formProduct.handleBlur}
                  />
                  <p className={formProduct.touched.sku && formProduct.errors.sku ? "form-product__error show" : "form-product__error"}>{formProduct.errors.sku}</p>
                </Grid>
                <Grid item xs={12} className="form-product__item form-product__qty">
                  <h5 className="form-product__title">Số lượng</h5>
                  <input
                    type="number"
                    name="qty"
                    className="input-default form-product__input"
                    value={formProduct.values.qty}
                    onChange={formProduct.handleChange}
                  />

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
                        value={formProduct.values.costPrice}
                        onChange={formProduct.handleChange}
                        onBlur={formProduct.handleBlur}
                      />
                      <span className="form-product__icon">₫</span>
                    </div>
                    <p className={formProduct.touched.costPrice && formProduct.errors.costPrice ? "form-product__error show" : "form-product__error"}>{formProduct.errors.costPrice}</p>
                  </Grid>
                  <Grid item xs={12} md={6} className="form-product__item form-product__subitem">
                    <p className="form-product__subtitle">Giá bán</p>
                    <div className="form-product__subwrapper">
                      <input
                        type="number"
                        name="price"
                        className="input-default form-product__input form-product__input--sub"
                        value={formProduct.values.price}
                        onChange={formProduct.handleChange}
                        onBlur={formProduct.handleBlur}
                      />
                      <span className="form-product__icon">₫</span>
                    </div>
                    <p className={formProduct.errors.price && formProduct.touched.price ? "form-product__error show" : "form-product__error"}>{formProduct.errors.price}</p>
                  </Grid>
                </Grid>
                <Grid item xs={12} className="form-product__item form-product__qty">
                  <h5 className="form-product__title">Quy cách đóng gói</h5>
                  <input
                    type="text"
                    name="packing"
                    className="input-default form-product__input"
                    value={formProduct.values.packing}
                    onChange={formProduct.handleChange}
                    onBlur={formProduct.handleBlur}
                  />
                  <p className={formProduct.touched.packing && formProduct.errors.packing ? "form-product__error show" : "form-product__error"}>{formProduct.errors.packing}</p>
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
                      {renderTree(treeCategories)}
                    </FormGroup>
                  </TreeView>
                  <p className={formProduct.touched.categories && formProduct.errors.categories ? "form-product__error show" : "form-product__error"}>{formProduct.errors.categories}</p>
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
              label={formProduct.values.isActive ? "Trực tuyến" : "Ngoại tuyến"}
              labelPlacement="start"
              name="isActive"
              checked={formProduct.values.isActive}
              onChange={formProduct.handleChange}
              className="form-product__switch"
            />
          </div>
          <div>
            {formProduct.isSubmitting ?
              <button className="btn-df bot-nav__btn cursor-disable" type="submit" disabled>Lưu</button> :
              <button className="btn-df bot-nav__btn" type="submit">Lưu</button>
            }

          </div>
        </div>
      </div>
    </form >
  );
};

export default FormProduct;