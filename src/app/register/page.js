"use client"

import Image from "next/image"
import { Alert, Form, Input } from "antd"
import Button from "../../components/button/Button.jsx"
import InputDate from "../../components/inputDate/inputDate.jsx"
import { useEffect, useState } from "react"
import Link from "next/link.js"
import dayjs from "dayjs"
import pageStyles from "./page.module.css"

export default function Register() {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [confirmPasswordStatus, setConfirmPasswordStatus] = useState("")
    const [registerFailed, setRegisterFailed] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [formData, setFormData] = useState({
        fullName: null,
        phoneNumber: null,
        idNumber: null,
        birthDate: null, // 1990-12-30
        email: null,
        password: null,
        confirmPassword: null
    })

    function isFormCompleted(formObject) {
        // Early exit for empty or key-less objects:
        if (!formObject || Object.keys(formObject).length === 0) {
            return false;
        }

        // Efficiently check for invalid properties:
        return !Object.values(formObject).some(value => {
            // Null, empty string, or NaN check:
            if (value === null || value === "" || (typeof value === "number" && isNaN(value))) {
                return true; // Stop iteration and return false
            }

            // Additional checks for blankness (optional):
            if (typeof value === "string" && value.trim() === "") {
                return true; // Stop iteration and return false
            }

            // Handle nested objects recursively (optional):
            if (typeof value === "object" && !Array.isArray(value)) {
                // Optimized recursive call:
                return !isFormCompleted(value); // Continue iteration if nested object fails
            }

            return false; // Property is valid, continue iteration
        });
    }

    const matchCredential = async ({ confirmPassword = false, value }) => {
        if (confirmPassword) {
            formData.password !== value
                ? setConfirmPasswordStatus("error")
                : setConfirmPasswordStatus("")
        } else {
            formData.confirmPassword !== value
                ? setConfirmPasswordStatus("error")
                : setConfirmPasswordStatus("")

        }
    }

    const handleFormSubmit = () => {
        setRegisterFailed((prev) => prev ? !prev : prev)
        if (isFormCompleted(formData)) {
            setConfirmLoading(true)
            setTimeout(async () => {
                await fetch('http://localhost:3001/api/auth/register', {
                    headers: { 'Content-Type': 'application/json' }, // required
                    method: 'POST',
                    body: JSON.stringify(formData),
                })
                    .then(async (response) => {
                        if (response.ok) {
                            response.json().then((result) => {
                                const redirectUrl = result.redirectURL
                                if (redirectUrl) {
                                    window.location.href = redirectUrl;
                                } else {
                                    console.log('Success, but no redirect URL provided');
                                }
                            }).catch((err) => {
                                console.log({ err })
                            })
                        } else {
                            response.json().then((result) => {
                                const errorMessage = result.errors[0].msg
                                setAlertMessage(errorMessage)
                                setRegisterFailed((prev) => !prev)
                                setConfirmLoading(false)
                            })
                        }
                    }).catch((err) => {
                        console.log({ err })
                    })
            }, 2500)
        } else {
            setAlertMessage("Form is incomplete. Please fill in all required fields.")
            setRegisterFailed((prev) => !prev)
        }
    }

    useEffect(() => { console.log({ formData }) }, [formData])

    return (
        <div className="my-[18%]">
            <div className="flex justify-between text-lg font-bold">
                <p className="leading-5 self-center" style={{ width: "50%" }}>Fill up your account information</p>
                <div style={{ height: "44px", width: "104px" }} className="relative mb-3">
                    <Image
                        src="/assets/images/brand-logo.png"
                        fill
                        alt="brand-logo"
                    />
                </div>
            </div>

            <Form onFinish={handleFormSubmit}>
                <div className="flex flex-col my-9">
                    {registerFailed &&
                        <Alert className="mb-4" type="error" message={<div className="text-sm font-medium">{alertMessage}</div>} banner style={{ borderRadius: "5px" }} />
                    }
                    <div className="mb-5">
                        <div className="flex mb-2">
                            <span className="font-medium">Full Name</span>
                            <div className="text-red-500 ml-1">*</div>
                        </div>
                        <div style={{ borderRadius: "5px", boxShadow: "0 1px 4px 0 rgba(73, 73, 73, 0.15)" }}>
                            <Input style={{ height: "50px" }} placeholder="full name" onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                        </div>
                    </div>
                    <div className="mb-5">
                        <div className="flex mb-2">
                            <span className="font-medium">Phone Number</span>
                            <div className="text-red-500 ml-1">*</div>
                        </div>
                        <div style={{ borderRadius: "5px", boxShadow: "0 1px 4px 0 rgba(73, 73, 73, 0.15)" }}>
                            <Input style={{ height: "50px" }} placeholder="phone number" onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
                        </div>
                    </div>
                    <div className="mb-5">
                        <div className="flex mb-2">
                            <span className="font-medium">Indonesian ID Number (KTP)</span>
                            <div className="text-red-500 ml-1">*</div>
                        </div>
                        <div style={{ borderRadius: "5px", boxShadow: "0 1px 4px 0 rgba(73, 73, 73, 0.15)" }}>
                            <Input style={{ height: "50px" }} placeholder="ID number" onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })} />
                        </div>
                    </div>

                    <div className="mb-5">
                        <div className="flex mb-2">
                            <span className="font-medium">Birth Date</span>
                            <div className="text-red-500 ml-1">*</div>
                        </div>
                        <InputDate data={formData} setFormData={setFormData} />
                    </div>

                    <div className="mb-5">
                        <div className="flex mb-2">
                            <span className="font-medium">Email Address</span>
                            <div className="text-red-500 ml-1">*</div>
                        </div>
                        <div style={{ borderRadius: "5px", boxShadow: "0 1px 4px 0 rgba(73, 73, 73, 0.15)" }}>
                            <Input style={{ height: "50px" }} placeholder="sample@email.com" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                    </div>

                    <div className="mb-5">
                        <div className="flex mb-2">
                            <span className="font-medium">Password</span>
                            <div className="text-red-500 ml-1">*</div>
                        </div>
                        <div style={{ borderRadius: "5px", boxShadow: "0 1px 4px 0 rgba(73, 73, 73, 0.15)" }}>
                            <Input.Password style={{ background: "#F6F6F6" }} placeholder="input password" onChange={(e) => {
                                setFormData({ ...formData, password: e.target.value })
                                matchCredential({ value: e.target.value })
                            }} />
                        </div>
                    </div>

                    <div className="mb-5">
                        <div className="flex mb-2">
                            <span className="font-medium">Confirm Password</span>
                            <div className="text-red-500 ml-1">*</div>
                        </div>
                        <div style={{ borderRadius: "5px", boxShadow: "0 1px 4px 0 rgba(73, 73, 73, 0.15)" }}>
                            <Input.Password status={confirmPasswordStatus} style={{ background: "#F6F6F6" }} placeholder="confirm password" onChange={(e) => {
                                setFormData({ ...formData, confirmPassword: e.target.value })
                                matchCredential({ confirmPassword: true, value: e.target.value })
                            }} />
                        </div>
                    </div>

                </div>
                <div className="mb-3">
                    <Button text="Register" htmlType="submit" loading={confirmLoading} className="bg-[#0A24AD] hover:bg-[#3A4FBC] text-white hover:!text-white" />
                </div>
                <div className="flex justify-center">
                    <Link href="/login">
                        <span className="text-sm font-bold text-[#46B2FF]">Back to login</span>
                    </Link>
                </div>
            </Form>
        </div>
    )
}
