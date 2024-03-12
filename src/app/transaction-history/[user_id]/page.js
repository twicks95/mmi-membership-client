"use client"

import { DatePicker } from "antd"
import { useEffect, useState } from "react"
import Link from "next/link.js"
import Header from "@/components/header/header.jsx"
import Card from "@/components/card/Card.jsx"
import Button from "@/components/button/Button.jsx"
import dayjs from "dayjs"

export default function TransactionHistory({ params }) {
    const [userData, setUserData] = useState({})
    const [selectedDate, setSelectedDate] = useState("")
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [isGettingTransaction, setIsGettingTransaction] = useState(false)
    const [transactionHistory, setTransactionHistory] = useState(
        [
            {
                transactionMonth: "February 2024",
                transactionList: [
                    { transaction_date: "2024/02/18 10:01:22", description: "Get 70 point from transaction @Kasablanka Mall Jakarta" },
                    { transaction_date: "2024/02/04 14:21:45", description: "Shop from MMI food court Bekasi Rp 100.000" },
                    { transaction_date: "2024/02/14 20:18:50", description: "Get 100 points from Shopping @MMI Galaxy Bekasi" },
                ]
            },
            {
                transactionMonth: "December 2023",
                transactionList: [
                    { transaction_date: "2023/12/04 11:10:01", description: "Shop from MMI food court Bekasi Rp 100.000" },
                    { transaction_date: "2023/10/14 18:12:00", description: "Get 100 points from Shopping @MMI Galaxy Bekasi" },
                    { transaction_date: "2023/10/10 15:04:58", description: "Get 70 point from transaction @Kasablanka Mall Jakarta" },
                ]
            }
        ]
    )

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

    const fetchTransactionHistory = async ({ userId, method = "GET", requestBody }) => {
        setIsGettingTransaction(true)
        setTimeout(async () => {
            const requestURL = method === "GET"
                ? `http://localhost:3001/api/transaction-history/${userId}`
                : `http://localhost:3001/api/transaction-history/${userId}/filter`
            await fetch(requestURL, {
                headers: { 'Content-Type': 'application/json' }, // required
                method: method,
                body: JSON.stringify(requestBody),
            }).then(async (response) => {
                await response.json().then((data) => {
                    // setTransactionHistory((prev) => {
                    //     console.log({prev})
                    //     // return { ...prev, ...data.data }
                    // })
                    return
                }).catch(() => {
                    throw new Error('No JSON returned')
                })

                return
            }).catch(() => {
                throw new Error('Failed to fetch data')
            })

            setIsGettingTransaction(false)
        }, 2500)
    }

    useEffect(() => {
        fetchUser({ userId: params.user_id })
        fetchTransactionHistory({ userId: params.user_id })
    }, [params])

    // useEffect(() => {
    //     console.log({ selectedDate })
    // }, [selectedDate])

    const handleSelectDate = (date) => {
        setSelectedDate(date)
    }

    const handleApplyFilter = () => {
        setConfirmLoading(true)
        setTimeout(() => {
            fetchTransactionHistory({
                userId: params.user_id, method: "POST",
                requestBody: { filterDate: selectedDate }
            })

            console.log("Filter applied")
            setConfirmLoading(false)
        }, 2500)
    }

    return (
        <div className="py-[18%]">
            <Header title="Transaction History" userData={userData} />
            <div className="mb-7">
                <h1 className="text-base-extend font-bold mb-3">Filter History</h1>
                <div className="mb-3">
                    <Card className="!px-[1.125rem]">
                        <div className="flex flex-col w-full" style={{ borderRadius: "10px" }}>
                            <div className="flex justify-between items-center mb-4">
                                <span className="w-2/4 text-base-extend font-medium mr-2">Select month</span>
                                <DatePicker
                                    style={{
                                        background: "#F6F6F6",
                                        height: "34px",
                                        width: "100%",
                                    }}
                                    format="MMMM YYYY"
                                    picker="month"
                                    onChange={(v) => {
                                        v && handleSelectDate(v.set("date", 1).toISOString())
                                    }}
                                />
                            </div>
                            <Button
                                text="Apply filter"
                                htmlType="submit"
                                loading={confirmLoading}
                                className="h-[38px] rounded-[10px] bg-[#0A24AD] hover:bg-[#3A4FBC] text-sm text-white hover:!text-white"
                                onClick={handleApplyFilter}
                            />
                        </div>
                    </Card>
                </div>
            </div>
            {transactionHistory && transactionHistory.map((history, i) => {
                return (
                    <div key={i} className="mb-7">
                        <div className="text-base-extend font-bold mb-3">{
                            history.transactionMonth.split(" ")[0] === dayjs(new Date()).format('MMMM')
                                && history.transactionMonth.split(" ")[1] === dayjs(new Date()).format('YYYY')
                                ? "This Month"
                                : history.transactionMonth
                        }</div>
                        {
                            history.transactionList.length > 0 && history.transactionList.map((transaction, i) => (
                                <Card key={i} className="mb-2 !bg-white" style={{ paddingLeft: "1.125rem", paddingRight: "1.125rem" }}>
                                    <div className="flex flex-col">
                                        <p className="text-xs font-bold mb-1">{transaction.transaction_date}</p>
                                        <p className="text-sm">{transaction.description}</p>
                                    </div>
                                </Card>
                            ))
                        }
                    </div>
                )
            })}
        </div>
    )
}
