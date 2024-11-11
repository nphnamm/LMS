import Image from 'next/image';
import React, { FC } from 'react'
import avatarDefault from "../../../public/images/avatar.png";

type Props = {
    user: any;
    active: number;
    avatar: string | null;
    setActive: (active: number) => void;
    logOutHandler: any;
}
const SideBarProfile: FC<Props> = ({
    user,
    active,
    avatar,
    setActive,
    logOutHandler,
}) => {
    return (
        <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? "dark:bg-slate-800 bg-white ": "bg-transparent"}`}
            >
            <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? "dark:bg-slate-800 bg-white ": "bg-transparent"}`}
                onClick={() => setActive( 1)}
            >
                <Image
                    src={user.avatar || avatar ? user.avatar || avatar : avatarDefault}
                    alt=""
                    className='w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer'
                />
                <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>
                    My accoutn
                </h5>

            </div>

        </div>
    )
}

export default SideBarProfile