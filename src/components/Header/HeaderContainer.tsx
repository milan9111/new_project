import { FC } from "react";
import { Button, MenuProps } from "antd";
import Header from "./Header";
import { useAppSelector } from "../../hooks/redux";
import useSignOut from "../../hooks/useSignOut";

const HeaderContainer: FC = () => {
  const { currentScreenIndex, screensNamesForInput } = useAppSelector(
    (state) => state.forms
  );
  const { data } = useAppSelector((state) => state.signIn);
  const { settingParamsItem } = useAppSelector((state) => state.settingParams);
  const signOut = useSignOut();

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

  return (
    <Header
      items={items}
      title={getTitle(
        screensNamesForInput[currentScreenIndex]?.label,
        settingParamsItem?.shortDescription.default
      )}
      userName={data.name}
    />
  );
};

export default HeaderContainer;
