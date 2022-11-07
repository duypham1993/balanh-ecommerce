import "./form-category.scss";
import { useState } from "react";
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CustomTreeItem from "../CustomTreeItem/CustomTreeItem";

const FormCategory = (props) => {
  const [formErrors, setFormErrors] = useState({});
  const imgURL = props.tempURL ? props.tempURL : props.file.name ? URL.createObjectURL(props.file) : null;

  const handleDelImg = () => {
    props.setTempURL("");
    props.setFile({});
  }

  const handleChange = (e) => {
    const { value, name } = e.target;

    props.handleOnChange(e);

    if (value) {
      setFormErrors({
        ...formErrors, [name]: "",
      })
    }
  }

  const validate = (inputs) => {
    const errors = {};
    const formatSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/g;

    if (!inputs.name || !inputs.name.trim()) {
      errors.name = "Vui lòng điền vào mục này!";
    }

    if (!inputs.desc || !inputs.desc.trim()) {
      errors.desc = "Vui lòng điền vào mục này!";
    }

    if (!formatSlug.test(inputs.slug)) {
      errors.slug = "Đường dẫn không hợp lệ!";
    }

    if (!inputs.slug || !inputs.slug.trim()) {
      errors.slug = "Vui lòng điền vào mục này!";
    }

    props.categories.map(item => {
      if (props.category) {
        if (props.category._id !== item._id && item.slug === inputs.slug) {
          return errors.slug = "Đường dẫn đã tồn tại!"
        }
      } else {
        if (item.slug === inputs.slug) {
          return errors.slug = "Đường dẫn đã tồn tại!"
        }
      }
    })

    if (!imgURL) {
      errors.img = "Vui lòng upload ảnh bìa!";
    }

    return errors;
  }

  const submitFrom = (e) => {
    e.preventDefault();
    setFormErrors(validate(props.inputs));
    Object.keys(validate(props.inputs)).length === 0 && props.handleOnSubmit();
  }

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
    <form className="form-category" onSubmit={(e) => submitFrom(e)}>
      <Grid container>
        <Grid container item spacing={3} className="form-category__group">
          <Grid item xs={4} className="form-category__control">
            <label>Tên danh mục</label>
          </Grid>
          <Grid item xs={6} className="form-category__input-group">
            <input
              type="text"
              className={"input-default form-category__input"}
              name="name"
              value={props.inputs.name}
              onChange={e => handleChange(e)}
            />
            <p className={formErrors.name ? "form-category__error show" : "form-category__error"}>{formErrors.name}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-category__group">
          <Grid item xs={4} className="form-category__control">
            <label>Mô tả</label>
          </Grid>
          <Grid item xs={6} className="form-category__input-group">
            <textarea
              type="text"
              className={"input-default form-category__input"}
              name="desc"
              value={props.inputs.desc}
              onChange={(e) => handleChange(e)}
            />
            <p className={formErrors.desc ? "form-category__error show" : "form-category__error"}>{formErrors.desc}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-category__group">
          <Grid item xs={4} className="form-category__control">
            <label>Danh mục</label>
          </Grid>
          <Grid item xs={6} className="form-category__input-group">
            {props.inputs.parentId &&
              <TreeView
                aria-label="icon expansion"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ flexGrow: 1, overflowY: 'auto' }}
                className="custom-list"
              >
                <RadioGroup
                  name="parentId"
                  value={props.inputs.parentId}
                  onChange={(e) => props.handleOnChange(e)}
                >
                  {renderTree(props.objectData)}
                </RadioGroup>
              </TreeView>
            }
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-category__group">
          <Grid item xs={4} className="form-category__control">
            <label>Ảnh bìa danh mục</label>
          </Grid>
          <Grid item xs={6} className="form-category__input-group">
            {imgURL ?
              <>
                <div className="form-category__img-preview">
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
                  className={"input-default form-category__input"}
                  name="img"
                  onChange={(e) => props.setFile(e.target.files[0])}
                />
                <p className="form-category__desc">Kích thước ảnh khuyến nghị 1200x400px</p>
                <p className={formErrors.img ? "form-category__error show" : "form-category__error"}>{formErrors.img}</p>
              </>
            }
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-category__group">
          <Grid item xs={4} className="form-category__control">
            <label>Đường dẫn danh mục</label>
          </Grid>
          <Grid item xs={6} className="form-category__input-group">
            <input
              type="text"
              name="slug"
              className="input-default form-category__input"
              value={props.inputs.slug}
              onChange={(e) => handleChange(e)}
              placeholder="duong-dan-1"
            />
            <p className="form-category__desc">Viết liền không dấu, chỉ chấp nhận chữ cái, số và dấu gạch ngang "-"</p>
            <p className={formErrors.slug ? "form-category__error show" : "form-category__error"}>{formErrors.slug}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-category__group">
          <Grid item xs={4} className="form-category__control">
            <label>Hiển thị</label>
          </Grid>
          <Grid item xs={6} className="form-category__input-group">
            <Switch
              name="isActive"
              className="form-category__input"
              checked={props.inputs.isActive}
              onChange={(e) => props.handleOnChange(e)}
            />
          </Grid>
        </Grid>
      </Grid>
      <div className="flex-bw-center form-category__bot-nav">
        <button className="btn-default btn-default--del" onClick={() => props.handleCancel()}>Quay lại</button>
        <button className="btn-default" type="submit" >Lưu</button>
      </div>
    </form >
  )
};

export default FormCategory;