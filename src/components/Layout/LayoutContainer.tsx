import { FC, ReactNode } from "react";
import Layout from "./Layout";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setDefaultOpenKeys,
  setDefaultSelectedKeys,
  setShownMenu,
} from "../../store/reducers/MenuSlice";

interface LayoutContainerProps {
  children: ReactNode;
}

const LayoutContainer: FC<LayoutContainerProps> = ({ children }) => {
  const { menu, loadingMenu } = useAppSelector((state) => state.menu);
  const dispatch = useAppDispatch();

  const onClearMenu = () => {
    const shownMenu = menu.map((item) => {
      return {
        ...item,
        children: item.children ? [] : null,
      };
    });
    dispatch(setDefaultOpenKeys([]));
    dispatch(setDefaultSelectedKeys([]));
    dispatch(setShownMenu(shownMenu));
  };

  return (
    <Layout loadingMenu={loadingMenu} onClearMenu={onClearMenu}>
      {children}
    </Layout>
  );
};

export default LayoutContainer;
