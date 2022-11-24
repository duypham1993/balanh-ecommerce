import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectData } from "../../redux/selectors";
import { updateStock } from "../../redux/slice/productSlice";

const UpdateQty = ({ id }) => {
  const [updateQty, setUpdateQty] = useState("");
  const dispatch = useDispatch();
  const statusSubmit = useSelector(selectData("product", "statusSubmit"));

  useEffect(() => {
    statusSubmit === "fulfilled" && setUpdateQty("");
  }, [statusSubmit])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const qtyInt = {
      qty: updateQty
    };
    updateQty.trim() && await dispatch(updateStock({ id, qtyInt }));
  };

  return (
    <div>
      <input
        className='input-default'
        type="text"
        name={id}
        value={updateQty}
        onChange={(e) => setUpdateQty(e.target.value)} />
      <button className='btn-default' onClick={e => handleSubmit(e)}>Thêm</button>
    </div>
  )
}

export default UpdateQty;