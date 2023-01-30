import FormCategory from "../../../components/FormCategory/FormCategory";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../../utils/uploadFirebase";
import { addCategory, checkSlug, getCategories } from "../../../redux/slice/categorySlice";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import { useFormik } from "formik";
import { CREATE_CATEGORY_SUCCESS, VALIDATE_FORM_CATEGORY } from "../../../shared/constants";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const [mess, setMess] = useState({});

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const formCategory = useFormik({
    initialValues: {
      name: "",
      slug: "",
      desc: "",
      imgFirebase: "",
      imgLocal: "",
      parentId: "",
      isActive: false
    },
    validationSchema: VALIDATE_FORM_CATEGORY,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(checkSlug({ slug: values.slug })).unwrap();
        const imgURl = await uploadImage(values.imgLocal);
        const category = {
          name: values.name,
          slug: values.slug,
          desc: values.desc,
          img: imgURl,
          parentId: values.parentId,
          isActive: values.isActive
        }
        await dispatch(addCategory(category)).unwrap();
        setSubmitting(false);
        setMess({ success: CREATE_CATEGORY_SUCCESS });
      } catch (error) {
        setSubmitting(false);
        if (error.slug) formCategory.errors.slug = error.slug;
        error.other && setMess({ error: error.other });
      }
    }
  });

  return (
    <div className="add-category">
      <FormCategory
        formCategory={formCategory}
      />
      <SubmitAlert
        mess={mess}
      />
    </div>
  );
};

export default CreateCategory;