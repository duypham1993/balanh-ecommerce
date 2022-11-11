import FormCategory from "../../../components/FormCategory/FormCategory";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCategories, selectStatusSubmit, selectObjectData } from "../../../redux/selectors";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { uploadImage } from "../../../services/uploadFirebase";
import { addCategory, getCategories, resetStatusSubmit } from "../../../redux/slice/categorySlice";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const objectData = useSelector(selectObjectData);
  const categories = useSelector(selectCategories)
  const statusSubmit = useSelector(selectStatusSubmit);

  const [inputs, setInputs] = useState({
    name: "",
    desc: "",
    slug: "",
    parentId: "",
    isActive: false,
  });
  const [file, setFile] = useState({});
  const [tempURL, setTempURL] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [])

  useEffect(() => {
    if (Object.keys(objectData).length !== 0) {
      setInputs({
        ...inputs,
        parentId: objectData._id
      })
    }
  }, [objectData])

  useEffect(() => {
    statusSubmit === "fulfilled" && setOpen(true);
    dispatch(resetStatusSubmit());
  }, [statusSubmit])

  const handleOnChange = (e) => {
    if (e.target.type === "checkbox") {
      setInputs(prev => ({ ...prev, [e.target.name]: e.target.checked }));
    } else {
      setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };



  const handleOnSubmit = async () => {
    const imgURl = await uploadImage(file);
    const category = {
      ...inputs,
      img: imgURl,
    }
    dispatch(addCategory(category));
  };

  // back to categories
  const handleCancel = () => {
    return navigate("/categories");
  }

  return (
    <div className="add-category">
      <FormCategory
        categories={categories}
        objectData={objectData}
        file={file}
        setFile={setFile}
        tempURL={tempURL}
        setTempURL={setTempURL}
        inputs={inputs}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        handleCancel={handleCancel}
      />

      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
          Tạo sản phẩm thành công!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateCategory;