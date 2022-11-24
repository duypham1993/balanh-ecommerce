import FormProduct from "../../../components/FormProduct/FormProduct";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, resetStatusSubmit } from "../../../redux/slice/productSlice";
import { uploadImage } from "../../../services/uploadFirebase";
import { selectData, selectStatusSubmit } from "../../../redux/selectors";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import { getCategories } from "../../../redux/slice/categorySlice";
import { getSuppliers } from "../../../redux/slice/supplierSlice";
import { getOrigin } from "../../../redux/slice/originSlice";

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
  const statusSubmit = useSelector(selectStatusSubmit("product"));
  const errorApi = useSelector(selectData("product", "error"))
  const mess = {
    success: "Tạo sản phẩm thành công!",
    error: errorApi.other
  };
  const origin = useSelector(selectData("origin", "origin"));
  const suppliers = useSelector(selectData("supplier", "suppliers"));

  useEffect(() => {
    const fetchMulti = async () => {
      await dispatch(getCategories());
      await dispatch(getSuppliers());
      await dispatch(getOrigin());
    }
    fetchMulti();

    return () => dispatch(resetStatusSubmit());
  }, [])

  // clear inputs after add product success
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

      setFile([]);
    }
  }, [statusSubmit]);

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

  const handleDelImgLocal = (index) => {
    const tempFile = file.filter((item, i) => i !== index);
    setFile(tempFile);
  }

  const handleOnSubmit = async () => {
    const imgs = await Promise.all(file.map((item) => uploadImage(item)));
    const productOrigin = origin?.filter(item => item.name === inputs.origin)[0];
    const productSupplier = suppliers?.filter(item => item.name === inputs.supplier)[0];

    const newProduct = {
      ...inputs,
      origin: productOrigin._id,
      supplier: productSupplier._id,
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
        handleDelImgLocal={handleDelImgLocal}
        handleOnChange={handleOnChange}
        handleAutoComplete={handleAutoComplete}
        handleMultiCheckbox={handleMultiCheckbox}
        handleFile={handleFile}
        imgURLsLocal={imgURLsLocal}
        handleOnSubmit={handleOnSubmit}
      />
      <SubmitAlert
        statusSubmit={statusSubmit}
        mess={mess}
      />
    </div>
  );
};

export default AddProduct;