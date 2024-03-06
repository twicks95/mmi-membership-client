"use client"

import Image from "next/image";
import Button from "../components/button/button.jsx"
import Link from "next/link.js";
import { Carousel, ConfigProvider } from "antd";

export default function Home() {
  const bannerCampaign = ["/assets/images/vouchers/banner1.svg", "/assets/images/vouchers/banner2.svg", "/assets/images/vouchers/banner2.svg"]

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <div className="my-[18%]">
      <div className="flex justify-between align-center text-lg font-bold">
        <p className="leading-5 self-center">Membership <br />Platform</p>
        <div style={{ height: "44px", width: "104px" }} className="relative">
          <Image
            src="/assets/images/brand-logo.png"
            fill
            alt="brand-logo" />
        </div>
      </div>

      <div className="my-9">
        <div className="mb-3">
          <Link href="/login">
            <Button text="Login" className="bg-[#0A24AD] hover:bg-[#3A4FBC] text-white hover:!text-white" />
          </Link>
        </div>
        <Link href="/register">
          <Button text="Register" className="bg-[#F6F6F6] hover:bg-[#3A4FBC] text-[#00365C] hover:!text-white" style={{ boxShadow: "0 1px 4px 0 rgba(73, 73, 73, 0.15)" }} />
        </Link>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Carousel: {
              /* here is your component tokens */
              dotActiveWidth: 8,
              dotHeight: 8,
              dotWidth: 8,
              colorBgContainer: "#0A24AD"
            },
          },
        }}
      >
        <div>
          <Carousel autoplay draggable swipe effect="scroll" afterChange={onChange} className="mt-5 mb-2" style={{ borderRadius: "10px" }}>
            {bannerCampaign.map((url, i) => (
              <div key={i} className='relative h-[80px] mb-7'>
                <Image
                  src={url} fill alt="campaign-image" priority
                  style={{ objectFit: 'cover', borderRadius: "10px", boxShadow: "0 1px 4px 0 rgba(73,73,73,0.15)" }}
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="w-full relative">
          <h1 className="text-lg font-bold mb-3">News</h1>
          <Carousel autoplay adaptiveHeight draggable swipe effect="scrollx" dotPosition="right" afterChange={onChange} style={{ borderRadius: "10px", boxShadow: "0 1px 4px 0 rgba(73,73,73,0.15)" }}>
            {[0, 0, 0].map((v, i) => (
              <div key={i} className="px-[40px] py-[30px]" style={{ borderRadius: "10px" }}>
                <h2 style={{ color: "#0A24AD", }} className="text-base font-bold mb-3">Our Newest Store is Here to Serve You Better!</h2>
                <p className="text-base-extend leading-normal mb-3" style={{ color: "#979797" }}>{`We are thrilled to announce the grand opening of our latest store branch, marking a significant milestone in our commitment to providing exceptional products and services to our valued customers. Located at Sudirman, our new store is more than just a physical space-it's a testament to our dedication to meeting your needs and exceeding your expectations.`}</p>
                <span className="text-sm font-bold text-end" style={{ color: "#979797" }}>Click to read more</span>
              </div>
            ))}
          </Carousel>
        </div>
      </ConfigProvider>
    </div>
  );
}
