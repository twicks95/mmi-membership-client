import React from "react";
import { Button, ConfigProvider } from "antd";

function AntButton({
  type = "default",
  disabled = false,
  text = "Button",
  htmlType = "button",
  value,
  onClick = null,
  style,
  className = "",
  loading = false,
}) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            /* here is your component tokens */
          },
        },
      }}
    >
      <Button
        className={`${
          disabled && "hover:bg-[#f4f4f4] hover:!text-[#c2c2c2]"
        } ${className.concat(" flex items-center justify-center w-full h-14 text-lg font-bold")}`}
        type={type}
        disabled={disabled}
        htmlType={htmlType}
        onClick={onClick}
        style={style}
        loading={loading}
        value={value}
      >
        {text}
      </Button>
    </ConfigProvider>
  );
}

export default React.memo(AntButton);
