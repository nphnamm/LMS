
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


type Props = {

}
interface itemProps {
    title: string;
    to: string;
    icon: JSX.Element;
    selected: string;
    setSelected: any;
}
const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
    return (
        <MenuItem
            active={selected === title}
            onClick={() => setSelected(title)}
        >
            <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
            <Link href={to} />
        </MenuItem>
    )
}
const Sidebar = () => {
    const { user } = useSelector((state: any) => state.auth);
    const [logout, setLogout] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), [])
    if (!mounted) {
        return null;
    }
    const logouthandler = () => {
        setLogout(true);

    }

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${theme === "dark" ? "#111C43 !important" : "#fff !important"}`
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                    opacity: 1,
                },
                "& .pro-menu-item": {
                    color: `${theme !== "dark" && "#000"}`,
                },

            }}
            className="!bg-white dark:bg-[#111C43]"
        >
            <ProSidebar
                collapsed={isCollapsed}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: "100vh",
                    width: isCollapsed ? "0%" : "16%",
                }}
            >
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0"
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml='15px'
                            >
                                <Link href="/">
                                    <h3 className='text-[25px] font-Poppins uppercase dark:text-white text-black'>
                                        Elearning

                                    </h3>
                                </Link>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)} className='inline-block'>
                                    <ArrowBackIosIcon className='text-black dark:text-[#ffffffc1]' />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>
                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Image
                                alt="profile-user"
                                width={100}
                                height={100}
                                 src={user.avatar ? user.av}
                                />

                            </Box>
                        </Box>
                    )}
                </Menu>

            </ProSidebar>

        </Box>

    )
}
export default Sidebar