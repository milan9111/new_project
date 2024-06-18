import { FC, ReactNode } from "react";
import Layout from "./Layout";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setDefaultOpenKeys,
  setDefaultSelectedKeys,
} from "../../store/reducers/MenuSlice";

interface LayoutContainerProps {
  children: ReactNode;
}

const LayoutContainer: FC<LayoutContainerProps> = ({ children }) => {
  const { loadingMenu, loadingMainSpinner } = useAppSelector(
    (state) => state.menu
  );
  const dispatch = useAppDispatch();

  const onClearMenu = () => {
    dispatch(setDefaultOpenKeys([]));
    dispatch(setDefaultSelectedKeys([]));
  };

  return (
    <Layout
      loadingMenu={loadingMenu}
      loadingMainSpinner={loadingMainSpinner}
      onClearMenu={onClearMenu}
    >
      {children}
    </Layout>
  );
};

export default LayoutContainer;
