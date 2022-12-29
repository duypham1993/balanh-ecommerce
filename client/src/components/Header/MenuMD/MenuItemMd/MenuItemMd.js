import { Link } from 'react-router-dom';
import SubMenuMd from './SubMenuMd';

const MenuItemMd = ({ item }) => {
  return (
    <li
      className="menu-md__item"
    >
      {item.children ? (
        <>
          <Link className='menu-md__link' to={`/${item.slug}`}>
            <span>{item.name}</span>
          </Link>
          <SubMenuMd
            children={item.children}
          />
        </>
      ) : (
        <>
          <Link className='menu-md__link' to={`/${item.slug}`}>
            <span>{item.name}</span>
          </Link>
        </>
      )}
    </li>
  );
};

export default MenuItemMd;