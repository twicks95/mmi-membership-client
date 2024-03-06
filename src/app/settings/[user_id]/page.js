"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import Link from "next/link.js"
import Header from "@/components/header/header.jsx"
import Card from "../../../components/card/card.jsx"

export default function Settings({ params }) {
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

    const handleLogout = () => {
        console.log("remove storage")
        window.localStorage.removeItem("myVouchers")
    }

    return (
        <div style={{ marginTop: "18%" }}>
            <Header title="Settings" userData={userData} />
            <div className="mb-5">
                <h1 className="text-base-extend font-bold mb-3">Account</h1>
                <div className="mb-3">
                    <Link href={`/`} onClick={handleLogout} >
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
            <div>
                <h1 className="text-base-extend font-bold mb-3">More info and support</h1>
                <div className="mb-3">
                    <Link href="/transaction-history">
                        <Card>
                            <div>
                                <Image
                                    src="/assets/icons/help.svg"
                                    width={14}
                                    height={14}
                                    alt="help"
                                    priority
                                />
                            </div>
                            <span className="text-sm font-bold ml-1">Help</span>
                        </Card>
                    </Link>
                </div>
                <div className="mb-3">
                    <Link href="/transaction-history">
                        <Card>
                            <div>
                                <Image
                                    src="/assets/icons/about.svg"
                                    width={14}
                                    height={14}
                                    alt="about"
                                    priority
                                />
                            </div>
                            <span className="text-sm font-bold ml-1">About</span>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    )
}
