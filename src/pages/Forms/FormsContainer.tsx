/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  IDefaultValuesScreen,
  IField,
} from "../../types/interfaces/IScreenData";
import { EScreenFieldType } from "../../types/enums/EScreenFieldType";
import {
  getFieldsByAttributeName,
  getScreen,
  getScreens,
} from "../../store/actions/formsActions";
import {
  setCurrentScreenIndex,
  setLoadingForm,
  setNumberOfRowsWithoutRepeats,
  setScreensNamesForInput,
  setSelectedScreen,
} from "../../store/reducers/FormsSlice";
import {
  setDefaultOpenKeys,
  setDefaultSelectedKeys,
} from "../../store/reducers/MenuSlice";
import { getDateForDatepicker } from "../../helpers/getDateForDatepicker";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import useAbortableEffect from "../../hooks/useAbortableEffect";
import useHotKeys from "../../hooks/useHotKeys";
import LayoutContainer from "../../components/Layout/LayoutContainer";
import CustomText from "../../components/FormCustomComponents/CustomText/CustomText";
import CustomField from "../../components/FormCustomComponents/CustomField/CustomField";
import CustomSelect from "../../components/FormCustomComponents/CustomSelect/CustomSelect";
import styles from "./forms.module.scss";
import Forms from "./Forms";

const FormsContainer: FC = () => {
  const {
    screensNamesForInput,
    selectedScreen,
    maxScreenIndex,
    currentScreenIndex,
    numberOfRowsWithoutRepeats,
    loadingForm,
  } = useAppSelector((state) => state.forms);
  const dispatch = useAppDispatch();

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
    dispatch(setScreensNamesForInput([]));
  };

  useAbortableEffect(
    async (abortController: AbortController) => {
      const screens = await dispatch(getScreens(abortController));

      if (screens.length) {
        dispatch(getScreen(screens[currentScreenIndex].value, abortController));
      }
      dispatch(setDefaultOpenKeys([]));
      dispatch(setDefaultSelectedKeys([]));
    },
    [],
    [handleCleanup]
  );

  useEffect(() => {
    if (selectedScreen) {
      const tempNumberOfRowsWithRepeats: number[] = [];
      selectedScreen.fields.forEach((item) => {
        tempNumberOfRowsWithRepeats.push(item.rowPosition);
      });
      dispatch(
        setNumberOfRowsWithoutRepeats([...new Set(tempNumberOfRowsWithRepeats)])
      );

      const tempDefaultValuesScreen: IDefaultValuesScreen = {};
      selectedScreen.fields.forEach((item) => {
        if (item.attributeName) {
          if (item.type === EScreenFieldType.Date) {
            tempDefaultValuesScreen[item.attributeName] = getDateForDatepicker(
              item.attribute?.defaultValue
            );
          } else {
            tempDefaultValuesScreen[item.attributeName] =
              item.attribute?.defaultValue || "";
          }
        }
      });
      reset(tempDefaultValuesScreen);
    }
  }, [selectedScreen]);

  const onPrevForm = () => {
    dispatch(setNumberOfRowsWithoutRepeats([]));
    reset();

    const newScreenIndex = currentScreenIndex - 1;
    dispatch(setCurrentScreenIndex(newScreenIndex));

    const abortController = new AbortController();
    dispatch(
      getScreen(screensNamesForInput[newScreenIndex].value, abortController)
    );
  };

  const onNextForm = () => {
    dispatch(setNumberOfRowsWithoutRepeats([]));
    reset();

    const newScreenIndex = currentScreenIndex + 1;
    dispatch(setCurrentScreenIndex(newScreenIndex));

    const abortController = new AbortController();
    dispatch(
      getScreen(screensNamesForInput[newScreenIndex].value, abortController)
    );
  };

  const handleChangeForm = async (value: number) => {
    dispatch(setNumberOfRowsWithoutRepeats([]));
    reset();

    screensNamesForInput.forEach((item, index) => {
      if (item.value === value) {
        dispatch(setCurrentScreenIndex(index));
      }
    });

    const abortController = new AbortController();
    dispatch(getScreen(value, abortController));
  };

  useHotKeys({
    onButtonNext: currentScreenIndex !== maxScreenIndex ? onNextForm : () => {},
    onButtonPrev: currentScreenIndex !== 0 ? onPrevForm : () => {},
  });

  const onSearchByAttributeName = async (
    attributeName: string | null,
    e: string
  ) => {
    if (e.length > 0) {
      const fields = await dispatch(
        getFieldsByAttributeName(
          attributeName,
          e,
          screensNamesForInput[currentScreenIndex].value
        )
      );

      if (fields.length > 0 && selectedScreen) {
        const updatedFields: IField[] = selectedScreen.fields.map((item) => {
          return (
            fields.find((el) => el.attributeName === item.attributeName) || item
          );
        });
        dispatch(
          setSelectedScreen({ ...selectedScreen, fields: updatedFields })
        );
        dispatch(setLoadingForm(false));
      }
    }
  };

  const onResetForm = () => {
    const abortController = new AbortController();

    dispatch(
      getScreen(screensNamesForInput[currentScreenIndex].value, abortController)
    );
  };

  const getRelevantNode = (item: IField) => {
    const hasAttributeName = item.attributeName;

    if (!hasAttributeName) {
      return <CustomText text={item.name} />;
    }

    const attribute = item.attribute;

    if (attribute) {
      if (attribute.include?.length || false) {
        return <CustomSelect item={item} control={control} errors={errors} />;
      } else {
        return (
          <CustomField
            item={item}
            control={control}
            errors={errors}
            onSearchByAttributeName={onSearchByAttributeName}
          />
        );
      }
    }
    return (
      <CustomField
        item={item}
        control={control}
        errors={errors}
        onSearchByAttributeName={onSearchByAttributeName}
      />
    );
  };

  const renderingInternalNodes = (item: number) => {
    if (selectedScreen) {
      const filteredScreenFields = selectedScreen.fields.filter(
        (el) => el.rowPosition === item
      );
      let createdNodes: JSX.Element[] = [];
      if (filteredScreenFields.length) {
        createdNodes = filteredScreenFields.map((el) => {
          return (
            <div key={el.attributeName} className={styles.node}>
              {getRelevantNode(el)}
            </div>
          );
        });
      }
      return createdNodes;
    } else {
      return [];
    }
  };

  const showRows = numberOfRowsWithoutRepeats.map((item) => {
    return (
      <div key={item} className={styles.row}>
        {renderingInternalNodes(item)}
      </div>
    );
  });

  return (
    <LayoutContainer>
      <Forms
        showRows={showRows}
        currentScreenIndex={currentScreenIndex}
        maxScreenIndex={maxScreenIndex}
        onPrevForm={onPrevForm}
        onNextForm={onNextForm}
        screensNamesForInput={screensNamesForInput}
        handleChangeForm={handleChangeForm}
        loadingForm={loadingForm}
        handleSubmit={handleSubmit}
        onResetForm={onResetForm}
        onSubmit={onSubmit}
      />
    </LayoutContainer>
  );
};

export default FormsContainer;
