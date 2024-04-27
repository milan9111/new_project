import { FC } from "react";
import { Button, ConfigProvider, Input, Select } from "antd";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styles from "./forms.module.scss";

type Inputs = {
  example1: string;
  example2: string;
  iceCreamType: { label: string; value: string };
};

const Forms: FC = () => {
  const { control, handleSubmit } = useForm<Inputs>({
    values: {
      example1: "test1",
      example2: "test2",
      iceCreamType: { value: "strawberry", label: "Strawberry" },
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <Controller
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
        />
        <ConfigProvider wave={{ disabled: true }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </ConfigProvider>
      </form>
    </div>
  );
};

export default Forms;
