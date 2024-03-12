import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "antd";

export default function Header({
  title = null,
  isDashboard = false,
  userData,
  isLoading = false,
  withMapIcon = true,
  withNotificationIcon = true,
  admin = false,
}) {
  return (
    <>
      {isLoading ? (
        <>
          <div
            className={`w-full flex items-center justify-between px-6 h-12 shadow-md bg-white absolute top-0 left-0`}
          >
            <div className="flex items-center">
              <Skeleton.Avatar active size="small" shape="circle" />
              <Skeleton.Button
                active
                size="small"
                shape="round"
                className="ml-1"
              />
            </div>
            <div className="flex">
              <Skeleton.Avatar active size="small" shape="circle" />
              <Skeleton.Avatar
                active
                size="small"
                shape="circle"
                className="mx-2"
              />
              <Skeleton.Avatar active size="small" shape="circle" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex justify-center fixed top-0 left-0 right-0 z-[100000]">
            <div className="min-w-[23.437rem] w-[30rem]">
              <div
                className={`flex items-center justify-between px-6 h-12 shadow-md bg-white`}
              >
                <div className="flex items-center">
                  {isDashboard ? (
                    <Image
                      src="/assets/icons/face-smile-regular.svg"
                      width={14}
                      height={14}
                      alt="smile"
                      priority
                    />
                  ) : (
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        window.history.back();
                      }}
                    >
                      <Image
                        src="/assets/icons/circle-left-regular.svg"
                        width={14}
                        height={14}
                        alt="back"
                        priority
                      />
                    </div>
                  )}
                  <span className="ml-2 text-base-extend text-color-header-main font-medium">
                    {title}
                  </span>
                </div>
                <div className="flex">
                  {withMapIcon && (
                    <Image
                      src="/assets/icons/map-regular.svg"
                      width={14}
                      height={14}
                      alt="store-location"
                      priority
                      style={{ width: "auto", height: "auto" }}
                    />
                  )}
                  {withNotificationIcon && (
                    <Image
                      src="/assets/icons/notification-active.svg"
                      width={14}
                      height={14}
                      alt="notification"
                      priority
                      className="mx-5"
                      style={{ width: "auto", height: "auto" }}
                    />
                  )}
                  {!admin ? (
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        window.history.back();
                      }}
                    >
                      <Image
                        src="/assets/images/avatar-header.svg"
                        width={21}
                        height={21}
                        alt="avatar"
                        priority
                        style={{ width: "auto", height: "auto" }}
                      />
                    </div>
                  ) : (
                    <Image
                      src="/assets/images/avatar-header.svg"
                      width={21}
                      height={21}
                      alt="avatar"
                      priority
                      style={{ width: "auto", height: "auto" }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
