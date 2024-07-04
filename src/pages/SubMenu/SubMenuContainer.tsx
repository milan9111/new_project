import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSubMenu } from "../../store/actions/subMenuActions";
import {
  setDefaultOpenKeys,
  setDefaultSelectedKeys,
} from "../../store/reducers/MenuSlice";
import { setSettingParamsItem } from "../../store/reducers/SettingParamsSlice";
import { setSubMenu } from "../../store/reducers/SubMenuSlice";
import useAbortableEffect from "../../hooks/useAbortableEffect";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getDefaultOpenKeys } from "../../helpers/getDefaultOpenKeys";
import LayoutContainer from "../../components/Layout/LayoutContainer";
import SubMenu from "./SubMenu";
import { getDataByKey } from "../../store/actions/settingParamsActions";

const SubMenuContainer: FC = () => {
  const { menu } = useAppSelector((state) => state.menu);
  const { subMenu, loadingSubMenu } = useAppSelector((state) => state.subMenu);
  const dispatch = useAppDispatch();
  const { key } = useParams();

  const handleCleanup = () => {
    dispatch(setSettingParamsItem(null));
    dispatch(setSubMenu(null));
  };

  useAbortableEffect(
    async (abortController: AbortController) => {
      dispatch(getSubMenu(abortController, key as string));
      dispatch(getDataByKey(key as string, abortController));
    },
    [],
    [handleCleanup]
  );

  useEffect(() => {
    dispatch(setDefaultSelectedKeys([key as string]));
    dispatch(setDefaultOpenKeys(getDefaultOpenKeys(menu, key as string)));
  }, [menu]);

  console.log(subMenu);

  return (
    <LayoutContainer>
      <SubMenu />
    </LayoutContainer>
  );
};

export default SubMenuContainer;
