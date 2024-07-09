import { FC, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Input, InputRef, notification } from "antd";
import { IField } from "../../types/interfaces/ISubMenu";
import { ESubMenuFieldType } from "../../types/enums/ESubMenuFieldType";
import { EPageRoute } from "../../types/enums/EPageRoute";
import { getSubMenu } from "../../store/actions/subMenuActions";
import {
  setDefaultOpenKeys,
  setDefaultSelectedKeys,
} from "../../store/reducers/MenuSlice";
import {
  setLastInputFocus,
  setSubMenu,
} from "../../store/reducers/SubMenuSlice";
import useAbortableEffect from "../../hooks/useAbortableEffect";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getDefaultOpenKeys } from "../../helpers/getDefaultOpenKeys";
import LayoutContainer from "../../components/Layout/LayoutContainer";
import SubMenu from "./SubMenu";
import styles from "./subMenu.module.scss";

const SubMenuContainer: FC = () => {
  const { menu } = useAppSelector((state) => state.menu);
  const { subMenu, loadingSubMenu, lastInputFocus } = useAppSelector(
    (state) => state.subMenu
  );
  const dispatch = useAppDispatch();
  const { key } = useParams();
  const navigate = useNavigate();
  const lastInputRef = useRef<InputRef | null>(null);

  const handleCleanup = () => {
    dispatch(setSubMenu(null));
  };

  useAbortableEffect(
    async (abortController: AbortController) => {
      const status = await dispatch(getSubMenu(abortController, key as string));

      if (status === 200 && lastInputRef.current) {
        lastInputRef.current.focus();
      }
    },
    [],
    [handleCleanup]
  );

  useEffect(() => {
    dispatch(setDefaultSelectedKeys([key as string]));
    dispatch(setDefaultOpenKeys(getDefaultOpenKeys(menu, key as string)));
  }, [menu]);

  const onClickButton = (screenName: string | null) => {
    if (screenName) {
      notification.warning({
        description: screenName,
        message: "Using script:",
        placement: "top",
        duration: 0.5,
      });
    } else {
      navigate(EPageRoute.SETTING_PARAMS_ROUTE.replace(":key", key as string));
    }
  };

  const renderRow = (fields: IField[], screenName: string | null) => {
    if (fields.length) {
      const createdRow = fields.map((item, index) => {
        if (item.rowItemType === ESubMenuFieldType.Label) {
          if (fields.length === 0) {
            return null;
          }
          if (fields.length === 1) {
            return (
              <p
                key={index}
                className={
                  item.column !== 0
                    ? styles.titleRowCenter
                    : styles.titleRowStart
                }
              >
                {item.text}
              </p>
            );
          }
          if (fields.length > 1) {
            return (
              <p key={index} className={styles.buttonLabel}>
                {item.text}
              </p>
            );
          }
        }
        if (item.rowItemType === ESubMenuFieldType.Button) {
          return (
            <Button
              key={index}
              type="primary"
              onClick={() => onClickButton(screenName)}
              tabIndex={Number(subMenu?.tabstops.indexOf(item.name)) + 1}
            >
              {item.text}
            </Button>
          );
        }
        if (item.rowItemType === ESubMenuFieldType.Filed) {
          return (
            <div key={index} className={styles.selectionInput}>
              <Input
                ref={lastInputRef}
                onFocus={() => dispatch(setLastInputFocus(true))}
                onBlur={() => dispatch(setLastInputFocus(false))}
                tabIndex={1}
              />
            </div>
          );
        }
      });
      return createdRow;
    } else {
      return <div className={styles.emptyRow}></div>;
    }
  };

  console.log(subMenu);

  const renderForm =
    !loadingSubMenu && subMenu
      ? subMenu.form.rows.map((item) => {
          return (
            <div key={item.row} className={styles.row}>
              {renderRow(item.fields, item.screenName)}
            </div>
          );
        })
      : [];

  return (
    <LayoutContainer>
      <SubMenu
        loadingSubMenu={loadingSubMenu}
        subMenu={subMenu}
        renderForm={renderForm}
        lastInputFocus={lastInputFocus}
      />
    </LayoutContainer>
  );
};

export default SubMenuContainer;
