"use client";

import Image from "next/image";
import { Alert, Form, Input, Space } from "antd";
import Button from "../../../components/button/button.jsx";
import { useState } from "react";
import Link from "next/link.js";

export default function Login() {
  const [formData, setFormData] = useState({});
  const [loginFailed, setLoginFailed] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleLogin = async () => {
    setConfirmLoading(true);
    setLoginFailed((prev) => (prev ? !prev : prev));
    setTimeout(async () => {
      window.location.href = 'http://localhost:3000/admin/home'
      // await fetch(`http://localhost:3001/api/auth/login`, {
      //   headers: { "Content-Type": "application/json" }, // required
      //   method: "POST",
      //   body: JSON.stringify(formData),
      // })
      //   .then(async (response) => {
      //     if (response.ok) {
      //       response
      //         .json()
      //         .then((result) => {
      //           const redirectUrl = result.redirectURL;
      //           if (redirectUrl) {
      //             window.location.href = redirectUrl;
      //           } else {
      //             console.log("Success, but no redirect URL provided");
      //           }
      //         })
      //         .catch((err) => {
      //           console.log({ err });
      //         });
      //     } else {
      //       response.json().then((result) => {
      //         // console.log({result: result.errors[0]})
      //         const errorMessage = result.errors[0].msg;
      //         setAlertMessage(errorMessage);
      //         setLoginFailed((prev) => !prev);
      //         setConfirmLoading(false);
      //       });
      //     }
      //   })
      //   .catch((err) => {
      //     console.log({ err });
      //   });
    }, 2500);
  };

  return (
    <div className="my-[18%]">
      <div className="flex flex-col text-lg font-bold">
        <div
          style={{ height: "44px", width: "104px" }}
          className="relative self-center mb-3"
        >
          <Image
            src="/assets/images/brand-logo.png"
            width={104}
            height={44}
            alt="brand-logo"
            priority
          />
        </div>
        <p className="leading-5 self-center">Admin Login</p>
      </div>

      <Form>
        <div className="flex flex-col mt-9 mb-5">
          {loginFailed && (
            <Alert
              className="mb-4"
              type="error"
              message={
                <div className="text-sm font-medium">{alertMessage}</div>
              }
              banner
              style={{ borderRadius: "5px" }}
            />
          )}
          <div className="mb-5">
            <div className="mb-2">
              <span className="font-medium">Username</span>
            </div>
            <div
              style={{
                borderRadius: "5px",
                boxShadow: "0 1px 4px 0 rgba(73, 73, 73, 0.15)",
              }}
            >
              <Input
                style={{ height: "50px" }}
                placeholder="admin username"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, memberId: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="mb-5">
            <div className="mb-2">
              <span className="font-medium">Password</span>
            </div>
            <div
              style={{
                borderRadius: "5px",
                boxShadow: "0 1px 4px 0 rgba(73, 73, 73, 0.15)",
              }}
            >
              <Input.Password
                style={{ background: "#F6F6F6" }}
                placeholder="admin password"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <Button
            className="bg-[#0A24AD] hover:bg-[#3A4FBC] text-white hover:!text-white"
            text="Login"
            onClick={handleLogin}
            loading={confirmLoading}
          />
        </div>
      </Form>
    </div>
  );
}
