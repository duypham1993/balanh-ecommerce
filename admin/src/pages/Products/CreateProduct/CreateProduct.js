import FormProduct from "../../../components/FormProduct/FormProduct";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getProducts } from "../../../redux/slice/productSlice";
import { uploadImage } from "../../../services/uploadFirebase";
import { selectProducts } from "../../../redux/selectors";

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
  })
  const [file, setFile] = useState([]);
  let imgURLsLocal = file.map(item => URL.createObjectURL(item));
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

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
    </div>
  );
};

export default AddProduct;