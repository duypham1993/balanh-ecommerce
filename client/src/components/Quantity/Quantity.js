import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect } from 'react';
import "./quantity.scss";

const Quantity = ({ value, setValue, maxQty }) => {

  useEffect(() => {
    if (maxQty <= 0) {
      setValue(0);
    }
  }, [maxQty]);


  const increaseQty = () => {
    if (value < maxQty) {
      setValue(value + 1)
    }
  };

  const decreaseQty = () => {
    if (value > 1) {
      setValue(value - 1)
    }
  };

  const handleOnChangeQty = (e) => {
    const valueInt = parseInt(e.target.value);

    if (valueInt < 0 || !valueInt) {
      setValue(0);
    } else if (valueInt > maxQty) {
      setValue(maxQty);
    } else {
      setValue(valueInt);
    }
  };

  return (
    <div className="d-inline-flex align-items-center qty">
      <button className="qty__btn" type="button" onClick={() => decreaseQty()}>
        <RemoveIcon className="fs-5" />
      </button>
      <input type="number" className="qty__input" value={value} onChange={(e) => handleOnChangeQty(e)} />
      <button className="qty__btn" type="button" onClick={() => increaseQty()}>
        <AddIcon className="fs-5" />
      </button>
    </div>
  );
};

export default Quantity;