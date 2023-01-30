import FormProduct from "../../../components/FormProduct/FormProduct";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../redux/slice/productSlice";
import { uploadImage } from "../../../utils/uploadFirebase";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import { getCategories } from "../../../redux/slice/categorySlice";
import { getSuppliers } from "../../../redux/slice/supplierSlice";
import { getOrigin } from "../../../redux/slice/originSlice";
import { useFormik } from "formik";
import { CREATE_PRODUCT_SUCCESS, VALIDATE_FORM_PRODUCT } from "../../../shared/constants";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { treeCategories } = useSelector(state => state.category);
  const { origin } = useSelector(state => state.origin);
  const { suppliers } = useSelector(state => state.supplier);
  const [mess, setMess] = useState({});

  useEffect(() => {
    (async () => {
      await dispatch(getCategories());
      await dispatch(getSuppliers());
      await dispatch(getOrigin());
    })();
  }, []);

  const formProduct = useFormik({
    initialValues: {
      name: "",
      desc: "",
      sku: "",
      costPrice: "",
      price: "",
      categories: [treeCategories._id],
      origin: "",
      supplier: "",
      qty: 0,
      packing: "",
      imgsFirebase: [],
      files: [],
      isActive: false
    },
    enableReinitialize: true,
    validationSchema: VALIDATE_FORM_PRODUCT,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const imgs = await Promise.all(values.files.map((item) => uploadImage(item)));
      const productOrigin = origin?.filter(item => item.name === values.origin)[0];
      const productSupplier = suppliers?.filter(item => item.name === values.supplier)[0];

      const newProduct = {
        ...values,
        supplier: productSupplier,
        origin: productOrigin,
        qty: parseInt(values.qty),
        costPrice: parseInt(values.costPrice),
        price: parseInt(values.price),
        imgs: imgs
      };
      dispatch(addProduct(newProduct))
        .unwrap()
        .then(() => {
          setSubmitting(false);
          setMess({ success: CREATE_PRODUCT_SUCCESS });
          resetForm();
        })
        .catch((error) => {
          setSubmitting(false);
          if (error.sku) formProduct.errors.sku = error.sku;
          error.other && setMess({ error: error.other });
        })
    }
  });

  return (
    <div className="create-product">
      <FormProduct
        formProduct={formProduct}
      />
      <SubmitAlert
        mess={mess}
      />
    </div>
  );
};

export default AddProduct;