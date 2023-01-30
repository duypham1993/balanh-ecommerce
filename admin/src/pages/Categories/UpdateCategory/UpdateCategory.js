import FormCategory from "../../../components/FormCategory/FormCategory";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage, delImgFireBase } from "../../../utils/uploadFirebase";
import { checkSlug, getCategories, updateCategory } from "../../../redux/slice/categorySlice";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import { useFormik } from "formik";
import { UPDATE_CATEGORY_SUCCESS, VALIDATE_FORM_CATEGORY } from "../../../shared/constants";
import Loading from "../../../components/Loading/Loading";

const UpdateCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { categories, isLoading } = useSelector(state => state.category);
  const category = categories?.filter(item => item._id === id)[0];
  const [mess, setMess] = useState({});

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const formCategory = useFormik({
    initialValues: {
      name: category?.name || "",
      slug: category?.slug || "",
      desc: category?.desc || "",
      imgFirebase: category?.img || "",
      imgLocal: "",
      parentId: category?.parentId || "",
      isActive: category?.isActive || false
    },
    enableReinitialize: true,
    validationSchema: VALIDATE_FORM_CATEGORY,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(checkSlug({ slug: values.slug, _id: id })).unwrap();
        let img;
        if (values.imgFirebase) {
          img = values.imgFirebase;
        } else {
          img = await uploadImage(values.imgLocal);
          await delImgFireBase(category.img);
        }
        const updatedCategory = {
          name: values.name,
          slug: values.slug,
          desc: values.desc,
          img: img,
          parentId: values.parentId,
          isActive: values.isActive
        };
        await dispatch(updateCategory({ updatedCategory: updatedCategory, id: id })).unwrap();
        setSubmitting(false);
        setMess({ success: UPDATE_CATEGORY_SUCCESS });
      } catch (error) {
        setSubmitting(false);
        if (error.slug) formCategory.errors.slug = error.slug;
        error.other && setMess({ error: error.other });
      }
    }
  });

  return (
    <>
      {isLoading ?
        <Loading /> :
        <>
          <div className="update-category">
            <FormCategory
              formCategory={formCategory}
            />
            <SubmitAlert
              mess={mess}
            />
          </div>
        </>
      }
    </>
  );
};

export default UpdateCategory;