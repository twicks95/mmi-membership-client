import React, { useCallback, useImperativeHandle, useState } from "react";
import Card from "../card/Card";
import AntdDrawer from "../drawer/AntdDrawer";
import Button from "../button/Button";
import Image from "next/image";

function InputCashier({ passedInRef, userData }) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [cashierId, setCashierId] = useState("");
  const numpadNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, "clr", 0];

  useImperativeHandle(passedInRef, () => ({
    open: () => {
      setOpenDrawer(true);
    },
    close: () => {
      setOpenDrawer(false);
    },
  }));

  const handleNumPad = useCallback((e) => {
    const number = e.target.value;
    setCashierId((prev) => prev.concat("", number));
  }, []);

  const handleNumpadDelete = useCallback(() => {
    setCashierId((prev) => prev.slice(0, prev.length - 1));
  }, []);

  const handleNumpadClear = useCallback(() => {
    setCashierId("");
  }, []);

  const handleVerify = () => {
    setConfirmLoading(true);

    // proses POST method here
    setTimeout(() => {
      setConfirmLoading(false);
      setOpenDrawer(false);
      setCashierId("");

      window.location.href = `http://localhost:3000/my-vouchers/${window.localStorage.getItem("userId")}`;
    }, 3000);
  };

  const handleCloseDrawer = useCallback(() => setOpenDrawer(false), []);

  return (
    <AntdDrawer
      preventCloseWhen={confirmLoading}
      placement="bottom"
      onClose={handleCloseDrawer}
      open={openDrawer}
      compKey="bottom"
      height="90%"
    >
      <Card>
        <div className="flex flex-col items-center w-full my-12">
          <p className="text-2xl font-bold">Input Cashier ID</p>

          <div className="relative flex justify-center h-20 w-[60%] text-[3rem] font-bold my-[24px] text-[#0A24AD]">
            {cashierId}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {numpadNumber.map((num) => (
              <Button
                disabled={num === null ? true : false}
                key={num}
                text={num}
                className={`${
                  num === "clr" ? "border-none !bg-white" : ""
                } " bg-[#e9e9e9] w-[4.1rem] !h-[4rem] sm:w-[6rem] sm:!h-[6rem] !rounded-[100%] text-2.5xl sm:text-4xl"`}
                value={num}
                onClick={
                  num === "clr"
                    ? handleNumpadClear
                    : cashierId.length <= 10
                    ? handleNumPad
                    : null
                }
              />
            ))}
            <Button
              text={
                <Image
                  src="/assets/icons/delete-left-solid-grey.svg"
                  width={28}
                  height={18.4}
                  alt="delete"
                  priority
                />
              }
              className="border-none text-white w-[4rem] h-[4rem] sm:w-[6rem] sm:h-[6rem] !rounded-[50%] text-2.5xl sm:text-4xl"
              onClick={handleNumpadDelete}
              value={numpadNumber[10]}
            />
          </div>

          <Button
            disabled={cashierId.length < 1}
            value="button verify drawer"
            text="Verify Voucher"
            loading={confirmLoading}
            className="mt-12 !w-[63%] h-[38px] sm:!w-[63%] sm:h-[53px] rounded-[10px] bg-[#0A24AD] hover:bg-[#3A4FBC] text-sm sm:text-base-extend text-white hover:!text-white"
            onClick={handleVerify}
          />
        </div>
      </Card>
    </AntdDrawer>
  );
}

export default React.memo(InputCashier);
