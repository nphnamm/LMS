import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { IconButton, Typography, Box } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CategoryIcon from "@mui/icons-material/Category";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Image from "next/image";
import avatarDefault from "../../../../public/images/avatar.png";

const Sidebar: React.FC<{ collapsed: boolean; setCollapsed: React.Dispatch<React.SetStateAction<boolean>> }> = ({ collapsed, setCollapsed }) => {
    const [selected, setSelected] = useState<string>("Dashboard");

    const handleToggle = () => {
        setCollapsed(!collapsed);
    };
    const handleMenuItemClick = (item: string) => {
        setSelected(item);
    };

    const getMenuItemStyle = (item: string) => ({
        backgroundColor: selected === item ? "#3b82f6" : "transparent",
        color: selected === item ? "#FFF" : "#A0AEC0",
    });
    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "100vh",
                display: "flex",
                color: "#FFF",
                transition: "width 0.3s ease",
            }}
        >
            <ProSidebar collapsed={collapsed}
            // style={{
            //     backgroundColor: "#1A202C",
            //     height: "100vh",
            //     overflow: "hidden",
            //     width: "100%", // Sidebar chiếm toàn bộ chiều ngang Box
            // }}
            >

                {/* Sidebar Header */}
                <Box
                    sx={{
                        padding: "10px",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {!collapsed && (
                        <Typography variant="h6" sx={{ color: "#FFF" }}>
                            ELEARNING
                        </Typography>
                    )}
                    <IconButton onClick={handleToggle} sx={{ color: "#FFF" }}>
                        {collapsed ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
                    </IconButton>
                </Box>

                {/* Avatar Section */}
                {!collapsed && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            marginBottom: "10px",
                        }}
                    >
                        <Image
                            src={avatarDefault}
                            alt="avatar"
                            width={50}
                            height={50}
                            style={{ borderRadius: "50%" }}
                        />
                        <Typography variant="body1" sx={{ color: "#FFF", marginTop: "5px" }}>
                            Shahriar Sajeeb
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#A0AEC0" }}>
                            Admin
                        </Typography>
                    </Box>
                )}


                {/* Menu */}
                <Menu iconShape="circle">
                <MenuItem
                        icon={<HomeOutlinedIcon />}
                        onClick={() => handleMenuItemClick("Dashboard")}
                        style={getMenuItemStyle("Dashboard")}

                    >
                        {!collapsed && "Dashboard"}
                    </MenuItem>

                    {/* Data Section */}
                    {!collapsed && (
                        <Typography variant="body2" sx={{ color: "#A0AEC0", margin: "10px 20px" }}>
                            Data
                        </Typography>
                    )}
                    <MenuItem
                        icon={<GroupsIcon />}
                        onClick={() => handleMenuItemClick("Users")}
                        style={getMenuItemStyle("Users")}

                    >
                        Users
                    </MenuItem>
                    <MenuItem
                        icon={<ReceiptOutlinedIcon />}
                        onClick={() => handleMenuItemClick("Invoices")}
                        style={getMenuItemStyle("Invoices")}

                    >
                        Invoices
                    </MenuItem>

                {/* Content Section */}
                {!collapsed && (
                    <Typography variant="body2" sx={{ color: "#A0AEC0", margin: "10px 20px" }}>
                        Content
                    </Typography>
                )}
                <MenuItem icon={<VideoLibraryIcon />}>Create Course</MenuItem>
                <MenuItem icon={<VideoLibraryIcon />}>Live Courses</MenuItem>

                {/* Customization Section */}
                {!collapsed && (
                    <Typography variant="body2" sx={{ color: "#A0AEC0", margin: "10px 20px" }}>
                        Customization
                    </Typography>
                )}
                <MenuItem icon={<CategoryIcon />}>Hero</MenuItem>
                <MenuItem icon={<HelpOutlineIcon />}>FAQ</MenuItem>
                <MenuItem icon={<CategoryIcon />}>Categories</MenuItem>

                {/* Settings */}
                {!collapsed && (
                    <Typography variant="body2" sx={{ color: "#A0AEC0", margin: "10px 20px" }}>
                        Controllers
                    </Typography>
                )}
                <MenuItem icon={<SettingsIcon />}>Manage Team</MenuItem>

                {/* Analytic */}
                {!collapsed && (
                    <Typography variant="body2" sx={{ color: "#A0AEC0", margin: "10px 20px" }}>
                        Analytics
                    </Typography>
                )}
                <MenuItem icon={<SettingsIcon />}>Courses Analytics</MenuItem>
                <MenuItem icon={<SettingsIcon />}>Orders Analytics</MenuItem>
                <MenuItem icon={<SettingsIcon />}>Users Analytics</MenuItem>
                {/* Analytic */}
                {!collapsed && (
                    <Typography variant="body2" sx={{ color: "#A0AEC0", margin: "10px 20px" }}>
                        Extras
                    </Typography>
                )}
                <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
                <MenuItem icon={<SettingsIcon />}>Logout</MenuItem>
            </Menu>
        </ProSidebar>
        </Box >
    );
};

export default Sidebar;
