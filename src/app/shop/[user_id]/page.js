"use client"

import React, { useEffect, useState } from 'react'
import Header from "../../../components/header/header"
import Link from 'next/link'
import { Button, Modal, Skeleton } from 'antd'
import moment from 'moment'
import Image from 'next/image'

export default function Shop({ params }) {
    const [userData, setUserData] = useState({})
    const [vouchers, setVouchers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isGettingVouchers, setIsGettingVouchers] = useState(false)
    const [myVouchers, setMyVouchers] = useState([])

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState(<></>);
    const [okText, setOkText] = useState("Buy")

    const dummyVouchers = [
        { voucher_code: "VDISC50FATHER", name: "Discount up to 50%", voucher_price: 1200, image: "/assets/images/vouchers/voucher1.svg", expired_at: new Date('2024-04-01T23:59:59') },
        { voucher_code: "VDISC45BESTSALE", name: "Discount 45% OFF best sale", voucher_price: 4000, image: "/assets/images/vouchers/voucher2.svg", expired_at: new Date('2024-06-14T23:59:59') },
        { voucher_code: "VBUY1GET1ADIDAS", name: "Buy 1 Get 1 for adidas item FREE!", voucher_price: 10000, image: "/assets/images/vouchers/voucher5.svg", expired_at: new Date('2024-06-20T23:59:59') },
        { voucher_code: "VDISC15DOUGH", name: "Discount 15% OFF voucher", voucher_price: 650, image: "/assets/images/vouchers/voucher3.svg", expired_at: new Date('2024-07-20T23:59:59') },
    ]

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

    const fetchVouchers = async () => {
        setTimeout(async () => {
            await fetch(`http://localhost:3001/api/vouchers`, {
                headers: { 'Content-Type': 'application/json' }, // required
                method: 'GET',
                body: JSON.stringify(),
            }).then(async (response) => {
                await response.json().then((data) => {
                    setVouchers([...data.data])
                    return
                }).catch(() => {
                    throw new Error('No JSON returned')
                })

                return
            }).catch(() => {
                throw new Error('Failed to fetch data')
            })

            setIsGettingVouchers(false)
        }, 2500)
    }

    useEffect(() => {
        const myVouchersExistsInStrg = JSON.parse(window.localStorage.getItem("myVouchers"))
        myVouchersExistsInStrg ? setMyVouchers(myVouchersExistsInStrg) : null
        setIsLoading(true)
        setIsGettingVouchers(true)
        fetchUser({ userId: params.user_id })
        fetchVouchers()
    }, [params])

    const handleOk = () => {
        setConfirmLoading(true);

        if (okText === "Buy") {
            setTimeout(() => {
                saveToLocalStorage()
                setConfirmLoading(false);
                setModalText(<p>Successfully buy a {<span className='font-bold'>voucher</span>}.</p>)
                setOkText("Go to my vouchers")
            }, 2500);
            return
        }

        setTimeout(() => {
            console.log("RETURN TO MY VOUCHER")
            // setOpen(false);
            // setConfirmLoading(false);
            window.location.href = `http://localhost:3000/my-vouchers/${userData.user_id}`
        }, 2500);

    };

    const handleCancel = () => {
        setOpen(false);
        saveToLocalStorage()
    };

    const handleBuy = ({ selectedvoucher }) => {
        setMyVouchers((prev) => {
            // const isExists = prev.find((v) => v.voucher_code === selectedvoucher.voucher_code)
            // if (isExists) {
            //     return prev
            // }
            return [selectedvoucher, ...prev]
        })

        const voucherName = selectedvoucher.name
        const voucherPrice = selectedvoucher.voucher_price
        setOpen(true);
        setModalText(<p>You are selecting a {<span className='font-bold'>{voucherName} voucher</span>} that needs {<span className='font-bold'>{voucherPrice} points</span>} to buy.</p>)
    }

    const saveToLocalStorage = () => {
        window.localStorage.setItem("myVouchers", JSON.stringify(myVouchers))
    }

    return (
        <div style={{ marginTop: "18%", marginBottom: "18%" }}>
            <Header title="Shop" userData={userData} />

            {/* modal after selecting voucher */}
            <Modal
                width={342}
                title={<div className='text-lg font-bold text-[#0A24AD]'>Buy voucher</div>}
                open={open}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                    <div key="action" className='flex justify-end mt-8'>
                        <Button key="close" className="text-sm font-bold flex justify-center items-center bg-[#F6F6F6] hover:bg-[#3A4FBC] text-[#00365C] hover:!text-white mr-2"
                            style={{ height: "32px" }}
                            onClick={handleCancel}>
                            Close
                        </Button>
                        <Button key="ok" className="text-sm font-bold flex justify-center items-center bg-[#0A24AD] hover:bg-[#3A4FBC] text-white hover:!text-white"
                            style={{ height: "32px" }}
                            onClick={handleOk}
                            loading={confirmLoading}
                        >
                            {okText}
                            {/* Got to my vouchers */}
                        </Button>
                    </div>
                ]}
            >
                {modalText}
            </Modal>

            <div className="mb-5">
                {isLoading ?
                    <Skeleton.Button
                        active
                        shape="square"
                        className="!w-full !h-[5.125rem]"
                    />
                    :
                    <div className='flex justify-between items-center text-white font-bold px-7' style={{ backgroundColor: "#0A24AD", height: "80px", borderRadius: "10px" }}>
                        <span className='text-xl'>Balance</span>
                        <div className='flex items-center'>
                            <span className='text-2xl mr-2'>{userData?.current_poin}</span>
                            <span className='text-base-extend'>pts</span>
                        </div>
                    </div>
                }
            </div>
            <div>
                <h1 className="text-base-extend font-bold mb-3" style={{ color: "#606060" }}>Vouchers for you</h1>

                {/* show dummy only for demonstration */}
                {isGettingVouchers ?
                    [0, 0, 0, 0].map((voucher, index) => {
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
                    <>
                        {
                            dummyVouchers.map((voucher, index) => {
                                return (
                                    <div key={index} className="mb-3" style={{ borderRadius: "10px", boxShadow: "0 1px 4px 0 rgba(73, 73, 73, 0.15)" }}>
                                        <div className='relative' style={{ height: "7.875rem" }}>
                                            <Image style={{ objectFit: 'cover', borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} src={voucher.image} fill alt="voucher-image" priority />
                                        </div>
                                        <div className="bg-white p-3.5" style={{ borderRadius: "0 0 10px 10px" }}>
                                            <div className='flex justify-between'>
                                                <div className="text-base-extend font-bold mb-1">{voucher.name}</div>
                                                <div className="text-sm font-bold mb-1">{voucher.voucher_price} points</div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div>
                                                    <div className="flex text-xs mb-2.5 items-center">
                                                        <div className="mr-1.5">Available until</div>
                                                        <div className="font-bold text-red-500">{moment(voucher.expired_at).format('DD MMMM YYYY')}</div>
                                                    </div>
                                                    <div>
                                                        <div className='text-xs font-bold' style={{ color: "rgba(0,0,0,0.25)" }}>Click for details</div>
                                                    </div>
                                                </div>
                                                <div className="self-end">
                                                    <Button className="text-xs font-bold h-[32px] flex justify-center items-center bg-[#0A24AD] hover:bg-[#E7EBFF] text-white"
                                                        onClick={() => handleBuy({ selectedvoucher: voucher })}>
                                                        Buy voucher
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
                }

                {/* Real vouchers from db */}
                {/* {isGettingVouchers ?
                    [0, 0, 0, 0].map((voucher, index) => {
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
                                            < Skeleton.Button
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
                    vouchers.map((voucher, index) => {
                        return (
                            <div key={index} className="mb-3" style={{ borderRadius: "10px", boxShadow: "0 1px 4px 0 rgba(73, 73, 73, 0.15)" }}>
                                <div style={{ height: "7.875rem" }}></div>
                                <div className="bg-white p-2.5" style={{ borderRadius: "0 0 10px 10px" }}>
                                    <div className='flex justify-between'>
                                        <div className="text-sm font-bold mb-1">{voucher.name}</div>
                                        <div className="text-sm font-bold mb-1">{voucher.voucher_price} points</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div>
                                            <div className="flex mb-2.5 items-center">
                                                <div className="mr-1.5" style={{ fontSize: "6px" }}>Available until</div>
                                                <div className="text-xs font-bold text-red-500">{moment(voucher.expired_at).format('D MMMM YYYY')}</div>
                                            </div>
                                            <div>
                                                <div className='font-bold' style={{ fontSize: "6px", color: "rgba(0,0,0,0.25)" }}>Click for details</div>
                                            </div>
                                        </div>
                                        <div className="self-end">
                                            <Button
                                                className="font-bold flex justify-center items-center bg-[#0A24AD] hover:bg-[#E7EBFF] text-white"
                                                style={{ height: "21px", width: "58px", fontSize: "6px" }}
                                                onClick={() => handleBuy({ selectedvoucher: voucher })}
                                            > Buy voucher
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                } */}
            </div>
        </div >
    )
}
