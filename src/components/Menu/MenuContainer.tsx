import { FC } from "react";
import Menu from "./Menu";
import useAbortableEffect from "../../hooks/useAbortableEffect";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getMenu } from "../../store/actions/menuActions";

const MenuContainer: FC = () => {
  const { menu } = useAppSelector((state) => state.menu);
  const dispatch = useAppDispatch();

  useAbortableEffect(
    async (abortController: AbortController) => {
      dispatch(getMenu(abortController));
    },
    [],
    []
  );

  return <Menu items={menu} />;
};

export default MenuContainer;
