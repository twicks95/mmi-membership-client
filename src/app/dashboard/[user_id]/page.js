"use client"

import { Button, Carousel, ConfigProvider, Skeleton } from "antd"
import Header from "../../../components/header/header.jsx"
import CardTier from "../../../components/cardTier/cardTier.jsx"
// import Carousel from "../../../components/carousel/carousel.jsx"
import { useEffect, useState } from "react"
import Card from "../../../components/card/Card.jsx"
import Image from "next/image.js"
import Link from "next/link.js"
import { Helmet } from "react-helmet"


export default function Dashboard({ params }) {
    const pageTitle = 'Dashboard | Membership';
    const pageDescription = 'A user dashboard';

    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const baseIconPath = "/assets/svg/"
    const menus = ["My Vouchers", "Shop", "Settings"]
    const iconMenus = [baseIconPath.concat("voucher-logo.svg"), baseIconPath.concat("shopping-cart.svg"), baseIconPath.concat("gear-icon.svg")]
    const bannerCampaign = ["/assets/images/vouchers/banner2.svg", "/assets/images/vouchers/banner1.svg", "/assets/images/vouchers/banner2.svg"]

    const fetchUser = async ({ userId }) => {
        setTimeout(async () => {
            await fetch(`http://localhost:3001/api/user/${userId}`, {
                headers: { 'Content-Type': 'application/json' }, // required
                method: 'GET',
                body: JSON.stringify(),
            }).then(async (response) => {
                await response.json().then((data) => {
                    setUserData((prev) => ({ ...prev, ...data.data }))
                    return
                }).catch(() => {
                    throw new Error('No JSON returned')
                })

                return
            }).catch(() => {
                throw new Error('Failed to fetch data')
            })

            setIsLoading(false)
        }, 2000)
    }

    useEffect(() => {
        setIsLoading(true)
        fetchUser({ userId: params.user_id })
    }, [params])

    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
            </Helmet>
            <Header title={`Hi ${userData.name?.split(" ")[0]}`} userData={userData} isLoading={isLoading} />
            <div style={{ marginTop: "18%", marginBottom: "18%" }} className="text-base">
                {isLoading ?
                    <>
                        <Skeleton.Button
                            active
                            size="small"
                            shape="square"
                            className="!w-3/4 mb-[1rem]"
                        />
                        <Skeleton.Button
                            active
                            shape="square"
                            className="!w-full !h-[5.125rem] mb-[1.25rem]"
                        />
                        <div className="flex w-full justify-between">
                            {[0, 0, 0].map((v, index) => (
                                <Skeleton.Button
                                    key={index}
                                    active
                                    shape="square"
                                    className="!w-[5.125rem] !h-[5.125rem]"
                                />
                            ))}
                        </div>
                    </>
                    :
                    <>
                        <span className="text-base-extend font-medium">Welcome, our loyal member...!</span>
                        <CardTier membershipType={userData.membership_type} currentPoint={userData.current_poin} />
                        <div className="flex w-full justify-between">
                            {menus.map((value, index) => {
                                return (
                                    <Link key={index} href={index === 2 ? `/settings/${userData.user_id}` : index === 0 ? `/my-vouchers/${userData.user_id}` : `/shop/${userData.user_id}`}>
                                        <div key={index} className="flex flex-col items-center">
                                            <Card style={{ height: "5.125rem", width: "5.125rem", padding: "1.5rem" }} >
                                                <Image src={iconMenus[index]} width={100} height={100} alt="" priority />
                                            </Card>
                                            <span className="text-sm font-medium mt-2">{value}</span>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </>
                }
                <ConfigProvider
                    theme={{
                        components: {
                            Carousel: {
                                /* here is your component tokens */
                                dotActiveWidth: 8,
                                dotHeight: 8,
                                dotWidth: 8,
                                colorBgContainer: "#0A24AD"
                            },
                        },
                    }}
                >
                    <div>
                        <Carousel autoplay draggable swipe effect="scroll" afterChange={onChange} className="mt-5 mb-2" style={{ borderRadius: "10px" }}>
                            {bannerCampaign.map((url, i) => (
                                <div key={i} className='relative h-[80px] mb-7'>
                                    <Image style={{ objectFit: 'cover', borderRadius: "10px", boxShadow: "0 1px 4px 0 rgba(73,73,73,0.15)" }} src={url} fill alt="campaign-image" priority />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    <div className="w-full relative">
                        <h1 className="text-lg font-bold mb-3">News</h1>
                        <Carousel autoplay adaptiveHeight draggable swipe effect="scrollx" dotPosition="right" afterChange={onChange} style={{ borderRadius: "10px", boxShadow: "0 1px 4px 0 rgba(73,73,73,0.15)" }}>
                            {[0, 0, 0].map((v, i) => (
                                <div key={i} className="px-[40px] py-[30px] text-pretty" style={{ borderRadius: "10px" }}>
                                    <h2 style={{ color: "#0A24AD", }} className="text-base font-bold mb-3">Our Newest Store is Here to Serve You Better!</h2>
                                    <p className="text-base-extend leading-normal mb-3" style={{ color: "#979797" }}>{`We are thrilled to announce the grand opening of our latest store branch, marking a significant milestone in our commitment to providing exceptional products and services to our valued customers. Located at Sudirman, our new store is more than just a physical space-it's a testament to our dedication to meeting your needs and exceeding your expectations.`}</p>
                                    <span className="text-sm font-bold text-end" style={{ color: "#979797" }}>Click to read more</span>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </ConfigProvider>
            </div >
        </>
    )
}