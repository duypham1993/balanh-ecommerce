import "./add-origin.scss";
import { Grid } from "@mui/material";

const AddOrigin = ({ handleOnSubmit, name, setName, formError }) => {
  return (
    <form onSubmit={(e) => handleOnSubmit(e)}>
      <Grid container className="add-origin">
        <Grid item className="add-origin__title">
          Xuất xứ
        </Grid>
        <Grid item xs={9} md={3} className="add-origin__content">
          <input type="text" className="input-default" name="name" vlaue={name} onChange={(e) => setName(e.target.value)} />
          <button className="btn-default">Thêm</button>
          <p className="add-origin__error">{formError}</p>
        </Grid>
      </Grid>
    </form>
  )
}

export default AddOrigin;