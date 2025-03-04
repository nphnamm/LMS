import React, { useEffect, useState } from "react";
import { useGetHeroDataQuery, useUpdateLayoutMutation } from "@/redux/features/layout/layoutApi";
import { AiOutlineCamera } from "react-icons/ai";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
type Props = {};

const EditHero = (props: Props) => {
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const { data, refetch } = useGetHeroDataQuery("Banner", {
        refetchOnMountOrArgChange: true,
    });
    const [editLayout, { isLoading, isSuccess, error }] = useUpdateLayoutMutation();
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            setImage(data?.layout?.banner?.image.url);
            setTitle(data?.layout?.banner?.title);
            setSubTitle(data?.layout?.banner?.subTitle);
        }
        if (isSuccess) {
            refetch();
            toast.success("Hero updated successfully!");
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }
    }, [data, isSuccess, error]);
    const handleUpdate = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleEdit = async () => {
        await editLayout({
            type: "Banner",
            image,
            title,
            subTitle,
        });
    };

    return (
        <>
            {/* <div className='w-full 1000px:flex items-center'>
                <div className='absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1000px:w-[500px] 1000px:h-[500px] h-[50vh] w-[50vw] hero_animation rounded-[50%] 1100px:left-[18rem] 1500px:left-[21rem]'>
                    <div className='1000px:w-[40%] flex 1000px:min-h-screen items-center justify-center justify-end pt-[70px] 1000px:pt-[0] z-10'>
                        <div className='relative flex items-center justify-end'>
                            <img
                                src={image}
                                alt='hero'
                                className='object-contain 1100px:max-w-[90%] w-[90%] h-auto 1500px:max-w-[85%] z-[10]'
                            />
                            <input
                                type='file'
                                name=''
                                id='banner'
                                accept='image/*'
                                onChange={handleUpdate}
                                className='hidden'
                            />
                            <label htmlFor='banner' className='absolute bottom-0 right-0 z-20'>
                                <AiOutlineCamera className='dark:text-white text-black text-[18px] cursor-pointer' />

                            </label>
                        </div>
                    </div>
                    <div className='1000px:w-[60%] flex items-center justify-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]'>
                        <textarea
                            className='dark:text-white resize-none text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[60px] 1500px:text-[70px] font-Josefin '
                            placeholder='Improve your skills with us'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <br />
                        <textarea
                            value={subTitle}
                            onChange={(e) => setSubTitle(e.target.value)}
                            placeholder='We have the best courses for you'
                            className='dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[50%] 1100px:!-[74%] bg-transparent'
                        />
                        <br />
                        <br />
                        <br />
                        <div>
                           <button onClick={handleEdit}>
                            Update 
                            </button> 

                        </div>


                    </div>


                </div>


            </div > */}
            <div className="w-full 1000px:flex items-center px-12">
                <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1100px:w-[700px] 1100px:h-[600px] h-[50vh] w-[50vh] hero_animation rounded-full bg-[#defdfd] z-0"></div>
                <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10 ">
                    <div className="relative flex items-center justify-end">
                        <img
                            src={image}
                            alt="hero"
                            className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
                        />
                        <input
                            type="file"
                            name=""
                            id="banner"
                            accept="image/*"
                            onChange={handleUpdate}
                            className="hidden"
                        />
                        <label htmlFor="banner" className="absolute bottom-0 right-0 z-20">
                            <AiOutlineCamera className="dark:text-white text-black text-[18px] cursor-pointer" />
                        </label>
                    </div>
                </div>
                <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
                    <textarea
                        className="dark:text-white resize-none text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[60px] 1500px:text-[70px] font-Josefin "
                        placeholder="Improve your skills with us"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <br />
                    <textarea
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                        placeholder="We have the best courses for you"
                        className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[50%] 1100px:!-[74%] bg-transparent"
                    />
                    <br />
                    <br />
                    <br />
                    <div>
                        <button onClick={handleEdit}>Update</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditHero;
