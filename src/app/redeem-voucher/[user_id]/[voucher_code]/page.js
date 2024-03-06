"use client"

import Header from "@/components/header/header";
import { useEffect, useState } from "react";
import QRCode from 'react-qr-code';
import Card from "../../../../components/card/card.jsx"
import Button from "@/components/button/button.jsx"

export default function RedeemVoucher({ params }) {
    const [userData, setUserData] = useState({})

    const fetchUser = async ({ userId }) => {
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
    }

    useEffect(() => {
        fetchUser({ userId: params.user_id })
    }, [params])

    return (
        <div className="flex items-center py-[18%]">
            <Header title="Redeem Voucher" userData={userData} />
            <Card className="justify-center items-center !py-16">
                <div className="flex flex-col justify-center items-center h-full">
                    <div className="text-lg font-bold mb-7">MMI Membership</div>
                    <div className="flex flex-col items-center mb-4">
                        <div className="font-bold">Your QR Code is ready</div>
                        <div className="text-sm">Get it scanned to apply in your transaction</div>
                    </div>

                    {/* Customize size and error correction (optional) */}
                    <div className="mb-5 border-4 border-solid border-[#0A24AD] p-2 rounded-[10px]">
                        <QRCode value={`/redeem/voucher_code/${params.voucher_code}`} size={226} level="L" bgColor="#fff" />
                    </div>
                    <div className="font-medium">----- Voucher Code -----</div>
                    <div className="font-bold">{params.voucher_code}</div>
                </div>

                <Button
                    text="Apply filter"
                    htmlType="submit"
                    // loading={confirmLoading}
                    className="h-[38px] rounded-[10px] bg-[#0A24AD] hover:bg-[#3A4FBC] text-sm text-white hover:!text-white"
                    // onClick={handleApplyFilter}
                />
            </Card>
        </div>
    )
}
