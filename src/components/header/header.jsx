import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "antd";

export default function Header({
  title = null,
  isDashboard = false,
  userData,
  isLoading = false,
  backwardLink = `/dashboard/${userData?.user_id}`,
  withMapIcon = true,
  withNotificationIcon = true,
  admin = false,
}) {
  console.log({ userData });
  return (
    <>
      {isLoading ? (
        <>
          <div
            className={`absolute w-full flex items-center justify-between px-6 h-12 top-0 left-0 shadow-md bg-white`}
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
          <div
            className={`w-full flex items-center justify-between px-6 h-12 absolute top-0 left-0 shadow-md bg-white`}
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
                <Link href={backwardLink}>
                  <Image
                    src="/assets/icons/circle-left-regular.svg"
                    width={14}
                    height={14}
                    alt="back"
                    priority
                  />
                </Link>
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
                <Link href={`/profile/${userData?.user_id}`}>
                  <Image
                    src="/assets/images/avatar-header.svg"
                    width={21}
                    height={21}
                    alt="avatar"
                    priority
                    style={{ width: "auto", height: "auto" }}
                  />
                </Link>
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
        </>
      )}
    </>
  );
}
