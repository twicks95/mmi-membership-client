"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

function BottomNav() {
  const [menus, setMenus] = useState([
    {
      name: "Dashboard",
      icon: "/assets/icons/credit-card-solid-grey.svg",
      iconActive: "/assets/icons/credit-card-solid.svg",
      link: `/dashboard/${window.localStorage.getItem("userId")}`,
      active: false,
    },
    {
      name: "History",
      icon: "/assets/icons/clock-rotate-left-solid-grey.svg",
      iconActive: "/assets/icons/clock-rotate-left-solid.svg",
      link: `/transaction-history/${window.localStorage.getItem("userId")}`,
      active: false,
    },
    {
      name: "My Vouchers",
      icon: "/assets/icons/ticket-solid-grey.svg",
      iconActive: "/assets/icons/ticket-solid.svg",
      link: `/my-vouchers/${window.localStorage.getItem("userId")}`,
      active: false,
    },
    {
      name: "Profile",
      icon: "/assets/icons/user-solid-grey.svg",
      iconActive: "/assets/icons/user-solid.svg",
      link: `/profile/${window.localStorage.getItem("userId")}`,
      active: false,
    },
  ]);

  const [path, setPath] = useState("dashboard");
  useEffect(() => {
    const _path = window.location.pathname.split("/")[1];
    setPath(window.location.pathname.split("/")[1]);

    setMenus((prev) =>
      prev.map((menu) =>
        menu.name.toLowerCase() === _path
          ? { ...menu, active: true }
          : { ...menu, active: false }
      )
    );
  }, []);

  const handleChangeMenu = useCallback((_menu) => {
    setMenus((prev) =>
      prev.map((menu) =>
        menu.name.toLowerCase() === _menu.toLowerCase()
          ? { ...menu, active: true }
          : { ...menu, active: false }
      )
    );
  }, []);

  return (
    <div className="w-full flex justify-center fixed bottom-0 left-0 right-0 z-[100000]">
      <div className="flex justify-between items-center min-w-[23.437rem] w-[30rem] px-14 py-2.5 bg-white shadow-md">
        {menus.map((menu, index) => (
          <Link
            key={index}
            href={menu.link}
            onClick={() => handleChangeMenu(menu.name)}
          >
            <div className="flex flex-col items-center justify-between">
              <div
                className={`${
                  index === 0 || index === 2 ? "" : ""
                } !h-[24px] flex items-center`}
              >
                <Image
                  src={menu.active ? menu.iconActive : menu.icon}
                  width={index === 0 ? 27.18 : index === 2 ? 31.5 : 24}
                  height={index === 0 ? 21 : index === 2 ? 21 : 24}
                  alt={menu.name}
                  priority
                />
              </div>
              <div
                className={`
            ${menu.active && "text-[#0A24AD] "} text-sm font-medium`}
              >
                <p className="mt-1.5 leading-none">{menu.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default React.memo(BottomNav);
