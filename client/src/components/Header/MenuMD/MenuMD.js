import Container from "react-bootstrap/Container";
import MenuItemMd from "./MenuItemMd/MenuItemMd";
import "./menumd.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../../../redux/slice/categorySlice";

const MenuMD = () => {
  const dispatch = useDispatch();
  const treeCategories = useSelector(state => state.category.treeCategories);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <nav className="menu-md">
      <Container fluid="lg">
        <ul className="menu-md__list">
          {treeCategories.map((item, index) => {
            return (
              <MenuItemMd
                item={item}
                key={index}
              />
            );
          })}
        </ul>
      </Container>
    </nav >
  );
};

export default MenuMD;