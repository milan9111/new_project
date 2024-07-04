import { FC, ReactNode } from "react";
import { useParams } from "react-router-dom";
import {
  setChangedMenuFlag,
  setDefaultOpenKeys,
  setDefaultSelectedKeys,
  setLoadingMenu,
  setShowMobileMenu,
} from "../../store/reducers/MenuSlice";
import { getDefaultOpenKeys } from "../../helpers/getDefaultOpenKeys";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Layout from "./Layout";

interface LayoutContainerProps {
  children: ReactNode;
}

const LayoutContainer: FC<LayoutContainerProps> = ({ children }) => {
  const { menu, loadingMenu, loadingMainSpinner, showMobileMenu } =
    useAppSelector((state) => state.menu);
  const dispatch = useAppDispatch();
  const { key } = useParams();

  const onRestoreMenu = (collapsed: boolean) => {
    if (!collapsed && key && key.length && menu.length) {
      dispatch(setLoadingMenu(true));
      dispatch(setChangedMenuFlag(false));
      dispatch(setDefaultSelectedKeys([key as string]));
      dispatch(setDefaultOpenKeys(getDefaultOpenKeys(menu, key as string)));
      setTimeout(() => {
        dispatch(setLoadingMenu(false));
      }, 750);
    }
  };

  const onShowMobileMenu = () => {
    dispatch(setShowMobileMenu(false));
  };

  return (
    <Layout
      loadingMenu={loadingMenu}
      loadingMainSpinner={loadingMainSpinner}
      onRestoreMenu={onRestoreMenu}
      onShowMobileMenu={onShowMobileMenu}
      showMobileMenu={showMobileMenu}
    >
      {children}
    </Layout>
  );
};

export default LayoutContainer;
