/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Button, ConfigProvider, Input } from "antd";
import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { ISignIn } from "../../types/interfaces/ISignIn";
import styles from "./signIn.module.scss";

interface SignInProps {
  control: Control<ISignIn, any>;
  handleSubmit: UseFormHandleSubmit<ISignIn, undefined>;
  errors: FieldErrors<ISignIn>;
  onSubmit: SubmitHandler<ISignIn>;
  loading: boolean;
}

const SignIn: FC<SignInProps> = ({
  control,
  handleSubmit,
  errors,
  onSubmit,
  loading,
}) => {
  const { Password } = Input;
  return (
    <ConfigProvider wave={{ disabled: true }}>
      <div className={styles.container}>
        <p className={styles.title}>University forms</p>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputBox}>
            <label htmlFor="username">
              User name <span className={styles.required}>*</span>
            </label>
            <Controller
              name="username"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => <Input id="username" {...field} />}
            />
            {errors.username && (
              <p className={styles.error}>User name is required.</p>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="password">
              Password <span className={styles.required}>*</span>
            </label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => <Password id="password" {...field} />}
            />
            {errors.password && (
              <p className={styles.error}>Password is required.</p>
            )}
          </div>
          <Button type="primary" htmlType="submit" loading={loading}>
            Sign in
          </Button>
        </form>
      </div>
    </ConfigProvider>
  );
};

export default SignIn;
