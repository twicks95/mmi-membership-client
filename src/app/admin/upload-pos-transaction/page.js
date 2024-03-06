"use client"

import { useState } from "react"
import Image from "next/image.js"
import { ConfigProvider, Upload, message } from "antd"
import Header from "@/components/header/header.jsx"

export default function UploadPOSTransaction() {
    const { Dragger } = Upload
    const [confirmLoading, setConfirmLoading] = useState(false)

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
            <Header admin title="Upload" backwardLink="/admin/home" withMapIcon={false}/>
            <div className="flex justify-between items-center text-lg font-bold">
                <div>
                    <div className="leading-5">Transaction File</div>
                    <div className="leading-5">Upload</div>
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
                <h1 className="text-base-extend font-bold mb-6">Upload transaction file from your POS system</h1>
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
                    <div className="flex flex-col">
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
                                <div className="text-sm font-bold text-[#C0C0C0]">{`Select a transaction file (.csv)`}</div>
                            </Dragger>
                        </div>

                    </div>
                    <div className="mb-3">
                        <div className="text-sm text-red-500 font-bold">*Only upload a transaction file at closing time of the day</div>
                    </div>
                </ConfigProvider>
            </div>
        </div>
    )
}
