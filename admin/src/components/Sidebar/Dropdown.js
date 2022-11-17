import MenuItem from './MenuItem';
const Dropdown = ({ children, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : '';
  return (
    <ul
      className={`sidebar__list-item sidebar__list-item--sub ${dropdownClass} ${dropdown ? 'show' : ''
        }`}
    >
      {children.map((submenu, index) => (
        <MenuItem
          item={submenu}
          key={index}
          depthLevel={depthLevel}
        />
      ))}
    </ul>
  );
};

export default Dropdown;