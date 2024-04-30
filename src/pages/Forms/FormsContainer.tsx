/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getScreens, getScreen } from "../../api";
import {
  IScreen,
  IScreenField,
  ISelectScreens,
} from "../../types/interfaces/IScreenData";
import { generateUniqueId } from "../../helpers/generateUniqueID";
import CustomTex from "../../components/CustomText/CustomText";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import styles from "./forms.module.scss";
import Forms from "./Forms";

const FormsContainer: FC = () => {
  // **** will use toolkit after fix NPM i react-redux *** //
  const [screensNames, setScreensNames] = useState<string[]>([]);
  const [screensNamesForInput, setScreensNamesForInput] = useState<
    ISelectScreens[]
  >([]);
  const [currentScreenIndex, setCurrentScreenIndex] = useState<number>(0);
  const [maxScreenIndex, setMaxScreenIndex] = useState<number>(0);
  const [selectedScreen, setSelectedScreen] = useState<IScreen | null>(null);
  const [numberOfRowsWithoutRepeats, setNumberOfRowsWithoutRepeats] = useState<
    number[]
  >([]);
  const [loadingForm, setLoadingForm] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<any>();
  const onSubmit: SubmitHandler<any> = (data) => console.log(data);

  useEffect(() => {
    setScreens();
  }, []);

  useEffect(() => {
    if (screensNames.length) {
      const tempScreensNamesForInput = screensNames.map((item, index) => ({
        label: item,
        value: index,
      }));
      setScreensNamesForInput(tempScreensNamesForInput);
    }
  }, [screensNames]);

  useEffect(() => {
    if (selectedScreen) {
      const tempNumberOfRowsWithRepeats: number[] = [];
      selectedScreen.Fields.ScreenField.forEach((item) => {
        tempNumberOfRowsWithRepeats.push(item.RowPosition);
      });
      setNumberOfRowsWithoutRepeats([...new Set(tempNumberOfRowsWithRepeats)]);
    }
  }, [selectedScreen]);

  const setScreens = async () => {
    setLoadingForm(true);

    const screens = await getScreens();
    setScreensNames(screens);
    setMaxScreenIndex(screens.length - 1);

    const screen = await getScreen(screens[currentScreenIndex]);
    setSelectedScreen(screen);

    setLoadingForm(false);
  };

  const onPrevForm = async () => {
    setLoadingForm(true);
    reset();

    const newScreenIndex = currentScreenIndex - 1;
    setCurrentScreenIndex(newScreenIndex);
    const screen = await getScreen(screensNames[newScreenIndex]);
    setSelectedScreen(screen);

    setLoadingForm(false);
  };

  const onNextForm = async () => {
    setLoadingForm(true);
    reset();

    const newScreenIndex = currentScreenIndex + 1;
    setCurrentScreenIndex(newScreenIndex);
    const screen = await getScreen(screensNames[newScreenIndex]);
    setSelectedScreen(screen);

    setLoadingForm(false);
  };

  const handleChangeForm = async (value: number) => {
    setLoadingForm(true);
    reset();

    setCurrentScreenIndex(value);
    const screen = await getScreen(screensNames[value]);
    setSelectedScreen(screen);

    setLoadingForm(false);
  };

  const getRelevantNode = (item: IScreenField) => {
    const hasAttributeName = Object.hasOwnProperty.call(item, "AttributeName");
    const hasAttribute = Object.hasOwnProperty.call(item, "Attribute");

    if (!hasAttributeName) {
      return <CustomTex text={item.Name} />;
    }

    if (!hasAttribute) {
      return <CustomInput item={item} control={control} errors={errors} />;
    }

    if (!Object.hasOwnProperty.call(item.Attribute, "Lookup")) {
      return <CustomInput item={item} control={control} errors={errors} />;
    }

    return <CustomSelect item={item} control={control} errors={errors} />;
  };

  const renderingInternalNodes = (item: number) => {
    if (selectedScreen) {
      const filteredScreenFields = selectedScreen.Fields.ScreenField.filter(
        (el) => el.RowPosition === item
      );
      let createdNodes: JSX.Element[] = [];
      if (filteredScreenFields.length) {
        createdNodes = filteredScreenFields.map((el) => {
          return (
            <div key={generateUniqueId()} className={styles.node}>
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
      <div key={generateUniqueId()} className={styles.row}>
        {renderingInternalNodes(item)}
      </div>
    );
  });

  return (
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
      onSubmit={onSubmit}
    />
  );
};

export default FormsContainer;
