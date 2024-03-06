import { ConfigProvider, DatePicker, Image } from "antd";

export default function inputDate({
  format = "DD MMMM YYYY",
  data = {},
  setFormData = () => {},
  className = "",
}) {
  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            DatePicker: {
              // addonBg: "rgb(0,0,0)",
              // fontSize: "12px"
            },
          },
        }}
      >
        <DatePicker
          // suffixIcon={
          //   <Image
          //     src="/assets/icons/circle-down-regular.svg"
          //     width={14}
          //     height={14}
          //     alt="date"
          //     priority
          //     className="!bg-white cursor-pointer"
          //   />
          // }
          className={`${className.concat(" ", `relative`)}`}
          style={{
            background: "#F6F6F6",
            height: "3.125rem",
            width: "100%",
            boxShadow: "0 1px 4px 0 rgba(73, 73, 73, 0.15)",
          }}
          format={format}
          onChange={(date, dateString) =>
            setFormData({ ...data, birthDate: dateString })
          }
        />
      </ConfigProvider>
    </div>
  );
}
