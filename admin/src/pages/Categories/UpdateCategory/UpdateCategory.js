import FormCategory from "../../../components/FormCategory/FormCategory";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectData, selectObjectData, selectStatusSubmit } from "../../../redux/selectors";
import { uploadImage, delImgFireBase } from "../../../services/uploadFirebase";
import { getCategories, updateCategory, resetStatusSubmit } from "../../../redux/slice/categorySlice";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import ErrorFetching from "../../../components/ErrorFetching/ErrorFetching";

const UpdateCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: '',
    desc: '',
    slug: '',
    isActive: false
  });
  const [file, setFile] = useState({});
  const [tempURL, setTempURL] = useState("");
  const categories = useSelector(selectData("category", "categories"));
  const category = categories.filter(item => item._id === id)[0];
  const objectData = useSelector(selectObjectData);
  const statusSubmit = useSelector(selectStatusSubmit("category"));
  const errorApi = useSelector(selectData("category", "error"))
  const mess = {
    success: "Cập nhật danh mục thành công!",
    error: errorApi.other
  };
  const statusFetching = useSelector(selectData("category", "isFetching"));
  const imgURL = tempURL ? tempURL : file.name ? URL.createObjectURL(file) : null;

  useEffect(() => {
    dispatch(getCategories());
    return () => dispatch(resetStatusSubmit());
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

  const handleOnChange = (e) => {
    const { type, name, checked, value } = e.target;
    if (type === "checkbox") {
      setInputs({ ...inputs, [name]: checked });
    } else {
      setInputs({ ...inputs, [name]: value });
    }
  };

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const handleDelImg = () => {
    setTempURL("");
    setFile({});
  }

  const handleOnSubmit = async () => {
    let img;

    if (tempURL) {
      img = tempURL;
    } else {
      img = await uploadImage(file);
      await delImgFireBase(category.img);
    }
    const updatedCategory = {
      ...inputs,
      img: img,
    };
    await dispatch(updateCategory({ id, updatedCategory }));
  };

  return (
    <>
      {statusFetching === "rejected" ?
        <ErrorFetching /> :
        <>
          <div className="update-category">
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
        </>
      }
    </>
  );
};

export default UpdateCategory;