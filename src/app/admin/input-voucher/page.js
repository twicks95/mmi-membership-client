"use client"

import { useRef, useState } from "react"
import Button from "../../../components/button/button.jsx"
import InputDate from "../../../components/inputDate/inputDate.jsx"
import Image from "next/image.js"
import { ConfigProvider, Form, Input, Upload, message } from "antd"
import Header from "@/components/header/header.jsx"

export default function InputVoucher() {
    const { Dragger } = Upload

    const [confirmLoading, setConfirmLoading] = useState(false)
    const [voucherData, setVoucherData] = useState({

    })

    const props = {

        name: 'file',
        multiple: false,
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        progress: {
            strokeColor: {
                '0%': '#0A24AD',
                '100%': '#0A24AD',
            },
            strokeWidth: 3,
            format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
        }
    };

    const fileList = [
        // {
        //     uid: '0',
        //     name: 'xxx.png',
        //     status: 'uploading',
        //     percent: 33,
        // },
        {
            uid: '-1',
            name: 'yyy.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-2',
            name: 'zzz.png',
            status: 'error',
        },
    ];

    return (
        <div className="my-[18%]">
            <Header admin title="Input voucher" backwardLink="/admin/home" withMapIcon={false}/>
            <div className="flex justify-between items-center text-lg font-bold">
                <div>
                    <div className="leading-5">Input</div>
                    <div className="leading-5">voucher</div>
                </div>
                <div>
                    <Image
                        src="/assets/images/brand-logo.png"
                        height={44}
                        width={104}
                        alt="brand-logo"
                        priority
                    />
                </div>
            </div>
            <div className="my-16">
                <h1 className="text-base-extend font-bold mb-6">Fill these field to add a new voucher</h1>
                <ConfigProvider
                    theme={{
                        components: {
                            DatePicker: {
                                // addonBg: "rgb(0,0,0)",
                                fontSize: "12px",
                            },
                            Input: {
                            }
                        },
                    }}
                >
                    <Form>
                        <div className="flex flex-col mb-9">
                            <div className="mb-5">
                                <Dragger
                                    listType="picture"
                                    // fileList={[...fileList]}
                                    {...props}
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                >
                                    <div className="flex justify-center mb-2">
                                        <Image src="/assets/icons/upload-solid.svg" height={28} width={28} alt="upload" priority />
                                    </div>
                                    <div className="text-sm font-bold text-[#C0C0C0]">{`Select and upload voucher banner (.jpg, .png)`}</div>
                                </Dragger>
                            </div>

                            <div className="mb-5">
                                <div className="flex mb-1">
                                    <div className="text-base-extend font-medium">Headline name</div>
                                    <div className="text-red-500 ml-1">*</div>
                                </div>
                                <div
                                    style={{
                                        borderRadius: "5px",
                                        boxShadow: "0 1px 4px 0 rgba(73, 73, 73, 0.15)",
                                    }}
                                >
                                    <Input
                                        className="text-base-extend font-medium h-[3.125rem]"
                                        placeholder="voucher name"
                                        onChange={(e) =>
                                            setVoucherData((prev) => ({ ...prev, voucherName: e.target.value }))
                                        }
                                    />
                                </div>
                            </div>

                            <div className="mb-5">
                                <div className="flex mb-1">
                                    <div className="text-base-extend font-medium">Expired date</div>
                                    <div className="text-red-500 ml-1">*</div>
                                </div>

                                <InputDate data={voucherData} setFormData={setVoucherData} className="font-medium" />

                            </div>

                            <div className="mb-5">
                                <div className="flex mb-1">
                                    <div className="text-base-extend font-medium">Points required to buy</div>
                                    <div className="text-red-500 ml-1">*</div>
                                </div>
                                <div
                                    style={{
                                        borderRadius: "5px",
                                        boxShadow: "0 1px 4px 0 rgba(73, 73, 73, 0.15)",
                                    }}
                                >
                                    <Input
                                        suffix={<div className="font-bold text-[#0A24AD]">points</div>}
                                        className="text-base-extend font-medium h-[3.125rem] !bg-[#f6f6f6] !hover:bg-[#f6f6f6]"
                                        placeholder="points required"
                                        onChange={(e) =>
                                            setVoucherData((prev) => ({ ...prev, pointsRequired: e.target.value }))
                                        }
                                    />
                                </div>
                            </div>

                            <div className="mb-5">
                                <div className="flex mb-1">
                                    <div className="text-base-extend font-medium">Short description</div>
                                    <div className="text-red-500 ml-1">*</div>
                                </div>
                                <div
                                    style={{
                                        borderRadius: "5px",
                                        boxShadow: "0 1px 4px 0 rgba(73, 73, 73, 0.15)",
                                    }}
                                >
                                    <Input.TextArea
                                        className="text-base-extend font-medium !bg-[#f6f6f6] !hover:bg-[#f6f6f6] !py-3"
                                        placeholder="this will be shown in voucher card"
                                        autoSize
                                        count={{ show: true, max: 120 }}
                                        maxLength={150}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex mb-1">
                                    <div className="text-base-extend font-medium">Details, terms & conditions</div>
                                    <div className="text-red-500 ml-1">*</div>
                                </div>
                                <div
                                    style={{
                                        borderRadius: "5px",
                                        boxShadow: "0 1px 4px 0 rgba(73, 73, 73, 0.15)",
                                    }}
                                >
                                    <Input.TextArea
                                        className="text-base-extend font-medium !min-h-[85px] !bg-[#f6f6f6] !hover:bg-[#f6f6f6] !py-3"
                                        placeholder="type voucher details, terms and conditions to be displayed in pop-up details"
                                        autoSize
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <Button
                                className="bg-[#0A24AD] hover:bg-[#3A4FBC] text-white hover:!text-white"
                                text="Create voucher"
                                loading={confirmLoading}
                            />
                        </div>
                    </Form>
                </ConfigProvider>
            </div>
        </div>
    )
}
