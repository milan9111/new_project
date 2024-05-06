/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Button, ConfigProvider, Select, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { ISelectScreens } from "../../types/interfaces/IScreenData";
import styles from "./forms.module.scss";

interface FormsProps {
  showRows: JSX.Element[];
  currentScreenIndex: number;
  maxScreenIndex: number;
  onPrevForm: () => void;
  onNextForm: () => void;
  screensNamesForInput: ISelectScreens[];
  handleChangeForm:
    | ((value: number, option: ISelectScreens | ISelectScreens[]) => void)
    | undefined;
  loadingForm: boolean;
  handleSubmit: UseFormHandleSubmit<any, undefined>;
  onSubmit: SubmitHandler<any>;
}

const Forms: FC<FormsProps> = ({
  showRows,
  currentScreenIndex,
  maxScreenIndex,
  onPrevForm,
  onNextForm,
  screensNamesForInput,
  handleChangeForm,
  loadingForm,
  handleSubmit,
  onSubmit,
}) => {
  return (
    <ConfigProvider wave={{ disabled: true }}>
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}
        spinning={loadingForm}
      >
        <div className={styles.container}>
          <div className={styles.changeCurrentFormBox}>
            <Button
              type="primary"
              onClick={onPrevForm}
              disabled={currentScreenIndex === 0}
            >
              Prev
            </Button>
            <p>Choose a form</p>
            <Button
              type="primary"
              onClick={onNextForm}
              disabled={currentScreenIndex === maxScreenIndex}
            >
              Next
            </Button>
            <Select
              style={{ width: 120 }}
              onChange={handleChangeForm}
              value={screensNamesForInput.length ? currentScreenIndex : null}
              options={screensNamesForInput}
              placeholder={!screensNamesForInput.length && "Loading..."}
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {showRows}
            {showRows.length ? (
              <div className={styles.buttonBox}>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </div>
            ) : null}
          </form>
        </div>
      </Spin>
    </ConfigProvider>
  );
};

export default Forms;
