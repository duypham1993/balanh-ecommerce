import MenuItemMobile from './MenuItemMobile';

const SubMenu = ({ children, handleClose }) => {
  return (
    <ul
      className='list-unstyled p-0 bg-green'
    >
      {children.map((submenu, index) => (
        <MenuItemMobile
          item={submenu}
          key={index}
          isSubItem={true}
          handleClose={handleClose}
        />
      ))}
    </ul>
  );
};

export default SubMenu;