import FormCategory from "../../../components/FormCategory/FormCategory";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectData, selectObjectData, selectStatusSubmit } from "../../../redux/selectors";
import { uploadImage } from "../../../services/uploadFirebase";
import { addCategory, getCategories, resetStatusSubmit } from "../../../redux/slice/categorySlice";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const objectData = useSelector(selectObjectData);
  const statusSubmit = useSelector(selectStatusSubmit("category"));
  const [inputs, setInputs] = useState({
    name: "",
    desc: "",
    slug: "",
    parentId: "",
    isActive: false,
  });
  const errorApi = useSelector(selectData("category", "error"))
  const [file, setFile] = useState({});
  const mess = {
    success: "Tạo danh mục thành công!",
    error: errorApi.other
  }
  const imgURL = file.name ? URL.createObjectURL(file) : null;

  useEffect(() => {
    dispatch(getCategories());
    return () => dispatch(resetStatusSubmit());
  }, [])

  // set default root category as parent category
  useEffect(() => {
    if (Object.keys(objectData).length !== 0) {
      setInputs({
        ...inputs,
        parentId: objectData._id
      })
    }
  }, [objectData]);

  // after add category success clear input 
  useEffect(() => {
    if (statusSubmit === 'fulfilled') {
      setInputs({
        name: "",
        desc: "",
        slug: "",
        parentId: objectData._id,
        isActive: false,
      });
      setFile({});
    }
  }, [statusSubmit])

  const handleOnChange = (e) => {
    if (e.target.type === "checkbox") {
      setInputs(prev => ({ ...prev, [e.target.name]: e.target.checked }));
    } else {
      setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const handleDelImg = () => {
    setFile({});
  }

  const handleOnSubmit = async () => {
    const imgURl = await uploadImage(file);
    const category = {
      ...inputs,
      img: imgURl,
    }
    dispatch(addCategory(category));
  };

  return (
    <div className="add-category">
      <FormCategory
        objectData={objectData}
        inputs={inputs}
        imgURL={imgURL}
        handleDelImg={handleDelImg}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        handleFile={handleFile}
      />
      <SubmitAlert
        statusSubmit={statusSubmit}
        mess={mess}
      />
    </div>
  );
};

export default CreateCategory;