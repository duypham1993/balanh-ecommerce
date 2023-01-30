import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateStock } from "../../redux/slice/productSlice";

const UpdateQty = ({ id }) => {
  const [updateQty, setUpdateQty] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const qtyInt = {
      _id: id,
      qty: updateQty
    };
    updateQty.trim() && dispatch(updateStock(qtyInt))
      .unwrap()
      .then(() => {
        setUpdateQty("");
      })
  };

  return (
    <div>
      <input
        className='input-default'
        type="text"
        name={id}
        value={updateQty}
        onChange={(e) => setUpdateQty(e.target.value)} />
      <button className='btn-df' onClick={e => handleSubmit(e)}>Thêm</button>
    </div>
  )
}

export default UpdateQty;