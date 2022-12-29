import MenuItemMd from './MenuItemMd';

const SubMenuMd = ({ children }) => {
  return (
    <ul
      className='menu-md__list menu-md__list--sub'
    >
      {children.map((submenu, index) => (
        <MenuItemMd
          item={submenu}
          key={index}
        />
      ))}
    </ul>
  );
};

export default SubMenuMd;