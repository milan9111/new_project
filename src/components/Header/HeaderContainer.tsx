import { FC } from "react";
import { Button, MenuProps } from "antd";
import { setShowMobileMenu } from "../../store/reducers/MenuSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import useSignOut from "../../hooks/useSignOut";
import Header from "./Header";

const HeaderContainer: FC = () => {
  const { currentScreenIndex, screensNamesForInput } = useAppSelector(
    (state) => state.forms
  );
  const { data } = useAppSelector((state) => state.signIn);
  const { settingParamsItem } = useAppSelector((state) => state.settingParams);
  const signOut = useSignOut();
  const dispatch = useAppDispatch();

  const getTitle = (
    formTitle: string | undefined,
    settingParamsTitle: string | undefined
  ): string => {
    if (formTitle) {
      return formTitle;
    }
    if (settingParamsTitle) {
      return `${settingParamsTitle} - Parameters`;
    }

    return "";
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <Button type="text" danger onClick={() => signOut(true)}>
          Sign out
        </Button>
      ),
      key: "0",
    },
  ];

  const onShowMobileMenu = () => {
    dispatch(setShowMobileMenu(true));
  };

  return (
    <Header
      items={items}
      title={getTitle(
        screensNamesForInput[currentScreenIndex]?.label,
        settingParamsItem?.shortDescription.default
      )}
      userName={data.name}
      onShowMobileMenu={onShowMobileMenu}
    />
  );
};

export default HeaderContainer;
