import { ConfigProvider, Input } from "antd";

export default function inputText({ placeholder }) {
  return (
    <ConfigProvider
      // input={}
      theme={{
        token: {
          /* here is your global tokens */
        },
      }}
    >
      <Input placeholder={placeholder} />
    </ConfigProvider>
  );
}
