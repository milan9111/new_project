/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { useParams } from "react-router-dom";
import { setDefaultSelectedKeys } from "../../store/reducers/MenuSlice";
import LayoutContainer from "../../components/Layout/LayoutContainer";
import { getPath } from "../../helpers/getPath";
import useAbortableEffect from "../../hooks/useAbortableEffect";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import SettingParams from "./SettingParams";

const SettingParamsContainer: FC = () => {
  const { menu, defaultOpenKeys, defaultSelectedKeys } = useAppSelector(
    (state) => state.menu
  );
  const dispatch = useAppDispatch();
  const { key } = useParams();

  useAbortableEffect(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (abortController: AbortController) => {
      if (defaultOpenKeys.length && defaultSelectedKeys.length) {
        dispatch(setDefaultSelectedKeys([key as string]));
      }

      if (menu.length && key && key.length) {
        console.log('25', menu, key);
        const path = getPath(menu as any, key as string);

        console.log(path);
      }
    },
    [key, menu],
    []
  );

  return (
    <LayoutContainer>
      <SettingParams />
    </LayoutContainer>
  );
};

export default SettingParamsContainer;
