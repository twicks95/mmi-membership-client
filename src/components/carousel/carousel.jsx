import { Carousel, ConfigProvider } from "antd";
import Image from "next/image";
export default function carousel() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            /* here is your component tokens */
          },
        },
      }}
    >
      <div className="relative w-full">
        <Carousel autoplay>
          {/* loop this element */}
          <div
            style={{
              height: "160px",
              background: "#364d79",
              lineHeight: "160px",
            }}
          >
            {/* <Image
                    src={}
                /> */}
            <p>Banner 1</p>
          </div>
          <div>
            {/* <Image
                    src={}
                /> */}
            <p>Banner 2</p>
          </div>
          <div>
            {/* <Image
                    src={}
                /> */}
            <p>Banner 3</p>
          </div>
        </Carousel>
      </div>
    </ConfigProvider>
  );
}
