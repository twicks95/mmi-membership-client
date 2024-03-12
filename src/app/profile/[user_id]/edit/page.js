"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Card from "../../../../components/card/Card.jsx"
import Image from "next/image.js"
import pageStyles from "./page.module.css"
import Header from "../../../../components/header/header.jsx"
import moment from "moment"
import Link from "next/link.js"
import QRCode from "react-qr-code"
import { Skeleton } from "antd"

export default function Profile({ params }) {
    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const fetchUser = async ({ userId }) => {
        setTimeout(async () => {
            await fetch(`http://localhost:3001/api/user/${userId}`, {
                headers: { 'Content-Type': 'application/json' }, // required
                method: 'GET',
                body: JSON.stringify(),
            }).then(async (response) => {
                await response.json().then((data) => {
                    // console.log({ data })
                    setUserData({ ...data.data, date_of_birth: moment(data.data.date_of_birth).format('D MMMM YYYY') })
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
        fetchUser({ userId: params.user_id })
    }, [params])

    return (
        <div style={{ margin: "18% 0" }}>
            <Header title="Edit Profile" userData={userData} />
            <div className="mb-3">
                <h1 className="text-base-extend font-bold mb-3">Member Info</h1>
                <Card style={{
                    // justifyContent: "space-between",
                    // height: "82px",
                    // width: "82px",
                    display: "block",
                    backgroundImage: "url(../../../../../../public/assets/svg/mask.svg)",
                    backgroundRepeat: "no-repeat",
                    left: 0,
                    bottom: 0,
                    zIndex: 1,
                    backgroundSize: "cover"
                }}>
                    <div style={{ color: "#000571" }} >
                        <div className="flex justify-between relative">
                            <div className="w-3/5">
                                <div className="flex flex-col">
                                    <span className="text-base-extend mb-1">Name</span>
                                    {isLoading ?
                                        <Skeleton.Button
                                            active
                                            size="small"
                                            shape="square"
                                            className="!w-full"
                                        />
                                        :
                                        <div className="flex">
                                            <span className="w-4/5 text-xl font-bold">{userData?.name}</span>
                                            <Image
                                                src="/assets/svg/edit.svg"
                                                height={10}
                                                width={10}
                                                alt="edit"
                                                priority
                                                style={{ width: "auto", height: "auto" }}
                                            />
                                        </div>
                                    }
                                </div>
                                <div className="flex flex-col my-3">
                                    <span className="text-base-extend mb-1">Phone Number</span>
                                    {isLoading ?
                                        <Skeleton.Button
                                            active
                                            size="small"
                                            shape="square"
                                            className="!w-full"
                                        />
                                        :
                                        <div className="flex">
                                            <span className="w-4/5 text-xl font-bold">{userData?.phone_number}</span>
                                            <Image
                                                src="/assets/svg/edit.svg"
                                                height={10}
                                                width={10}
                                                alt="edit"
                                                priority
                                                style={{ width: "auto", height: "auto" }}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                {isLoading ?
                                    <>
                                        <Skeleton.Avatar
                                            active
                                            size="large"
                                            style={{ width: "76px", height: "76px" }}
                                        />
                                        <Skeleton.Button
                                            active
                                            size="small"
                                            shape="square"
                                            className="mt-1"
                                        />
                                    </>
                                    :
                                    <>
                                        <div className={`${pageStyles.avatar}`} />
                                        <div className="flex w-full justify-center align-center">
                                            <Image
                                                src="/assets/svg/edit.svg"
                                                height={10}
                                                width={10}
                                                alt="edit"
                                                priority
                                                style={{ width: "auto", height: "auto" }}
                                            />
                                            <Link href="/profile/edit">
                                                <span className="text-xs font-medium ml-1">change</span>
                                            </Link>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <span className="text-base-extend mb-1">Birth Date</span>
                            {isLoading ?
                                <Skeleton.Button
                                    active
                                    size="small"
                                    shape="square"
                                    className="!w-full"
                                />
                                :
                                <span className="text-xl font-bold">{userData?.date_of_birth}</span>
                            }
                        </div>
                    </div>
                </Card>
            </div>
        </div >
    )
}