"use client"

import Image from "next/image"
import { Button, Form, Input, Modal, Skeleton, Space } from "antd"
// import Button from "../../../components/button/button.jsx"
import InputPin from "../../../components/inputPin/inputPin.jsx"
import { useEffect, useState } from "react"
import Link from "next/link.js"
import Header from "@/components/header/header.jsx"
import moment from "moment"

export default function MyVouchers({ params }) {
    const [userData, setUserData] = useState({})
    const [userVouchers, setUserVouchers] = useState([])
    const [userAvailableVouchers, setUserAvailableVouchers] = useState([])
    const [userExpiredVouchers, setUserExpiredVouchers] = useState([])

    const [dummyVouchers, setDummyVouchers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isGettingVouchers, setIsGettingVouchers] = useState(false)

    const fetchUserVouchers = async ({ userId }) => {
        setTimeout(async () => {
            await fetch(`http://localhost:3001/api/my-vouchers/${userId}`, {
                headers: { 'Content-Type': 'application/json' }, // required
                method: 'GET',
                body: JSON.stringify(),
            }).then(async (response) => {
                if (response.ok) {
                    await response.json().then((data) => {
                        const voucherGroup = data.data
                        const active = voucherGroup.find((group) => group.status === "active").data
                        const expired = voucherGroup.find((group) => group.status === "expired").data

                        setUserVouchers([...data.data])
                        setUserAvailableVouchers([...active])
                        setUserExpiredVouchers([...expired])
                        return
                    }).catch(() => {
                        throw new Error('No JSON returned')
                    })
                    return
                }
            }).catch(() => {
                throw new Error('Failed to fetch data')
            })

            setIsGettingVouchers(false)
        }, 2500)
    }

    const fetchUser = async ({ userId }) => {
        setTimeout(async () => {
            await fetch(`http://localhost:3001/api/user/${userId}`, {
                headers: { 'Content-Type': 'application/json' }, // required
                method: 'GET',
                body: JSON.stringify(),
            }).then(async (response) => {
                await response.json().then((data) => {
                    setUserData({ ...data.data })
                    return
                }).catch(() => {
                    throw new Error('No JSON returned')
                })

                return
            }).catch(() => {
                throw new Error('Failed to fetch data')
            })

            setIsLoading(false)
        }, 2500)
    }

    useEffect(() => {
        setIsLoading(true)
        setIsGettingVouchers(true)
        const voucherFromLocalStrg = window.localStorage.getItem("myVouchers")
        if (voucherFromLocalStrg) {
            setDummyVouchers(JSON.parse(window.localStorage.getItem("myVouchers")))
        }
        fetchUser({ userId: params.user_id })
        fetchUserVouchers({ userId: params.user_id })
    }, [params])

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState(<></>);
    const [selectedVoucher, setSelectedVoucher] = useState({ index: null, voucher: {} })

    const handleOk = () => {
        removeSelectedVOucherFromStrg(selectedVoucher)
        setConfirmLoading(true);
        removeSelectedVoucherFromList()
        setTimeout(() => {
            // setOpen(false);
            // setConfirmLoading(false);
            window.location.href = `http://localhost:3000/redeem-voucher/${userData.user_id}/${selectedVoucher.voucher.voucher_code}`
        }, 2500);
    };

    const removeSelectedVoucherFromList = () => {
        setDummyVouchers((prev) => (prev.filter((voucher, index) => index !== selectedVoucher.index)))
    }

    const handleCancel = () => {
        setOpen(false);
    };

    const handleRedeem = ({ voucher, indexList }) => {
        setOpen(true);
        setSelectedVoucher((prev) => ({ ...prev, index: indexList, voucher }))
        setModalText(
            <>
                <p className="mt-4 mb-7">
                    You are selecting a {<span className='font-bold'>{voucher.name}.</span>}
                </p>
                <div className="text-base-extend mb-7">{`Click redeem to show the voucher's code`}</div>
                <p className="font-bold text-sm text-red-500 leading-tight">Remember, only click the redeem button as you are ready for a transaction.</p>
            </>
        )
    }

    const removeSelectedVOucherFromStrg = (selectedVoucher) => {
        const updatedVouchers = JSON.parse(window.localStorage.getItem("myVouchers")).filter((voucher, index) => (index !== selectedVoucher.index))
        window.localStorage.setItem("myVouchers", JSON.stringify(updatedVouchers))
    }

    return (
        <>
            <Modal
                closeIcon={false}
                width={342}
                title={<div className='text-xl font-bold text-[#0A24AD]'>Redeem voucher</div>}
                open={open}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                    <div key="action" className='flex justify-end mt-8'>
                        <Button key="close" className="text-sm font-bold flex justify-center items-center bg-[#F6F6F6] hover:bg-[#3A4FBC] text-[#00365C] hover:!text-white mr-2"
                            style={{ height: "32px" }}
                            onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button key="ok" className="text-sm font-bold flex justify-center items-center bg-[#0A24AD] hover:bg-[#3A4FBC] text-white hover:!text-white"
                            style={{ height: "32px" }}
                            onClick={handleOk}
                            loading={confirmLoading}
                        >
                            Redeem
                        </Button>
                    </div>
                ]}
            >
                {modalText}
            </Modal>

            <div style={{ marginTop: "18%", marginBottom: "18%" }}>
                <Header title="My Vouchers" userData={userData} />
                <div className="mb-5">
                    <h1 className="text-base-extend font-bold mb-3">Active</h1>

                    {/* show dummy only for demonstration */}
                    {isGettingVouchers ?
                        [0, 0, 0].map((voucher, index) => {
                            return (
                                <div key={index} className="mb-3" style={{ borderRadius: "10px", boxShadow: "0 1px 4px 0 rgba(73, 73, 73, 0.15)" }}>
                                    <div style={{ height: "7.875rem" }}>
                                        < Skeleton.Button
                                            active
                                            shape="square"
                                            className="!w-full !h-full !h-[14px] !rounded-tl-[10px] !rounded-tr-[10px] !rounded-bl-none !rounded-br-none"
                                        />
                                    </div>
                                    <div className="bg-white p-2.5" style={{ borderRadius: "0 0 10px 10px" }}>
                                        <div className='flex justify-between mb-2'>
                                            < Skeleton.Button
                                                active
                                                shape="square"
                                                className="!w-4/5 !h-[14px]"
                                            />
                                            < Skeleton.Button
                                                active
                                                shape="square"
                                                className="!h-[14px]"
                                            />
                                        </div>
                                        <div className="flex justify-between">
                                            <div className='w-full'>
                                                <div className="flex mb-2.5 items-center">
                                                    < Skeleton.Button
                                                        active
                                                        shape="square"
                                                        className="!w-3/5 !h-[14px]"
                                                    />
                                                </div>
                                            </div>
                                            <div className="self-end">
                                                <Skeleton.Button
                                                    active
                                                    size='small'
                                                    shape="square"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        :
                        dummyVouchers.length > 0 ? dummyVouchers.map((voucher, index) => {
                            return (
                                <div key={index} className="mb-3" style={{ borderRadius: "10px", boxShadow: "0 1px 4px 0 rgba(73, 73, 73, 0.15)" }}>
                                    <div className='relative' style={{ height: "7.875rem" }}>
                                        <Image style={{ objectFit: 'cover', borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} src={voucher.image} fill alt="voucher-image" priority />
                                    </div>
                                    <div className="bg-white p-3.5" style={{ borderRadius: "0 0 10px 10px" }}>
                                        <div className='flex justify-between'>
                                            <div className="text-base-extend font-bold mb-1">{voucher.name}</div>

                                        </div>
                                        <div className="flex justify-between">
                                            <div>
                                                <div className="flex mb-2.5 items-center">
                                                    <div className="text-xs mr-1.5">Available until</div>
                                                    <div className="text-xs font-bold text-red-500">{moment(voucher.expired_at).format('DD MMMM YYYY')}</div>
                                                </div>
                                                <div>
                                                    <div className='text-xs font-bold' style={{ color: "rgba(0,0,0,0.25)" }}>Click for details</div>
                                                </div>
                                            </div>
                                            <div className="self-end">
                                                <Button
                                                    className="text-xs font-bold flex justify-center items-center h-[32px] bg-[#0A24AD] hover:bg-[#E7EBFF] text-white"
                                                    onClick={() => handleRedeem({ voucher, indexList: index })}>
                                                    Redeem now
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        }) : (
                            <div className="w-full flex justify-center">
                                <p className="text-sm font-medium">
                                    No active voucher available
                                </p>
                            </div>
                        )
                    }


                    {/* loop this component below based on active vouchers */}
                    {/* {isGettingVouchers ?
                        [0, 0, 0].map((voucher, index) => {
                            return (
                                <div key={index} className="mb-3" style={{ borderRadius: "10px", boxShadow: "0 1px 4px 0 rgba(73, 73, 73, 0.15)" }}>
                                    <div style={{ height: "7.875rem" }}>
                                        < Skeleton.Button
                                            active
                                            shape="square"
                                            className="!w-full !h-full !h-[14px] !rounded-tl-[10px] !rounded-tr-[10px] !rounded-bl-none !rounded-br-none"
                                        />
                                    </div>
                                    <div className="bg-white p-2.5" style={{ borderRadius: "0 0 10px 10px" }}>
                                        <div className='flex justify-between mb-2'>
                                            < Skeleton.Button
                                                active
                                                shape="square"
                                                className="!w-4/5 !h-[14px]"
                                            />
                                            < Skeleton.Button
                                                active
                                                shape="square"
                                                className="!h-[14px]"
                                            />
                                        </div>
                                        <div className="flex justify-between">
                                            <div className='w-full'>
                                                <div className="flex mb-2.5 items-center">
                                                    < Skeleton.Button
                                                        active
                                                        shape="square"
                                                        className="!w-3/5 !h-[14px]"
                                                    />
                                                </div>
                                            </div>
                                            <div className="self-end">
                                                <Skeleton.Button
                                                    active
                                                    size='small'
                                                    shape="square"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        :
                        userAvailableVouchers.length > 0 ?
                            userAvailableVouchers.map((voucher, index) => {
                                return (
                                    <div key={index} className="mb-3" style={{ borderRadius: "10px", boxShadow: "0 1px 4px 0 rgba(73, 73, 73, 0.15)" }}>
                                        <div style={{ height: "7.875rem" }}></div>
                                        <div className="bg-white p-2.5" style={{ borderRadius: "0 0 10px 10px" }}>
                                            <div className="text-sm font-bold mb-1">{voucher.name}</div>
                                            <div className="flex justify-between">
                                                <div>
                                                    <div className="flex mb-2.5 items-center">
                                                        <div className="mr-1.5" style={{ fontSize: "6px" }}>Available until</div>
                                                        <div className="text-xs font-bold text-red-500">{moment(voucher.expired_at).format('D MMMM YYYY')}</div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold" style={{ fontSize: "6px", color: "rgba(0,0,0,0.25)" }}>Click for detail</div>
                                                    </div>
                                                </div>
                                                <div className="self-end">
                                                    <Link href={`/redeem-voucher/${userData.user_id}/${voucher.voucher_code}`}>
                                                        <Button className="font-bold flex justify-center items-center bg-[#0A24AD] hover:bg-[#E7EBFF] text-white" style={{ height: "21px", width: "58px", fontSize: "6px" }}>Redeem now</Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : (<h1 className="text-base-extend font-bold mb-3">No active vouchers</h1>)
                    } */}

                    {/* loop based on expired vouchers */}
                    {/* {userExpiredVouchers.length > 0 ?
                        <>
                            <h1 className="text-base-extend font-bold mb-3">Expired</h1>
                            {userExpiredVouchers.map((voucher, index) => {
                                return (
                                    <>
                                        <div key={index} className="mb-3" style={{ borderRadius: "10px", boxShadow: "0 1px 4px 0 rgba(73, 73, 73, 0.15)" }}>
                                            <div style={{ height: "7.875rem" }}></div>
                                            <div className="bg-white p-2.5" style={{ borderRadius: "0 0 10px 10px" }}>
                                                <div className="text-sm font-bold mb-1">{voucher.name}</div>
                                                <div className="flex justify-between">
                                                    <div>
                                                        <div className="flex mb-2.5 items-center">
                                                            <div className="mr-1.5" style={{ fontSize: "6px" }}>Available until</div>
                                                            <div className="text-xs font-bold text-red-500">Expired</div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold" style={{ fontSize: "6px", color: "rgba(0,0,0,0.25)" }}>Click for detail</div>
                                                        </div>
                                                    </div>
                                                    <div className="self-end">
                                                        <Link href="/redeem-voucher">
                                                            <Button className="font-bold flex justify-center items-center bg-[#0A24AD] hover:bg-[#E7EBFF] text-white" style={{ height: "21px", width: "58px", fontSize: "6px" }}>Redeem now</Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </>
                        :
                        ((<h1 className="text-base-extend font-bold mb-3">No expired vouchers</h1>))
                    } */}
                </div>

            </div >
        </>
    )
}
