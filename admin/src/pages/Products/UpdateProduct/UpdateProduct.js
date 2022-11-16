import FormProduct from "../../../components/FormProduct/FormProduct";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentProduct, resetStatusSubmit, updateProduct } from "../../../redux/slice/productSlice";
import { delImgFireBase, uploadImage } from "../../../services/uploadFirebase";
import { selectData, selectStatusSubmit } from "../../../redux/selectors";
import { useParams } from "react-router-dom";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import ErrorFetching from "../../../components/ErrorFetching/ErrorFetching";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [inputs, setInputs] = useState({
    name: "",
    desc: "",
    sku: "",
    costPrice: 0,
    price: 0,
    categories: [],
    origin: "",
    supplier: "",
    qty: 0,
    packing: "",
    imgs: [],
    isActive: false
  })
  const [file, setFile] = useState([]);
  const currentProduct = useSelector(selectData("product", "currentProduct"));
  const [arrDelImg, setArrDelImg] = useState([]);
  let imgURLsFirebase = inputs.imgs;
  let imgURLsLocal = file.map(item => URL.createObjectURL(item));
  const statusSubmit = useSelector(selectStatusSubmit("product"));
  const statusFetching = useSelector(selectData("product", "idFetching"));
  const errorApi = useSelector(selectData("product", "error"))
  const mess = {
    success: "Cập nhật sản phẩm thành công!",
    error: errorApi.other
  }

  useEffect(() => {
    dispatch(getCurrentProduct(id));
    dispatch(resetStatusSubmit());
  }, []);

  useEffect(() => {
    if (currentProduct && Object.keys(currentProduct).length) {
      setInputs({
        name: currentProduct.name,
        desc: currentProduct.desc,
        sku: currentProduct.sku,
        costPrice: currentProduct.costPrice,
        price: currentProduct.price,
        categories: currentProduct.categories,
        origin: currentProduct.origin,
        supplier: currentProduct.supplier,
        qty: currentProduct.qty,
        packing: currentProduct.packing,
        imgs: currentProduct.imgs,
        isActive: currentProduct.isActive
      });

      // clear file after update success
      setFile([]);
    }
  }, [currentProduct]);

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setInputs({ ...inputs, [name]: checked })
    } else {
      setInputs({ ...inputs, [name]: value });
    }
  }

  const handleAutoComplete = (name, value) => {
    setInputs({ ...inputs, [name]: value })
  }

  const handleMultiCheckbox = (e) => {
    const { checked, value } = e.target;
    checked ?
      setInputs({ ...inputs, categories: [...inputs.categories, value] })
      :
      setInputs({ ...inputs, categories: inputs.categories.filter(item => item !== value) })
  }

  const handleFile = (e) => {
    setFile(prev => [...prev, ...e.target.files])
  }

  const handleDelImgFirebase = (img) => {
    setArrDelImg([...arrDelImg, img]);
    setInputs({ ...inputs, imgs: imgURLsFirebase.filter((item) => item !== img) });
  };

  const handleDelImgLocal = (index) => {
    const tempFile = file.filter((item, i) => i !== index);
    setFile(tempFile);
  }

  const handleOnSubmit = async () => {
    const imgsLocal = await Promise.all(file.map((item) => uploadImage(item)));
    await Promise.all(arrDelImg.map(item => delImgFireBase(item)));
    const imgs = [...inputs.imgs, ...imgsLocal];
    const updatedProduct = {
      ...inputs,
      qty: parseInt(inputs.qty),
      costPrice: parseInt(inputs.costPrice),
      price: parseInt(inputs.price),
      imgs: imgs
    };
    await dispatch(updateProduct({ id, updatedProduct }));
  }
  return (
    <>
      {statusFetching === "rejected" ?
        <ErrorFetching /> :
        <>
          <div className="create-product">
            <FormProduct
              inputs={inputs}
              imgURLsFirebase={imgURLsFirebase}
              imgURLsLocal={imgURLsLocal}
              handleOnChange={handleOnChange}
              handleAutoComplete={handleAutoComplete}
              handleMultiCheckbox={handleMultiCheckbox}
              handleFile={handleFile}
              handleDelImgFirebase={handleDelImgFirebase}
              handleDelImgLocal={handleDelImgLocal}
              handleOnSubmit={handleOnSubmit}
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

export default UpdateProduct;