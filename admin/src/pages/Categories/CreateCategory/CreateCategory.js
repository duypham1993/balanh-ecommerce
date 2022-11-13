import FormCategory from "../../../components/FormCategory/FormCategory";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectObjectData, selectData, selectStatusSubmit } from "../../../redux/selectors";
import { uploadImage } from "../../../services/uploadFirebase";
import { addCategory, getCategories, resetStatusSubmit } from "../../../redux/slice/categorySlice";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const objectData = useSelector(selectObjectData);
  const categories = useSelector(selectData("category", "categories"));
  const statusSubmit = useSelector(selectStatusSubmit("category"));
  const [inputs, setInputs] = useState({
    name: "",
    desc: "",
    slug: "",
    parentId: "",
    isActive: false,
  });
  const [file, setFile] = useState({});
  const [tempURL, setTempURL] = useState("");
  const mess = {
    success: "Tạo danh mục thành công!",
    error: "Tạo danh mục thất bại!"
  }

  useEffect(() => {
    dispatch(getCategories());
    dispatch(resetStatusSubmit());
  }, [])

  useEffect(() => {
    if (Object.keys(objectData).length !== 0) {
      setInputs({
        ...inputs,
        parentId: objectData._id
      })
    }
  }, [objectData])

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
  };

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
      <SubmitAlert
        statusSubmit={statusSubmit}
        mess={mess}
      />
    </div>
  );
};

export default CreateCategory;