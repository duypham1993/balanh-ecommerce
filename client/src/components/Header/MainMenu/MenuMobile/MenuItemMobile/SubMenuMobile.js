import MenuItemMobile from './MenuItemMobile';

const SubMenu = ({ children }) => {
  return (
    <ul
      className='list-unstyled p-0 bg-green'
    >
      {children.map((submenu, index) => (
        <MenuItemMobile
          item={submenu}
          key={index}
          isSubItem={true}
        />
      ))}
    </ul>
  );
};

export default SubMenu;