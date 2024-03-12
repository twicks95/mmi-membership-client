"use client"

import { useEffect, useState } from "react"
import Card from "../../../components/card/Card.jsx"
import Image from "next/image.js"
import moment from "moment"
import Link from "next/link.js"

export default function Home({ params }) {
    // const [userData, setUserData] = useState({})
    // const [isLoading, setIsLoading] = useState(false)

    // const fetchUser = async ({ userId }) => {
    //     setTimeout(async () => {
    //         await fetch(`http://localhost:3001/api/user/${userId}`, {
    //             headers: { 'Content-Type': 'application/json' }, // required
    //             method: 'GET',
    //             body: JSON.stringify(),
    //         }).then(async (response) => {
    //             await response.json().then((data) => {
    //                 console.log({ data })
    //                 setUserData({ ...data.data, date_of_birth: moment(data.data.date_of_birth).format('D MMMM YYYY') })
    //                 return
    //             }).catch(() => {
    //                 throw new Error('No JSON returned')
    //             })

    //             return
    //         }).catch(() => {
    //             throw new Error('Failed to fetch data')
    //         })

    //         setIsLoading(false)
    //     }, 2500)
    // }

    // useEffect(() => {
    //     setIsLoading(true)
    //     fetchUser({ userId: params.user_id })
    // }, [params])

    return (
        <div className="my-[18%]">
            <div className="flex justify-between align-center text-lg font-bold">
                <p className="leading-5 self-center">Menu</p>
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

            <div className="my-9">
                <h1 className="text-base-extend font-bold mb-3">Admin access</h1>
                <div className="mb-3">
                    <Link href={`/admin/input-voucher`}>
                        <Card>
                            <span className="text-sm font-bold">Input voucher</span>
                        </Card>
                    </Link>
                </div>
                <div>
                    <Link href={`/admin/upload-pos-transaction`}>
                        <Card>
                            <span className="text-sm font-bold">Upload POS transaction file</span>
                        </Card>
                    </Link>
                </div>
            </div>

            <div>
                <h1 className="text-base-extend font-bold mb-3">Account</h1>
                <div className="mb-3">
                    <Link href={`/admin/login`}>
                        <Card>
                            <div>
                                <Image
                                    src="/assets/icons/signout.svg"
                                    width={14}
                                    height={14}
                                    alt="logout"
                                    priority
                                />
                            </div>
                            <span className="text-sm font-bold ml-1">Logout</span>
                        </Card>
                    </Link>
                </div>
            </div>
        </div >
    )
}