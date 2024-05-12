import { FC, ReactNode } from "react";
import Layout from "./Layout";
import { useAppSelector } from "../../hooks/redux";

interface LayoutContainerProps {
  children: ReactNode;
}

const LayoutContainer: FC<LayoutContainerProps> = ({ children }) => {
  const { loadingMenu } = useAppSelector((state) => state.menu);
  return <Layout loadingMenu={loadingMenu}>{children}</Layout>;
};

export default LayoutContainer;
