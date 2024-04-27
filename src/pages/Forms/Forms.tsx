/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react";
import { Button, ConfigProvider, Input, Select, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styles from "./forms.module.scss";

type Inputs = {
  example1: string;
  example2: string;
  iceCreamType: { label: string; value: string };
};

interface FormsProps {
  showRows: JSX.Element[];
  currentForm: number;
  onPrevForm: () => void;
  onNextForm: () => void;
  loadingForm: boolean;
}

const Forms: FC<FormsProps> = ({
  showRows,
  currentForm,
  onPrevForm,
  onNextForm,
  loadingForm,
}) => {
  const { control, handleSubmit } = useForm<Inputs>({
    values: {
      example1: "test1",
      example2: "test2",
      iceCreamType: { value: "strawberry", label: "Strawberry" },
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
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
          {/* <Controller
          name="example1"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        <Controller
          name="example2"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        <Controller
          name="iceCreamType"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={[
                { value: "chocolate", label: "Chocolate" },
                { value: "strawberry", label: "Strawberry" },
                { value: "vanilla", label: "Vanilla" },
              ]}
            />
          )}
        /> */}
          {showRows.length ? (
            <div className={styles.buttonBox}>
              <ConfigProvider wave={{ disabled: true }}>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </ConfigProvider>
            </div>
          ) : null}
        </form>
      </div>
    </Spin>
  );
};

export default Forms;
