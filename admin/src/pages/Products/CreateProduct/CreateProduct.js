import FormProduct from "../../../components/FormProduct/FormProduct";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getProducts, resetStatusSubmit } from "../../../redux/slice/productSlice";
import { uploadImage } from "../../../services/uploadFirebase";
import { selectProducts, selectStatusProductSubmit } from "../../../redux/selectors";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";

const AddProduct = () => {
  const dispatch = useDispatch();
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
  });
  const [file, setFile] = useState([]);
  let imgURLsLocal = file.map(item => URL.createObjectURL(item));
  const products = useSelector(selectProducts);
  const statusSubmit = useSelector(selectStatusProductSubmit);
  const mess = {
    success: "Tạo sản phẩm thành công!",
    error: "Tạo sản phẩm thất bại!"
  }

  useEffect(() => {
    dispatch(getProducts());
    dispatch(resetStatusSubmit());
  }, []);

  useEffect(() => {
    if (statusSubmit === "fulfilled") {
      setInputs({
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
      });
    }
  }, [statusSubmit]);

  const handleOnSubmit = async () => {
    const imgs = await Promise.all(file.map((item) => uploadImage(item)));
    const newProduct = {
      ...inputs,
      qty: parseInt(inputs.qty),
      costPrice: parseInt(inputs.costPrice),
      price: parseInt(inputs.price),
      imgs: imgs
    };
    await dispatch(addProduct(newProduct));
  }

  return (
    <div className="create-product">
      <FormProduct
        inputs={inputs}
        setInputs={setInputs}
        file={file}
        setFile={setFile}
        imgURLsLocal={imgURLsLocal}
        handleOnSubmit={handleOnSubmit}
        products={products}
      />
      <SubmitAlert
        statusSubmit={statusSubmit}
        mess={mess}
      />
    </div>
  );
};

export default AddProduct;