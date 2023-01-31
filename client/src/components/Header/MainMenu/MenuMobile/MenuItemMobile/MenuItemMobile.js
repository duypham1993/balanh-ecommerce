import { Link } from 'react-router-dom';
import SubMenuMobile from './SubMenuMobile';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';

const MenuItem = ({ item, isSubItem, handleClose }) => {
  return (
    <li>
      {item.children ? (
        <>
          <Link className='text-decoration-none d-flex align-items-center w-100 p-3 ps-4 text-white text-uppercase fs-85 border-bottom border-white' to={`/${item.slug}`} onClick={handleClose}>
            {!isSubItem && <LabelImportantIcon className='text-white pe-1' />}
            <span>{item.name}</span>
          </Link>
          <SubMenuMobile
            children={item.children}
            handleClose={handleClose}
          />
        </>
      ) : (
        <>
          <Link className={isSubItem ? 'text-decoration-none d-flex align-items-center w-100 p-3 ps-5 text-white text-uppercase fs-85 border-bottom border-white' : 'text-decoration-none d-flex align-items-center w-100 p-3 ps-4 text-white text-uppercase fs-85 border-bottom border-white'} to={`/${item.slug}`} onClick={handleClose}>
            {!isSubItem && <LabelImportantIcon className='pe-1 text-white' />}
            <span>{item.name}</span>
          </Link>
        </>
      )}
    </li>
  );
};

export default MenuItem;