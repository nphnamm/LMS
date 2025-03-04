"use client";
import "./globals.css";
import { Inter, Josefin_Sans, Poppins } from "next/font/google";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import "../i18n"; // Import i18n để khởi tạo đa ngôn ngữ
import { SessionProvider } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Loader from "./components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import ErrorBoundary from "./hooks/errorBoundary";


// import socket from './utils/socket';
import io from 'socket.io-client';
const ENDPOINT = "http://localhost:8000";
const socket = io("ws://localhost:8000", {
    transports: ["websocket"],
  });
  

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
});

const josefin = Josefin_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-Josefin",
});

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body
                className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
            >
                <Providers>
                    <SessionProvider>
                        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                            <Custom>{children}</Custom>

                            <Toaster position="top-center" reverseOrder={false} />
                        </ThemeProvider>
                    </SessionProvider>
                </Providers>
            </body>
        </html>
    );
}
const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isLoading } = useLoadUserQuery({});
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        socket.on("connection",()=>{
            console.log('first')
        })
        setIsClient(true); // Đảm bảo chỉ render Loader trên client

   
    }, []);

    if (!isClient) {
        return null; // Trả về null trên server để tránh lỗi hydration
    }
    return (
        <>
            <ErrorBoundary>{isLoading ? <Loader /> : <>{children}</>}</ErrorBoundary>
        </>
    );
};
