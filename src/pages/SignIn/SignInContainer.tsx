import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISignIn } from "../../types/interfaces/ISignIn";
import { EPageRoute } from "../../types/enums/EPageRoute";
import {
  loginFetching,
  loginFetchingSuccess,
} from "../../store/reducers/SignInSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import SignIn from "./SignIn";

export const SignInContainer: FC = () => {
  const { loading } = useAppSelector((state) => state.signIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
 
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<ISignIn> = (data) => {
    console.log(data);
    dispatch(loginFetching());
    // request to server API
    setTimeout(() => {
      window.localStorage.token =
        "eyJjbGllbnRfaWQiOiJZekV6TUdkb01ISm5PSEJpT0cxaWJEaHl..."; // an example
      dispatch(
        loginFetchingSuccess({
          id: "1",
          name: "Jon Snow",
          token: "eyJjbGllbnRfaWQiOiJZekV6TUdkb01ISm5PSEJpT0cxaWJEaHl...",
          email: "john-snow@starks.com",
        })
      );
      // if status === 200
      navigate(EPageRoute.FORMS_PAGE_ROUTE);
    }, 1500);
  };

  return (
    <SignIn
      control={control}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};

export default SignInContainer;
