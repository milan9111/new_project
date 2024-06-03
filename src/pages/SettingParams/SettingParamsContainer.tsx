/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  IDefaultValuesSettingParams,
  IField,
} from "../../types/interfaces/ISettingParams";
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
import { getDateForDatepicker } from "../../helpers/getDateForDatepicker";
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
  const formSubmit = useRef<HTMLButtonElement | null>(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<any>({
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<any> = (data) => console.log(data);

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

  useEffect(() => {
    if (settingParamsItem) {
      const defaultValuesSettingParams: IDefaultValuesSettingParams = {};

      settingParamsItem.form.rows.forEach((item) => {
        item.fields.forEach((el) => {
          if (el.fieldType !== ESettingParamsFieldType.Text) {
            if (el.dataType === "date") {
              defaultValuesSettingParams[el.name] = getDateForDatepicker(
                el.default
              );
            } else {
              defaultValuesSettingParams[el.name] = el.default;
            }
          }
        });
      });

      reset(defaultValuesSettingParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingParamsItem]);

  const onOpenHelpModal = () => {
    dispatch(setIsHelpModalOpen(true));
  };

  const goToFormsPage = () => {
    navigate(EPageRoute.FORMS_PAGE_ROUTE);
  };

  const onFinishSetting = () => {
    if (formSubmit.current) {
      formSubmit.current.click();
    }
  };

  useHotKeys({
    onHelpModal: settingParamsItem?.help?.length ? onOpenHelpModal : () => {},
    onFormsPage: goToFormsPage,
    onFinish: onFinishSetting,
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
          return (
            <CustomField
              key={index}
              item={item}
              control={control}
              errors={errors}
            />
          );
        }
        if (item.fieldType === ESettingParamsFieldType.SelectInclude) {
          return (
            <CustomSelectInclude
              key={index}
              item={item}
              control={control}
              errors={errors}
            />
          );
        }
        if (item.fieldType === ESettingParamsFieldType.SelectLookup) {
          return (
            <CustomSelectLookup
              key={index}
              item={item}
              control={control}
              errors={errors}
            />
          );
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
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        formSubmit={formSubmit}
        onFinishSetting={onFinishSetting}
      />
    </LayoutContainer>
  );
};

export default SettingParamsContainer;
