import useMediaQuery from "utils/useMediaQuery";
import SidebarMobile from "components/organisms/Sidebar/SidebarMobile";
import SidebarPC from "components/organisms/Sidebar/SidebarPC";

const Sidebar = () => {
  const isPC = useMediaQuery('(min-width: 1024px)');
  return (
    <>
      {isPC
        ? <SidebarPC />
        : <SidebarMobile />
      }
    </>
  );
};

export default Sidebar;
