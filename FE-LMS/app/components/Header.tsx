import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "./Auth/Login";
import Verification from "../components/Auth/Verification"
import SignUp from "./Auth/SignUp";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import Image from "next/image";
import avatar from "../../public/images/avatar.png";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import Loader from "./Loader/Loader";
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void
};

const Header: FC<Props> = ({ activeItem, setOpen, route, setRoute, open }) => {
  // console.log('route,', route);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [active, setActive] = useState(false);
  const { t, i18n } = useTranslation();
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation()
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  useEffect(() => {
    if (!user) {
      if (data) {
        // console.log(data);
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data?.user?.image,
          provider: data?.user?.provider,

        })
      }
    }
    if (isSuccess) {
      setRoute("/")
      toast.success("Login Sucessfully");

    }
  }, [data, isSuccess, route])

  // Modify the handleClose function
  const handleClose = (e: any) => {
    // Check if the event target is the screen (outside the modal)
    if (e.target.id === "screen") {
      setOpenSidebar(false);  // Close sidebar
    }
  };


  return (
    <div className="w-full relative">
      <div
        className={`${active
          ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
          : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
          }`}
      >

        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className="text-[25px] font-Poppins font-[500] text-black dark:text-white"
              >
                Elearning
              </Link>
              {/* <Loader /> */}
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* only for mobile */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(!openSidebar)}
                />
              </div>
              {
                user ? (
                  <Link href="/profile">
                    <Image
                      src={user.avatar?.url || avatar}
                      alt=""
                      width={30}
                      height={30}
                      className="w-[30px] h-[30px] rounded-full cursor-pointer object-cover"
                      style={{ border: activeItem === 0 ? "2px solid #37a39a" : "none" }}
                    />
                  </Link>
                ) : (
                  <div onClick={() => setRoute("Login")}>

                    <HiOutlineUserCircle
                      size={25}
                      className="hidden 800px:block cursor-pointer dark:text-white text-black"
                    />
                  </div>

                )
              }
            </div>
          </div>
        </div>

        {/* mobile sidebar */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] bg-[#00000024] dark:bg-[unset]"
            onClick={handleClose}
            id="screen"
          >

            <div className="w-[70%] fixed z-[99999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0 transition-transform transform translate-x-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer ml-5 my-2 dark:text-white text-black"
                onClick={() => setRoute("Login")}
              />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                Copyright 2023 Elearning
              </p>
            </div>
          </div>
        )}
      </div>
      {
        route === "Login" && (
          <>
            {
              open && (
                <CustomModal
                  open={open}
                  setOpen={setOpen}
                  setRoute={setRoute}
                  activeItem={activeItem}
                  component={Login}
                />
              )
            }
          </>
        )
      }
      {
        route === "Signup" && (
          <>
            {
              open && (
                <CustomModal
                  open={open}
                  setOpen={setOpen}
                  setRoute={setRoute}
                  activeItem={activeItem}
                  component={SignUp}
                />
              )
            }
          </>
        )
      }
      {
        route === "Verification" && (
          <>
            {
              open && (
                <CustomModal
                  open={open}
                  setOpen={setOpen}
                  setRoute={setRoute}
                  activeItem={activeItem}
                  component={Verification}
                />
              )
            }
          </>
        )
      }
    </div>
  );
};

export default Header;
