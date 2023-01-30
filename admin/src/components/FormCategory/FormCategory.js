import { Grid, Switch, Button, RadioGroup } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CustomTreeItem from "./CustomTreeItem/CustomTreeItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const FormCategory = ({ formCategory }) => {
  const navigate = useNavigate();
  const { treeCategories } = useSelector(state => state.category);

  const imgURL = formCategory.values.imgFirebase ? formCategory.values.imgFirebase : formCategory.values.imgLocal ? URL.createObjectURL(formCategory.values.imgLocal) : null;

  const handleDelImg = () => {
    formCategory.setFieldValue('imgFirebase', '');
    formCategory.setFieldValue('imgLocal', '');
  };

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
    <form className="form-default" onSubmit={formCategory.handleSubmit}>
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
              value={formCategory.values.name}
              onChange={formCategory.handleChange}
              onBlur={formCategory.handleBlur}
            />
            <p className={formCategory.touched.name && formCategory.errors.name ? "form-default__error show" : "form-default__error"}>{formCategory.errors.name}</p>
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
              value={formCategory.values.desc}
              onChange={formCategory.handleChange}
              onBlur={formCategory.handleBlur}
            />
            <p className={formCategory.touched.desc && formCategory.errors.desc ? "form-default__error show" : "form-default__error"}>{formCategory.errors.desc}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Danh mục</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            {Object.keys(treeCategories).length ?
              <TreeView
                aria-label="icon expansion"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ flexGrow: 1, overflowY: 'auto' }}
                className="custom-list"
              >
                <RadioGroup
                  name="parentId"
                  value={formCategory.values.parentId}
                  onChange={formCategory.handleChange}
                >
                  {renderTree(treeCategories)}
                </RadioGroup>
              </TreeView> :
              <></>
            }
            <p className={formCategory.touched.parentId && formCategory.errors.parentId ? "form-default__error show" : "form-default__error"}>{formCategory.errors.parentId}</p>
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
                  name="imgLocal"
                  onChange={(e) => formCategory.setFieldValue('imgLocal', e.currentTarget.files[0])}
                  onBlur={formCategory.handleBlur}
                />
                <p className="form-default__desc">Kích thước ảnh khuyến nghị 1200x400px</p>
              </>
            }
            <p className={formCategory.touched.imgLocal && formCategory.errors.imgLocal ? "form-default__error show" : "form-default__error"}>{formCategory.errors.imgLocal}</p>
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
              value={formCategory.values.slug}
              onChange={formCategory.handleChange}
              onBlur={formCategory.handleBlur}
              placeholder="duong-dan-1"
            />
            <p className="form-default__desc">Viết liền không dấu, chỉ chấp nhận chữ cái, số và dấu gạch ngang "-"</p>
            <p className={formCategory.touched.slug && formCategory.errors.slug ? "form-default__error show" : "form-default__error"}>{formCategory.errors.slug}</p>
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
              checked={formCategory.values.isActive}
              onChange={formCategory.handleChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <div className="flex-bw-center form-default__bot-nav">
        <button className="btn-df btn-df--del" onClick={() => handleCancel()}>Quay lại</button>
        {formCategory.isSubmitting ?
          <button className="btn-df cursor-disable" type="submit" disabled >Lưu</button> :
          <button className="btn-df" type="submit" >Lưu</button>
        }

      </div>
    </form >
  )
};

export default FormCategory;