/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { useParams } from "react-router-dom";
import { getDataByPath } from "../../store/actions/settingParamsActions";
import {
  setIsHelpModalOpen,
  setSettingParamsItem,
} from "../../store/reducers/SettingParamsSlice";
import { setDefaultSelectedKeys } from "../../store/reducers/MenuSlice";
import LayoutContainer from "../../components/Layout/LayoutContainer";
import { getPath } from "../../helpers/getPath";
import useAbortableEffect from "../../hooks/useAbortableEffect";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import useHotKeys from "../../hooks/useHotKeys";
import SettingParams from "./SettingParams";

const SettingParamsContainer: FC = () => {
  const { menu, defaultOpenKeys, defaultSelectedKeys } = useAppSelector(
    (state) => state.menu
  );
  const { settingParamsItem, loadingSettingParamsItem } = useAppSelector(
    (state) => state.settingParams
  );
  const dispatch = useAppDispatch();
  const { key } = useParams();

  const handleCleanup = () => {
    dispatch(setSettingParamsItem(null));
  };

  useAbortableEffect(
    async (abortController: AbortController) => {
      if (defaultOpenKeys.length && defaultSelectedKeys.length) {
        dispatch(setDefaultSelectedKeys([key as string]));
      }

      if (menu.length && key && key.length) {
        const path = getPath(menu as any, key as string);
        dispatch(getDataByPath(path, abortController));
      }
    },
    [key, menu],
    [handleCleanup]
  );

  const onOpenHelpModal = () => {
    dispatch(setIsHelpModalOpen(true));
  };

  useHotKeys({
    onHelpModal: settingParamsItem?.help?.length ? onOpenHelpModal : () => {},
  });

  return (
    <LayoutContainer>
      <SettingParams
        loadingSettingParamsItem={loadingSettingParamsItem}
        settingParamsItem={settingParamsItem}
        onOpenHelpModal={onOpenHelpModal}
      />
    </LayoutContainer>
  );
};

export default SettingParamsContainer;
