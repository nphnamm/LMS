import i18n from '@/i18n';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { HiOutlineUserCircle } from 'react-icons/hi';

export const navItemsData = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "Courses",
        url: "/courses",
    },
    {
        name: "About",
        url: "/about",
    },
    {
        name: "Policy",
        url: "/policy",
    },
    {
        name: "FAQ",
        url: "/faq",
    },
]
type Props = {
    activeItem: number;
    isMobile: boolean
}

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.language === 'vi' ? 'vi' : 'en');
    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'vi' : 'en';
        setLanguage(newLanguage);
        i18n.changeLanguage(newLanguage);
    };
 
    return (
        <>
            <div className='hidden 800px:flex'>
                {
                    navItemsData && navItemsData.map((i, index) => (
                        <Link href={`${i.url}`} key={index} passHref>
                            <span
                                className={
                                    `${activeItem === index
                                        ? "dark:text-[#37a39a] text-[crimson]"
                                        : "dark:text-white text-black"
                                    } text-[18px] px-6 font-Poppins font-[400]`
                                }
                            >
                                {t(`${i.name.toLowerCase()}`)}
                            </span>
                        </Link>
                    ))
                }
                <>
                    <div
                        className="relative inline-flex h-8 w-20 items-center rounded-full bg-gray-300 cursor-pointer p-1"
                        onClick={toggleLanguage}
                    >
                        {/* Toggle Ball */}
                        <div
                            className={`absolute h-6 w-10 rounded-full bg-white shadow-md transition-all duration-300 ${language === 'vi' ? 'translate-x-10 bg-green-500' : 'translate-x-0 bg-blue-500'
                                }`}
                        ></div>

                        {/* Text Labels */}
                        <span
                            className={`z-10 w-1/2 text-center text-sm font-semibold ${language === 'en' ? 'text-white' : 'text-gray-600'
                                }`}
                        >
                            EN
                        </span>
                        <span
                            className={`z-10 w-1/2 text-center text-sm font-semibold ${language === 'vi' ? 'text-white' : 'text-gray-600'
                                }`}
                        >
                            VI
                        </span>
                    </div>
                </>
 
            
            </div>
            {isMobile && (
                <div className="h-screen w-full  text-white flex flex-col ">
                    {/* Top Section */}
                    <div className='w-full'>
                        <div className='w-full text-center py-6'>
                            <Link
                                href={"/"}
                                className="text-[25px] font-Poppins font-[500] text-black dark:text-white"
                            >
                                Elearning
                            </Link>
                        </div>
                        <nav className="space-y-4">
                            {navItemsData.map((item, index) => (
                                <Link href={item.url} key={index}>
                                    <span
                                        className={`block py-5 text-[18px] px-6 font-Poppins font-[400] ${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"
                                            } hover:text-green-500`}
                                    >
                                        {item.name}
                                    </span>
                                </Link>
                            ))}
                        </nav>

                    </div>
                    <div className="">
                        <HiOutlineUserCircle
                            size={25}
                            className="cursor-pointer ml-5 my-2 dark:text-white text-black"
                        />
                        <br />
                        <p className="text-[16px] px-2 pl-5 text-black dark:text-white pt-4">
                            Copyright 2023 Elearning
                        </p>
                    </div>
                </div>




            )}
        </>
    )
}

export default NavItems