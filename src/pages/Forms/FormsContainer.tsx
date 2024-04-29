/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import fakeStore from "../../store/fakeStore.json";
import { IScreenData, IScreenField } from "../../types/interfaces/IScreenData";
import { generateUniqueId } from "../../helpers/generateUniqueID";
import CustomTex from "../../components/CustomText/CustomText";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import styles from "./forms.module.scss";
import Forms from "./Forms";

const FormsContainer: FC = () => {
  const [currentForm, setCurrentForm] = useState<number>(0);
  const [selectedScreen, setSelectedScreen] = useState<IScreenData>(
    fakeStore[currentForm]
  );
  const [numberOfRowsWithoutRepeats, setNumberOfRowsWithoutRepeats] = useState<
    number[]
  >([]);
  const [loadingForm, setLoadingForm] = useState<boolean>(false);

  const { handleSubmit, control, reset, formState: { errors } } = useForm<any>();
  const onSubmit: SubmitHandler<any> = (data) => console.log(data);

  useEffect(() => {
    setSelectedScreen(fakeStore[currentForm]);
  }, [currentForm]);

  useEffect(() => {
    const tempNumberOfRowsWithRepeats: number[] = [];
    selectedScreen.Screen.Fields.ScreenField.forEach((item) => {
      tempNumberOfRowsWithRepeats.push(item.RowPosition);
    });
    setNumberOfRowsWithoutRepeats([...new Set(tempNumberOfRowsWithRepeats)]);
  }, [selectedScreen.Screen.Fields.ScreenField]);

  const onPrevForm = () => {
    setLoadingForm(true);
    reset();
    setTimeout(() => {
      setCurrentForm((prev) => prev - 1);
      setLoadingForm(false);
    }, 500);
  };

  const onNextForm = () => {
    setLoadingForm(true);
    reset();
    setTimeout(() => {
      setCurrentForm((prev) => prev + 1);
      setLoadingForm(false);
    }, 500);
  };

  const getRelevantNode = (item: IScreenField) => {
    const hasAttributeName = Object.hasOwnProperty.call(item, "AttributeName");
    const hasAttribute = Object.hasOwnProperty.call(item, "Attribute");

    if (!hasAttributeName) {
      return <CustomTex text={item.Name} />;
    }

    if (!hasAttribute) {
      return (
        <CustomInput item={item} control={control} errors={errors} />
      );
    }

    if (!Object.hasOwnProperty.call(item.Attribute, "Lookup")) {
      return (
        <CustomInput item={item} control={control} errors={errors} />
      );
    }

    return (
      <CustomSelect item={item} control={control} errors={errors}/>
    );
  };

  const renderingInternalNodes = (item: number) => {
    const filteredScreenFields =
      selectedScreen.Screen.Fields.ScreenField.filter(
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
      currentForm={currentForm}
      onPrevForm={onPrevForm}
      onNextForm={onNextForm}
      loadingForm={loadingForm}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    />
  );
};

export default FormsContainer;
