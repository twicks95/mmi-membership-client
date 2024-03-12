import React from "react";
import { Drawer } from "antd";

function AntdDrawer({
  children,
  placement = "bottom",
  closable = false,
  onClose,
  open = false,
  compKey,
  height,
  className = "",
  style,
  preventCloseWhen = false,
}) {
  return (
    <Drawer
      style={style}
      className={`${className.concat(" ", "py-10")}`}
      placement={placement}
      closable={closable}
      onClose={onClose}
      open={open}
        key={compKey}
      height={height}
      maskClosable={preventCloseWhen ? false : true}
      keyboard={preventCloseWhen ? false : true}
    >
      {children}
    </Drawer>
  );
}

export default React.memo(AntdDrawer);
