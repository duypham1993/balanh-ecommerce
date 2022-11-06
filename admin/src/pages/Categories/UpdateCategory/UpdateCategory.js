import FormCategory from "../../../components/FormCategory/FormCategory";
import "./update-category.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectCategories, selectObjectData, selectStatusSubmit } from "../../../redux/selectors";
import { uploadImage, delImgFireBase } from "../../../services/uploadFirebase";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { getCategories, updateCategory, resetStatusSubmit } from "../../../redux/slice/categorySlice";

const UpdateCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
    desc: '',
    slug: '',
    isActive: false
  });
  const [file, setFile] = useState({});
  const [tempURL, setTempURL] = useState("");
  const categories = useSelector(selectCategories);
  const category = categories.filter(item => item._id === id)[0];
  const objectData = useSelector(selectObjectData);
  const statusSubmit = useSelector(selectStatusSubmit);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (category) {
      setInputs({
        name: category.name,
        desc: category.desc,
        slug: category.slug,
        isActive: category.isActive,
        parentId: category.parentId,
      });
      setTempURL(category.img);
    }
  }, [category])

  useEffect(() => {
    statusSubmit === "fulfilled" && setOpen(true);
    dispatch(resetStatusSubmit());
  }, [statusSubmit])

  const handleOnChange = (e) => {
    if (e.target.type === "checkbox") {
      setInputs({ ...inputs, [e.target.name]: e.target.checked });
    } else {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
  };

  const handleOnSubmit = async () => {
    let imgURL;

    if (tempURL) {
      imgURL = tempURL;
    } else {
      imgURL = await uploadImage(file);
      await delImgFireBase(category.img);
    }
    const updatedCategory = {
      ...inputs,
      img: imgURL,
    };

    dispatch(updateCategory({ id, updatedCategory }));
  };

  const handleCancel = () => {
    navigate("/categories");
  }
  return (
    <div className="update-category">
      <FormCategory
        categories={categories}
        category={category}
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
          Cập nhật sản phẩm thành công!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UpdateCategory;