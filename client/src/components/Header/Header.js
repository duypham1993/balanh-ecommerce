import MainMenu from "./MainMenu/MainMenu";
import MenuMD from "./MenuMD/MenuMD";
import Topbar from "./Topbar/Topbar";
import useViewport from "../../hooks/useViewport";

const Header = () => {
  const { isMd } = useViewport();
  return (
    <div id="header">
      {isMd && <Topbar />}
      <div className="menu-sticky">
        <MainMenu />
        {isMd && <MenuMD />}
      </div>
    </div>
  );
};

export default Header