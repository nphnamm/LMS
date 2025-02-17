import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

type Props = {
    data: any;
    id: string;
    activeVideo: number;
    setActivevideo: (activeVideo: number) => void;
};

const CourseContentMedia = ({ data, id, activeVideo, setActivevideo }: Props) => {
    const [activeBar, setActiveBar] = useState(0);
    return (
        <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
            <CoursePlayer title={data[activeVideo]?.title} videoUrl={data[activeVideo]?.videoUrl} />

            <div className="w-full flex items-center justify-between my-3">
                <div
                    className={`${styles.button}text-white !w-[unset] !min-h-[40px] !py-[unset] ${activeVideo === 0 && "!cursor-no-drop opacity-[.8]"}`}
                    onClick={() => setActivevideo(activeVideo === 0 ? 0 : activeVideo - 1)}
                >
                    <AiOutlineArrowLeft className="mr-2" />
                    Prev Lesson
                </div>
                <div
                    className={`${styles.button} !w-[unset] w-[80px] text-black dark:text-white !min-h-[40px] !py-[unset] ${data.length - 1 === activeVideo} && '!cursor-no-drop opacity-[.8]'`}
                    onClick={() =>
                        setActivevideo(data && data.length - 1 === activeVideo ? activeVideo : activeVideo + 1)
                    }
                >
                    Next Lesson
                    <AiOutlineArrowRight className="ml-2" />
                </div>
            </div>
            <h1 className="pt-2 text-[25px] font-[600]">{data[activeVideo].title}</h1>
            <br />
            <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
                {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
                    <h5
                        key={index}
                        className={`800px:text-[20px] cursor-pointer ${activeBar === index ? "text-red-500" :"text-black dark:text-white"}  `}
                        onClick={() => setActiveBar(index)}
                    >
                        {text}
                    </h5>
                ))}
            </div>
            <br />
            {activeBar === 0 && (
                <p className="text-[18px] whitespace-pre-line mb-3">{data[activeVideo]?.description}</p>
            )}
        </div>
    );
};

export default CourseContentMedia;
