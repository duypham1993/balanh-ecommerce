import "./add-origin.scss";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addOrigin } from "../../../redux/slice/originSlice";
import { CREATE_ORIGIN_SUCCESS } from "../../../shared/constants";

const AddOrigin = ({ setMess }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    formError && setFormError("");
  }, [name]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newOrigin = {
      name: name
    }

    name.trim() && dispatch(addOrigin(newOrigin))
      .unwrap()
      .then(() => {
        setMess({ success: CREATE_ORIGIN_SUCCESS });
        setName("");
      })
      .catch((error) => {
        error.name && setFormError(error.name);
        error.other && setMess({ error: error.other });
      })
  }
  return (
    <form onSubmit={(e) => handleOnSubmit(e)}>
      <Grid container className="add-origin">
        <Grid item className="add-origin__title">
          Xuất xứ
        </Grid>
        <Grid item xs={9} md={3} className="add-origin__content">
          <input type="text" className="input-default" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          <button className="btn-df">Thêm</button>
          <p className="add-origin__error">{formError}</p>
        </Grid>
      </Grid>
    </form>
  )
}

export default AddOrigin;