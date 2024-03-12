import { ConfigProvider, Input } from "antd";

export default function inputText({
  placeholder,
  prefix = null,
  suffix = null,
}) {
  return (
    <ConfigProvider
      // input={}
      theme={{
        token: {
          /* here is your global tokens */
        },
      }}
    >
      <Input placeholder={placeholder} prefix={prefix} suffix={suffix} />
    </ConfigProvider>
  );
}
