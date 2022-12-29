const TopContact = () => {
  return (
    <div className="top-contact">
      <ul className='list-unstyled d-flex py-2 px-0 m-0'>
        <li className='text-white me-4'>
          <span>Hotline: </span>
          <a href="tel:1800.9412" className='link-df link-df--white p-0'>1800.9412</a>
        </li>
        <li className='text-white me-4'>
          <span>Liên hệ: </span>
          <a href="mail:hello@balanh.com" className='link-df link-df--white p-0'>hello@balanh.com</a>
        </li>
        <li className='text-white me-4'>
          <span>Freeship cho đơn từ 1.500.000đ</span>
        </li>
      </ul>
    </div>
  )
};

export default TopContact

