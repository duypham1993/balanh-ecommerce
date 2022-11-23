import { useState } from "react";
import { Grid, Switch, Button, RadioGroup } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CustomTreeItem from "./CustomTreeItem/CustomTreeItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectData } from "../../redux/selectors";
import { resetErrorSlug } from "../../redux/slice/categorySlice";

const FormCategory = (props) => {
  const { objectData, inputs, imgURL, handleOnSubmit, handleOnChange, handleFile, handleDelImg } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const errorApi = useSelector(selectData("category", "error"));
  const handleChange = (e) => {
    const { value, name } = e.target;
    handleOnChange(e);

    if (value) {
      setFormErrors({
        ...formErrors, [name]: "",
      })
    }
  }

  const validate = (inputs) => {
    const errors = {};
    const formatSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/g;

    if (!inputs.name.trim()) {
      errors.name = "Vui lòng điền vào mục này!";
    }

    if (!inputs.desc.trim()) {
      errors.desc = "Vui lòng điền vào mục này!";
    }

    if (!formatSlug.test(inputs.slug)) {
      errors.slug = "Đường dẫn không hợp lệ!";
    }

    if (!inputs.slug.trim()) {
      errors.slug = "Vui lòng điền vào mục này!";
    }

    if (!imgURL) {
      errors.img = "Vui lòng upload ảnh bìa!";
    }

    return errors;
  }

  const submitFrom = (e) => {
    e.preventDefault();
    dispatch(resetErrorSlug());
    setFormErrors(validate(inputs));
    Object.keys(validate(inputs)).length === 0 && handleOnSubmit();
  }

  // back to categories
  const handleCancel = () => {
    return navigate("/categories");
  };


  const renderTree = (nodes) => (
    <CustomTreeItem
      key={nodes._id}
      nodeId={nodes._id}
      label={nodes.name}
      ContentProps={{ value: nodes._id, parentId: nodes.parentId }}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </CustomTreeItem>
  );
  return (
    <form className="form-default" onSubmit={(e) => submitFrom(e)}>
      <Grid container>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Tên danh mục</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            <input
              type="text"
              className={"input-default form-default__input"}
              name="name"
              value={inputs.name}
              onChange={e => handleChange(e)}
            />
            <p className={formErrors.name ? "form-default__error show" : "form-default__error"}>{formErrors.name}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Mô tả</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            <textarea
              type="text"
              className={"input-default form-default__input"}
              name="desc"
              value={inputs.desc}
              onChange={(e) => handleChange(e)}
            />
            <p className={formErrors.desc ? "form-default__error show" : "form-default__error"}>{formErrors.desc}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Danh mục</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            {inputs.parentId &&
              <TreeView
                aria-label="icon expansion"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ flexGrow: 1, overflowY: 'auto' }}
                className="custom-list"
              >
                <RadioGroup
                  name="parentId"
                  value={inputs.parentId}
                  onChange={(e) => handleOnChange(e)}
                >
                  {renderTree(objectData)}
                </RadioGroup>
              </TreeView>
            }
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Ảnh bìa danh mục</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            {imgURL ?
              <>
                <div className="form-default__img-preview">
                  <img src={imgURL} alt="category-img" />
                  <Button variant="outlined" startIcon={<DeleteIcon />} color="error" onClick={() => handleDelImg()}>
                    Xoá
                  </Button>
                </div>
              </> :
              <>
                <input
                  type="file"
                  accept="image/*"
                  className={"input-default form-default__input"}
                  name="img"
                  onChange={(e) => handleFile(e)}
                />
                <p className="form-default__desc">Kích thước ảnh khuyến nghị 1200x400px</p>
                <p className={formErrors.img ? "form-default__error show" : "form-default__error"}>{formErrors.img}</p>
              </>
            }
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Đường dẫn danh mục</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            <input
              type="text"
              name="slug"
              className="input-default form-default__input"
              value={inputs.slug}
              onChange={(e) => handleChange(e)}
              placeholder="duong-dan-1"
            />
            <p className="form-default__desc">Viết liền không dấu, chỉ chấp nhận chữ cái, số và dấu gạch ngang "-"</p>
            <p className={formErrors.slug || errorApi.slug ? "form-default__error show" : "form-default__error"}>{formErrors.slug || errorApi.slug}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={4} className="form-default__label">
            <label>Hiển thị</label>
          </Grid>
          <Grid item xs={6} className="form-default__content">
            <Switch
              name="isActive"
              className="form-default__input"
              checked={inputs.isActive}
              onChange={(e) => handleOnChange(e)}
            />
          </Grid>
        </Grid>
      </Grid>
      <div className="flex-bw-center form-default__bot-nav">
        <button className="btn-default btn-default--del" onClick={() => handleCancel()}>Quay lại</button>
        <button className="btn-default" type="submit" >Lưu</button>
      </div>
    </form >
  )
};

export default FormCategory;