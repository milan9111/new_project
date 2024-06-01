/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IField } from "../../types/interfaces/ISettingParams";
import { ESettingParamsFieldType } from "../../types/enums/ESettingParamsFieldType";
import { EPageRoute } from "../../types/enums/EPageRoute";
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
import CustomField from "../../components/SettingParamsCustomComponents/CustomField/CustomField";
import CustomSelectInclude from "../../components/SettingParamsCustomComponents/CustomSelectInclude/CustomSelectInclude";
import CustomSelectLookup from "../../components/SettingParamsCustomComponents/CustomSelectLookup/CustomSelectLookup";
import SettingParams from "./SettingParams";
import styles from "./settingParams.module.scss";

const SettingParamsContainer: FC = () => {
  const { menu, defaultOpenKeys, defaultSelectedKeys } = useAppSelector(
    (state) => state.menu
  );
  const { settingParamsItem, loadingSettingParamsItem } = useAppSelector(
    (state) => state.settingParams
  );
  const dispatch = useAppDispatch();
  const { key } = useParams();
  const navigate = useNavigate();

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

  const goToFormsPage = () => {
    navigate(EPageRoute.FORMS_PAGE_ROUTE);
  };

  useHotKeys({
    onHelpModal: settingParamsItem?.help?.length ? onOpenHelpModal : () => {},
    onFormsPage: settingParamsItem?.help?.length ? goToFormsPage : () => {},
  });

  console.log(settingParamsItem);

  const renderRow = (fields: IField[]) => {
    if (fields.length) {
      const createdRow = fields.map((item, index) => {
        if (item.fieldType === ESettingParamsFieldType.Text) {
          if (fields.length === 1) {
            return (
              <p key={index} className={styles.titleRow}>
                {item.text}
              </p>
            );
          } else {
            return (
              <label
                key={index}
                className={styles.label}
                htmlFor={item.name.split("_")[0]}
              >
                {item.text}
              </label>
            );
          }
        }
        if (item.fieldType === ESettingParamsFieldType.Input) {
          return <CustomField key={index} item={item} />;
        }
        if (item.fieldType === ESettingParamsFieldType.SelectInclude) {
          return <CustomSelectInclude key={index} item={item} />;
        }
        if (item.fieldType === ESettingParamsFieldType.SelectLookup) {
          return <CustomSelectLookup key={index} item={item} />;
        }
      });
      return createdRow;
    } else {
      return <div className={styles.emptyRow}></div>;
    }
  };

  const renderForm = settingParamsItem
    ? settingParamsItem.form.rows.map((item) => {
        return (
          <div key={item.row} className={styles.row}>
            {renderRow(item.fields)}
          </div>
        );
      })
    : [];

  return (
    <LayoutContainer>
      <SettingParams
        loadingSettingParamsItem={loadingSettingParamsItem}
        settingParamsItem={settingParamsItem}
        onOpenHelpModal={onOpenHelpModal}
        goToFormsPage={goToFormsPage}
        renderForm={renderForm}
      />
    </LayoutContainer>
  );
};

export default SettingParamsContainer;
