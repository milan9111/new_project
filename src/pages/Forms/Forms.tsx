/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Button, ConfigProvider, Select, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { ISelectScreen } from "../../types/interfaces/IScreenData";
import styles from "./forms.module.scss";

interface FormsProps {
  showRows: JSX.Element[];
  currentScreenIndex: number;
  maxScreenIndex: number;
  onPrevForm: () => void;
  onNextForm: () => void;
  screensNamesForInput: ISelectScreen[];
  handleChangeForm:
    | ((value: number, option: ISelectScreen | ISelectScreen[]) => void)
    | undefined;
  loadingForm: boolean;
  handleSubmit: UseFormHandleSubmit<any, undefined>;
  onResetForm: () => void;
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
  onResetForm,
  onSubmit,
}) => {
  return (
    <ConfigProvider wave={{ disabled: true }}>
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}
        spinning={loadingForm}
      >
        <section className={styles.forms}>
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
                showSearch
                onChange={handleChangeForm}
                value={screensNamesForInput.length ? currentScreenIndex : null}
                options={screensNamesForInput}
                placeholder={!screensNamesForInput.length && "Loading..."}
                filterOption={(input, option) =>
                  (option?.label.toLowerCase() ?? "").includes(
                    input.toLowerCase()
                  )
                }
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              {showRows}
              {showRows.length ? (
                <div className={styles.buttonBox}>
                  <Button type="primary" danger onClick={() => onResetForm()}>
                    Reset
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </div>
              ) : null}
            </form>
          </div>
        </section>
      </Spin>
    </ConfigProvider>
  );
};

export default Forms;
