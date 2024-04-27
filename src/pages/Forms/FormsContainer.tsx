import { FC, useState, useEffect } from "react";
import fakeStore from "../../store/fakeStore.json";
import { IScreenData } from "../../types/interfaces/IScreenData";
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
    setTimeout(() => {
      setCurrentForm((prev) => prev - 1);
      setLoadingForm(false);
    }, 500);
  };

  const onNextForm = () => {
    setLoadingForm(true);
    setTimeout(() => {
      setCurrentForm((prev) => prev + 1);
      setLoadingForm(false);
    }, 500);
  };

  const renderingInternalNodes = (item: number) => {
    const filteredScreenFields =
      selectedScreen.Screen.Fields.ScreenField.filter(
        (el) => el.RowPosition === item
      );
    let createdNodes: JSX.Element[] = [];
    if (filteredScreenFields.length) {
      createdNodes = filteredScreenFields.map((item) => {
        return (
          <div className={styles.node}>
            {item.Name} {item.AttributeName ? `[ ${item.AttributeName} ]` : ""}
          </div>
        );
      });
    }
    return createdNodes;
  };

  const showRows = numberOfRowsWithoutRepeats.map((item) => {
    return (
      <div key={item} className={styles.row}>
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
    />
  );
};

export default FormsContainer;
