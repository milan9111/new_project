/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  IDefaultValuesSettingParams,
  IField,
} from "../../types/interfaces/ISettingParams";
import { ESettingParamsFieldType } from "../../types/enums/ESettingParamsFieldType";
import { EPageRoute } from "../../types/enums/EPageRoute";
import { getDataByKey } from "../../store/actions/settingParamsActions";
import { getScreens } from "../../store/actions/formsActions";
import {
  setIsHelpModalOpen,
  setIsReviewModalOpen,
  setSelectedPath,
  setSettingParamsItem,
} from "../../store/reducers/SettingParamsSlice";
import { setDefaultSelectedKeys } from "../../store/reducers/MenuSlice";
import { setCurrentScreenIndex } from "../../store/reducers/FormsSlice";
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
  const {
    settingParamsItem,
    loadingSettingParamsItem,
    selectedPath,
    currentSelectLookups,
  } = useAppSelector((state) => state.settingParams);
  const [isFormWithInputs, setIsFormWithInputs] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { key } = useParams();
  const navigate = useNavigate();
  const formSubmit = useRef<HTMLButtonElement | null>(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, defaultValues },
  } = useForm<any>({
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<any> = (data) => console.log(data);

  const handleCleanup = () => {
    reset({});
    dispatch(setSettingParamsItem(null));
  };

  useAbortableEffect(
    async (abortController: AbortController) => {
      if (defaultOpenKeys.length && defaultSelectedKeys.length) {
        dispatch(setDefaultSelectedKeys([key as string]));
      }

      if (menu.length && key && key.length) {
        const path = getPath(menu as any, key as string);
        dispatch(setSelectedPath(path));
        dispatch(getDataByKey(key, abortController));
      }
    },
    [key, menu],
    [handleCleanup]
  );
  useEffect(() => {
    if (settingParamsItem && !loadingSettingParamsItem) {
      const defaultValuesSettingParams: IDefaultValuesSettingParams = {};
      let countFormInputs = 0;

      settingParamsItem.form.rows.forEach((item) => {
        item.fields.forEach((el) => {
          if (el.fieldType !== ESettingParamsFieldType.Text) {
            if (el.dataType === "date") {
              defaultValuesSettingParams[el.name] = getDateForDatepicker(
                el.default
              );
              countFormInputs++;
            } else {
              defaultValuesSettingParams[el.name] = el.default;
              countFormInputs++;
            }
          }
        });
      });
      setIsFormWithInputs(countFormInputs);
      reset(defaultValuesSettingParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingParamsItem, loadingSettingParamsItem]);

  const onOpenHelpModal = () => {
    dispatch(setIsHelpModalOpen(true));
  };

  const goToFormsPage = () => {
    navigate(EPageRoute.FORMS_PAGE_ROUTE);
  };

  const onOpenReviewModal = () => {
    dispatch(setIsReviewModalOpen(true));
  };

  const onFinishSetting = async () => {
    if (formSubmit.current) {
      formSubmit.current.click();

      if (settingParamsItem?.screenId) {
        const abortController = new AbortController();
        const screens = await dispatch(getScreens(abortController));
        if (screens.length) {
          screens.forEach((item, index) => {
            if (item.value === settingParamsItem?.screenId) {
              dispatch(setCurrentScreenIndex(index));
            }
          });
        }
        navigate(EPageRoute.FORMS_PAGE_ROUTE);
      } else {
        dispatch(setCurrentScreenIndex(0));
        navigate(EPageRoute.FORMS_PAGE_ROUTE);
      }
    }
  };

  useHotKeys({
    onHelpModal: settingParamsItem?.help?.length ? onOpenHelpModal : () => {},
    onFormsPage: goToFormsPage,
    onFinish: settingParamsItem?.screenId ? onFinishSetting : () => {},
  });

  const renderRow = (fields: IField[]) => {
    if (fields.length) {
      const createdRow = fields.map((item, index) => {
        if (item.fieldType === ESettingParamsFieldType.Text) {
          if (fields.length === 1) {
            return (
              <p
                key={index}
                className={
                  item.column !== 0
                    ? styles.titleRowCenter
                    : styles.titleRowStart
                }
              >
                {item.text}
              </p>
            );
          } else {
            return null;
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
              options={
                currentSelectLookups
                  ? currentSelectLookups[item.name].options
                  : []
              }
              currentSelectLookups={currentSelectLookups}
              selectedPath={selectedPath}
              defaultValues={defaultValues}
              reset={reset}
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

  const renderForm =
    !loadingSettingParamsItem &&
    settingParamsItem &&
    (isFormWithInputs === 0 ||
      Object.values((defaultValues as object) || {}).length > 0)
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
        onOpenReviewModal={onOpenReviewModal}
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
