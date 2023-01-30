import FormProduct from "../../../components/FormProduct/FormProduct";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentProduct, updateProduct } from "../../../redux/slice/productSlice";
import { delImgFireBase, uploadImage } from "../../../utils/uploadFirebase";
import { useParams } from "react-router-dom";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import { getCategories } from "../../../redux/slice/categorySlice";
import { getSuppliers } from "../../../redux/slice/supplierSlice";
import { getOrigin } from "../../../redux/slice/originSlice";
import { useFormik } from "formik";
import { UPDATE_PRODUCT_SUCCESS, VALIDATE_FORM_PRODUCT } from "../../../shared/constants";
import Loading from "../../../components/Loading/Loading";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [mess, setMess] = useState({});
  const [arrDelImg, setArrDelImg] = useState([]);
  const { isLoading, currentProduct } = useSelector(state => state.product);
  const { origin } = useSelector(state => state.origin);
  const { suppliers } = useSelector(state => state.supplier);

  useEffect(() => {
    (async () => {
      await dispatch(getCurrentProduct(id));
      await dispatch(getCategories());
      await dispatch(getSuppliers());
      await dispatch(getOrigin());
    })();
  }, [id]);

  const formProduct = useFormik({
    initialValues: {
      name: currentProduct.name || "",
      desc: currentProduct.desc || "",
      sku: currentProduct.sku || "",
      costPrice: currentProduct.costPrice || "",
      price: currentProduct.price || "",
      categories: currentProduct.categories || [],
      origin: currentProduct.origin?.name || "",
      supplier: currentProduct.supplier?.name || "",
      qty: currentProduct.qty || 0,
      packing: currentProduct.packing || "",
      imgsFirebase: currentProduct.imgs || [],
      files: currentProduct.files || [],
      isActive: currentProduct.isActive || false
    },
    enableReinitialize: true,
    validationSchema: VALIDATE_FORM_PRODUCT,
    onSubmit: async (values, { setSubmitting }) => {
      const imgsLocal = await Promise.all(values.files.map((item) => uploadImage(item)));
      await Promise.all(arrDelImg.map(item => delImgFireBase(item)));
      const productOrigin = origin?.filter(item => item.name === values.origin)[0];
      const productSupplier = suppliers?.filter(item => item.name === values.supplier)[0];
      const imgs = [...values.imgsFirebase, ...imgsLocal];

      const updatedProduct = {
        ...values,
        origin: productOrigin._id,
        supplier: productSupplier._id,
        qty: parseInt(values.qty),
        costPrice: parseInt(values.costPrice),
        price: parseInt(values.price),
        imgs: imgs
      };
      dispatch(updateProduct({
        updatedProduct: updatedProduct
        , id: id
      }))
        .unwrap()
        .then(() => {
          setSubmitting(false);
          setMess({ success: UPDATE_PRODUCT_SUCCESS })
        })
        .catch((error) => {
          setSubmitting(false);
          if (error.sku) formProduct.errors.sku = error.sku;
          error.other && setMess({ error: error.other });
        })
    }
  });

  const handleDelImgFirebase = (img) => {
    setArrDelImg([...arrDelImg, img]);
    formProduct.setFieldValue('imgsFirebase', formProduct.values.imgsFirebase.filter(item => item !== img));
  };

  return (
    <>
      {isLoading ?
        <Loading /> :
        <>
          <div className="create-product">
            <FormProduct
              formProduct={formProduct}
              handleDelImgFirebase={handleDelImgFirebase}
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

export default UpdateProduct;