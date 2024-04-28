/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Button, ConfigProvider, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import styles from "./forms.module.scss";

interface FormsProps {
  showRows: JSX.Element[];
  currentForm: number;
  onPrevForm: () => void;
  onNextForm: () => void;
  loadingForm: boolean;
  handleSubmit: UseFormHandleSubmit<any, undefined>;
  onSubmit: SubmitHandler<any>;
}

const Forms: FC<FormsProps> = ({
  showRows,
  currentForm,
  onPrevForm,
  onNextForm,
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
              disabled={currentForm === 0}
            >
              Prev
            </Button>
            <p>Choose a form</p>
            <Button
              type="primary"
              onClick={onNextForm}
              disabled={currentForm === 2}
            >
              Next
            </Button>
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
