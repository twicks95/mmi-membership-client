import { Button, ConfigProvider } from "antd";

export default function button({
  type = "default",
  disabled = false,
  text = "Button",
  htmlType = "button",
  onClick,
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
        className={className.concat(" w-full h-14 text-lg font-bold")}
        type={type}
        disabled={disabled}
        htmlType={htmlType}
        onClick={onClick}
        style={style}
        loading={loading}
      >
        {text}
      </Button>
    </ConfigProvider>
  );
}
