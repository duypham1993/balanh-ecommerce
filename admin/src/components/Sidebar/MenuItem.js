import { useState, useRef } from 'react';
import Dropdown from './Dropdown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { Link } from 'react-router-dom';

const MenuItem = ({ item, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);
  let ref = useRef();

  const accordion = (e) => {
    setDropdown((prev) => !prev)
  }

  return (
    <li
      className="sidebar__item"
    >
      {item.children ? (
        <>
          <button
            ref={ref}
            className='sidebar__item-wrapper'
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={(e) => accordion(e)}
          >
            <span className='sidebar__icon'>{item.icon}</span>
            <span className='sidebar__title'>{item.title}</span>
            {dropdown ? <ExpandMoreIcon className='sidebar__arrow' /> : <ChevronLeftIcon className='sidebar__arrow' />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            children={item.children}
            dropdown={dropdown}
          />
        </>
      ) : (
        <Link className='sidebar__link' to={item.link}>{item.title}</Link>
      )}
    </li>
  );
};

export default MenuItem;