"use client"

import { useEffect, useState } from "react"
import Card from "../../../components/card/Card.jsx"
import Image from "next/image.js"
import pageStyles from "./page.module.css"
import Header from "../../../components/header/header.jsx"
import moment from "moment"
import Link from "next/link.js"
import QRCode from "react-qr-code"
import { Button, ConfigProvider, Input, Skeleton, Tooltip } from "antd"
import { Helmet } from "react-helmet"

export default function Profile({ params }) {
  const pageTitle = 'Profile | Membership';
  const pageDescription = 'A user profile page';

  const [userData, setUserData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [copiedSuccess, setCopiedSuccess] = useState(false)
  
  const fetchUser = async ({ userId }) => {
    setTimeout(async () => {
      await fetch(`http://localhost:3001/api/user/${userId}`, {
        headers: { 'Content-Type': 'application/json' }, // required
        method: 'GET',
        body: JSON.stringify(),
      }).then(async (response) => {
        await response.json().then((data) => {
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
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      <div className="my-[18%]">
        <Header title="My Profile" userData={userData} />
        <div className="mb-3">
          <h1 className="text-base-extend font-bold mb-3">Member Info</h1>
          <Card>
            <div className="w-full bg-['#000571']" >
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
                      <span className="w-4/5 text-xl font-bold">{userData?.name}</span>
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
                      <span className="w-4/5 text-xl font-bold">{userData?.phone_number}</span>
                    }
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  {isLoading ?
                    <>
                      <Skeleton.Avatar
                        active
                        size="large"
                        style={{ width: "67px", height: "67px" }}
                      />
                      <Skeleton.Button
                        active
                        size="small"
                        shape="square"
                        className="mt-1"
                      />
                    </>
                    :
                    <div>
                      <div className={`${pageStyles.avatar}`} />
                      <Link href={`/profile/${userData.user_id}/edit`}>
                        <div className="flex w-full justify-center align-center mt-2">
                          <div>
                            <Image
                              src="/assets/svg/edit.svg"
                              height={10}
                              width={10}
                              alt="edit"
                              priority
                            // style={{ width: "auto", height: "auto" }}
                            />
                          </div>
                          <span className="text-xs font-medium ml-1">change</span>
                        </div>
                      </Link>
                    </div>
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
            <Image
              src="/assets/svg/mask.svg"
              fill
              style={{
                objectFit: 'cover',
                height: "100%",
                width: "100%",
                marginLeft: "-4px",
                marginTop: "-3px"
              }}
              alt="mask"
              priority
            />
          </Card>
        </div>

        <div className="mb-3">
          <Card className="flex-col">
            <div className="text-base-extend font-medium mb-2">Share your referal code to get more points</div>
            <div className="flex h-full">
              <div className="flex justify-between items-center rounded-[10px] w-full bg-white mr-2 border-2 border-[#D8D8D8] font-bold text-[#000571] p-3">
                <Tooltip open={copiedSuccess} title="Referal code is copied to clipboard" placement="right" autoAdjustOverflow overlayInnerStyle={{ fontSize: "10px", display: "flex", alignItems: "center" }}>
                  <div className="text-base-extend">
                    ref38uid
                  </div>
                </Tooltip>
                <div
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText("ref38uid")
                      setCopiedSuccess(true)
                      setTimeout(() => { setCopiedSuccess(false) }, 2500)
                    } catch (error) {
                      console.log("Failed to copy")
                    }
                  }}
                >
                  <Image src="/assets/icons/copy.svg" width={14} height={14} alt="copy" priority className="!bg-white cursor-pointer" />
                </div>
              </div>
              <div className="w-2/5" >
                <Button
                  icon={
                    <Image src="/assets/icons/paper-plane-white.svg" height={10} width={10} alt="share" priority />
                  }
                  className="h-full w-full flex justify-center items-center rounded-[10px] bg-[#0A24AD] hover:bg-[#3A4FBC] text-sm text-white font-bold hover:!text-white"

                >
                  Share
                </Button>
              </div>
            </div>
          </Card>
        </div>
        <div>
          {isLoading ?
            <Skeleton.Button
              active
              shape="square"
              className="!w-full !h-[5.125rem]"
            />
            :
            <Card style={{ justifyContent: "space-between" }}>
              <div>
                <QRCode value={`UID: 00000000${userData.user_id}`} size={105} level="L" bgColor="#fff" />
              </div>
              <div className="self-center text-sm font-bold">
                <span style={{ color: "#000571" }}>UID: {"00000000" + userData.user_id}</span>
              </div>
            </Card>
          }
        </div>
        <div className="my-6">
          <h1 className="text-base-extend font-bold mb-3">Member Points</h1>
          {isLoading ?
            <Skeleton.Button
              active
              shape="square"
              className="!w-full !h-[5.125rem]"
            />
            :
            <>
              <Card style={{ padding: 0 }}>
                <div className="flex w-full">
                  <div className="flex flex-col justify-center w-3/6 px-[1.125rem]">
                    <span className="text-base-extend font-bold">TIER</span>
                    <span className="text-lg font-bold">{userData.membership_type}</span>
                  </div>
                  <div className="flex w-3/6">
                    <div className={`flex justify-between w-full pl-[1.125rem] py-[1.125rem] pr-4 ${userData?.membership_type?.toLowerCase() === "silver"
                      ? pageStyles.memberPointsSilver
                      : userData?.membership_type?.toLowerCase() === "gold"
                        ? pageStyles.memberPointsGold
                        : userData?.membership_type?.toLowerCase() === "platinum"
                          ? pageStyles.memberPointsPlatinum
                          : pageStyles.memberPointsDiamond
                      }`}>
                      <div className="flex flex-col">
                        <span className="text-base-extend font-bold justify-self-end">Points</span>
                        <span className="text-lg font-bold">{userData.current_poin}</span>
                      </div>
                      <div>
                        {userData?.membership_type?.toLowerCase() === "silver"
                          ? <Image
                            src="/assets/svg/silver.svg"
                            height={23}
                            width={23}
                            alt="silver"
                            priority
                          />
                          : userData?.membership_type?.toLowerCase() === "gold"
                            ? <Image
                              src="/assets/svg/crown.svg"
                              height={23}
                              width={23}
                              alt="gold"
                              priority
                            />
                            : userData?.membership_type?.toLowerCase() === "platinum"
                              ? <Image
                                src="/assets/svg/trophy.svg"
                                height={23}
                                width={23}
                                alt="pratinum"
                                priority
                              />
                              : <Image
                                src="/assets/svg/diamond.svg"
                                height={23}
                                width={23}
                                alt="diamond"
                                priority
                              />
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          }
        </div>
        <div className="mb-3">
          <Link href={`/transaction-history/${userData.user_id}`}>
            <Card>
              <span className="text-sm font-bold">My Transaction History</span>
            </Card>
          </Link>
        </div>
        <div>
          <Link href={`/settings/${userData.user_id}`}>
            <Card>
              <span className="text-sm font-bold">Settings</span>
            </Card>
          </Link>
        </div>
      </div >
    </>
  )
}