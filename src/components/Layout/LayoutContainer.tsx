import { FC, ReactNode } from "react";
import Layout from "./Layout";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setDefaultOpenKeys,
  setDefaultSelectedKeys,
  setShowMobileMenu,
} from "../../store/reducers/MenuSlice";

interface LayoutContainerProps {
  children: ReactNode;
}

const LayoutContainer: FC<LayoutContainerProps> = ({ children }) => {
  const { loadingMenu, loadingMainSpinner, showMobileMenu } = useAppSelector(
    (state) => state.menu
  );
  const dispatch = useAppDispatch();

  const onClearMenu = () => {
    dispatch(setDefaultOpenKeys([]));
    dispatch(setDefaultSelectedKeys([]));
  };

  const onShowMobileMenu = () => {
    dispatch(setShowMobileMenu(false));
  };

  return (
    <Layout
      loadingMenu={loadingMenu}
      loadingMainSpinner={loadingMainSpinner}
      onClearMenu={onClearMenu}
      onShowMobileMenu={onShowMobileMenu} 
      showMobileMenu={showMobileMenu}
    >
      {children}
    </Layout>
  );
};

export default LayoutContainer;
