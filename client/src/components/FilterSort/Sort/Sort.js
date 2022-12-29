import { Form } from "react-bootstrap";

const Sort = ({ sort, handleOnChangeSort }) => {
  const options = [
    {
      value: "default",
      text: "Mặc định"
    },
    {
      value: "nameAZ",
      text: "Tên: A đến Z"
    },
    {
      value: "nameZA",
      text: "Tên: Z đến A"
    },
    {
      value: "priceLowToHigh",
      text: "Giá: thấp đến cao"
    },
    {
      value: "priceHighToLow",
      text: "Giá: cao đến thấp"
    },
  ]

  return (
    <div className="d-flex justify-content-end align-items-center">
      <div className="d-none d-md-block fw-light me-2">
        SẮP XẾP THEO:
      </div>
      <Form.Select value={sort} className="rounded-0 w-auto text-gray shadow-none border-gray" onChange={(e) => handleOnChangeSort(e)}>
        {options.map((item, index) => {
          return (
            <option key={index} value={item.value}>{item.text}</option>
          )
        })}
      </Form.Select>
    </div>
  );
};

export default Sort;