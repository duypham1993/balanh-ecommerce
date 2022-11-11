import FormProduct from "../../../components/FormProduct/FormProduct";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, resetStatusSubmit, updateProduct } from "../../../redux/slice/productSlice";
import { delImgFireBase, uploadImage } from "../../../services/uploadFirebase";
import { selectProducts, selectStatusProductSubmit } from "../../../redux/selectors";
import { useParams } from "react-router-dom";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";

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
  const products = useSelector(selectProducts);
  const currentProduct = products.filter(item => item._id === id)[0];
  const [arrDelImg, setArrDelImg] = useState([]);
  let imgURLsFirebase = inputs.imgs;
  let imgURLsLocal = file.map(item => URL.createObjectURL(item));
  const statusSubmit = useSelector(selectStatusProductSubmit);
  const mess = {
    success: "Cập nhật sản phẩm thành công!",
    error: "Cập nhật sản phẩm thất bại!"
  }

  useEffect(() => {
    dispatch(getProducts());
    dispatch(resetStatusSubmit());
  }, []);

  useEffect(() => {
    if (currentProduct) {
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

      // clear file state after update
      setFile([]);
    }
  }, [currentProduct]);

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
    <div className="create-product">
      <FormProduct
        inputs={inputs}
        setInputs={setInputs}
        file={file}
        setFile={setFile}
        imgURLsFirebase={imgURLsFirebase}
        imgURLsLocal={imgURLsLocal}
        arrDelImg={arrDelImg}
        setArrDelImg={setArrDelImg}
        handleOnSubmit={handleOnSubmit}
        products={products}
        currentProduct={currentProduct}
      />
      <SubmitAlert
        statusSubmit={statusSubmit}
        mess={mess}
      />
    </div>
  );
};

export default UpdateProduct;