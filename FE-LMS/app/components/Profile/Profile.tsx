'use client'
import React, { FC, useState } from 'react'
import SideBarProfile from './SideBarProfile'
import { useLogOutQuery } from '@/redux/features/auth/authApi'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation';
import ProfileInfo from './ProfileInfo';
import ChangePassword from './ChangePassword';
type Props = {

    user: any
}

const Profile: FC<Props> = ({ user }) => {
    const [scroll, setScroll] = useState(false);
    const [avatar, setAvatar] = useState(user?.avatar?.url);
    const [active, setActive] = useState(1);
    const [logout, setLogout] = useState(false);
    const { } = useLogOutQuery(
        undefined,
        { skip: !logout ? true : false }
    );

    const logOutHandler = async () => {
        signOut();
        setLogout(true);
        redirect("/")
    }
    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 85) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        });
    }

    return (

        <div className="w-[100%] flex mx-auto h-[100vh]">
            <div
                className={` w-[60px] 800px:w-[310px] h-[450px]  ${scroll ? "top-[120px]" : "top-[30px]"} 
                dark:bg-slate-900 bg-opacity-90 border bg-white dark:border-[#ffffff1d] border-[#00000014] rounded-xl overflow-hidden shadow-sm mt-[80px] mb-[80px] sticky ${scroll ? "top-120px" : "top-[30px]"} left-[30px]`}
            >
                <SideBarProfile
                    user={user}
                    active={active}
                    avatar={avatar}
                    setActive={setActive}
                    logOutHandler={logOutHandler}
                />
            </div>
            {

                active === 1 && (
                <div className='w-full h-full bg-transparent mt-20'>
                    <ProfileInfo user={user} avatar={avatar} />
                </div>
                )
            }
            {

                active === 2 && (<div className='w-full h-full bg-transparent mt-20'>
                    <ChangePassword />
                </div>)
            }
        </div>


    )
}

export default Profile