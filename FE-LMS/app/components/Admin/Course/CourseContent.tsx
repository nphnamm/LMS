<<<<<<< HEAD
import { styles } from '@/app/styles/style';
import React, { FC, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { FaPencilAlt } from 'react-icons/fa'; // From Font Awesome set

type Props = {
    active: number
    setActive: (active: number) => void;
    courseContentData: any;
    setCourseContentData: (setCourseContentData: any) => void;
    handleSubmit: any

}

const CourseContent: FC<Props> = ({
    courseContentData,
    setCourseContentData,
    active,
    setActive,
    handleSubmit: handleCourseSubmit
}) => {
    const [isCollapsed, setIsCollapsed] = useState(
        Array(courseContentData.length).fill(false)
    );
    const [activeSection, setActiveSection] = useState(1);
    const handleSubmit = (e: any) => {
        e.preventDefault();
    }
    const handleCollapsedToggle = (index: number) => {
        const updatedCollapsed = [...isCollapsed]
        updatedCollapsed[index] = !updatedCollapsed[index];
        setIsCollapsed(updatedCollapsed);
    }
    const handleremoveLink = (index: number, linkIndex: number) => {
        const updateData = [...courseContentData];
        updateData[index].links.splice(linkIndex, 1);
        setCourseContentData(updateData);
    }
    return (
        <div className='w-[80%] m-auto mt-24 p-3'>
            <form>
                {courseContentData?.map((item: any, index: number) => {
                    const showSectionInput = index === 0 || item.videoSection !== courseContentData[index - 1].videoSection;

                    return (
                        <>
                            <div className={`w-full bg-[#cdc8c817] p-4 ${showSectionInput ? "mt-10" : "mb-0"}`}>

                                {
                                    showSectionInput && (
                                        <>
                                            <div className='flex w-full items-center'>
                                                <input
                                                    type='text'
                                                    className={`text-[20px]
                                                          ${item.videoSection === "Untitled Section" ? "w-[170px]" : "w-min"
                                                        }  font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none
                                                        `}
                                                    value={item.videoSection}
                                                    onChange={(e) => {
                                                        const updatedData = [...courseContentData];
                                                        updatedData[index].videoSection = e.target.value;
                                                        setCourseContentData(updatedData);
                                                    }}
                                                />
                                                <FaPencilAlt className="cursor-pointer dark:text-white text-black" />


                                            </div>
                                        </>
                                    )
                                }
                                <div className='flex w-full items-center justify-between my-0'>
                                    {isCollapsed[index] ? (
                                        <>
                                            {item.title ? (
                                                <p className='font-Poppins dark:text-white text-black'>
                                                    {index + 1}. {item.title}
                                                </p>
                                            ) : (
                                                <></>
                                            )}

                                        </>
                                    ) : (
                                        <div>
                                        </div>
                                    )}
                                    {/* // arrow button for collapsed video content */}
                                    <div className='flex items-center'>
                                        <AiOutlineDelete
                                            className={`dark:text-white text-[20px] mr-2 text-black ${index > 0 ? "curosr-pointer" : "cursor-no-drop"
                                                }`}
                                            onClick={() => {
                                                if (index > 0) {
                                                    const updateData = [...courseContentData];
                                                    updateData.splice(index, 1);
                                                    setCourseContentData(updateData)
                                                }
                                            }}
                                        />
                                        {/* 
                                        <MdOutlineKeyboardArrowDown
                                            fontSize="large"
                                            className='dark:text-white text-black'
                                            style={{
                                                transform: isCollapsed[index] ? "rotate(180deg) : "rotate(0deg)",
                                        }}
                                            onClick={() => handleCollapsedToggle(index)}
                                        /> */}
                                        <MdOutlineKeyboardArrowDown
                                            fontSize="large"
                                            className='dark:text-white text-black'
                                            style={{
                                                transform: isCollapsed[index] ? "rotate(180deg)" : "rotate(0deg)"
                                            }}
                                            onClick={() => handleCollapsedToggle(index)}

                                        />

                                    </div>
                                </div>
                                {!isCollapsed[index] && (
                                    <>
                                        <div className='my-3'>
                                            <label className={styles.label}>Video Title</label>
                                            <input
                                                type='text'
                                                placeholder='Project Plan...'
                                                className={`${styles.input}`}
                                                value={item.title}
                                                onChange={(e) => {
                                                    const updateData = [...courseContentData];
                                                    updateData[index].title = e.target.value;
                                                    setCourseContentData(updateData)
                                                }}
                                            />
                                        </div>

                                        <div className='mb-3'>
                                            <label className={styles.label}>Video URL</label>
                                            <input
                                                type='text'
                                                placeholder="sdder"
                                                className={`${styles.input}`}
                                                value={item.videoUrl}
                                                onChange={(e) => {
                                                    const updateData = [...courseContentData];
                                                    updateData[index].videoUrl = e.target.value;
                                                    setCourseContentData(updateData)
                                                }}

                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label className={styles.label}>Video Description</label>
                                            <textarea
                                                rows={8}
                                                cols={30}
                                                placeholder="sdder"
                                                className={`${styles.input} !h-min py-2`}
                                                value={item.videoUrl}
                                                onChange={(e) => {
                                                    const updateData = [...courseContentData];
                                                    updateData[index].videoUrl = e.target.value;
                                                    setCourseContentData(updateData)
                                                }}

                                            />
                                            <br />
                                            <br />
                                            <br />
                                            {
                                                item?.links.map((link: any, linkIndex: number) => (
                                                    <div className='mb-3 block'>
                                                        <div className='w-full flex items-center justify-between'>
                                                            <label className={styles.label}>
                                                                Link {linkIndex + 1}

                                                            </label>
                                                            <AiOutlineDelete
                                                                className={`${linkIndex === 0
                                                                    ? "cursor-no-drop"
                                                                    : "cursor-pointer"
                                                                    } text-black dark:text-white text-[20px]`}
                                                                onClick={() => {
                                                                    linkIndex === 0 ? null : handleremoveLink(index, linkIndex)
                                                                }}
                                                            />
                                                        </div>
                                                        <input
                                                            type='text'
                                                            placeholder='Source Code...(Link title)'
                                                            className={`${styles.input}`}
                                                            value={link.title}
                                                            onChange={(e) => {
                                                                const updateData = [...courseContentData];
                                                                updateData[index].links[linkIndex].title = e.target.value;
                                                                setCourseContentData(updateData)
                                                            }}
                                                        />
                                                        <input
                                                            type='url'
                                                            placeholder='Source Code Url...(Link URL)'
                                                            className={`${styles.input} mt-6`}
                                                            value={link.url}
                                                            onChange={(e) => {
                                                                const updateData = [...courseContentData];
                                                                updateData[index].links[linkIndex].url = e.target.value;
                                                                setCourseContentData(updateData)
                                                            }}
                                                        />

                                                    </div>
                                                ))
                                            }
                                        </div>

                                    </>

                                )}

                            </div>
                        </>
                    )
                })}


            </form>

=======
import React, { FC } from 'react'
import { IoMdCheckmark } from 'react-icons/io';

type Props = {
    active:number; 
    setActive:(active:number) => void;
    courseContentData:any;
    setCourseContentData: (courseContentData:any) =>void;
    handleSubmit:any;

}

const CourseContent: FC<Props> = ({  }) => {
    const options = [
        "Course Information",
        "Course Options",
        "Course Content",
        "Course Preview"
    ]
    return (
        <div>
            {options.map((option: any, index: number) => (
                <div key={index} className={`w-full flex py-5 rounded-full`}>
                    <div
                        className={`w-[35px] h-[35px] rounded-full flex items-center justify-center ${active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
                            } relative`}
                    >
                        <IoMdCheckmark className='text-[25px]' />
                        {index !== options.length && (
                            <div
                                className={`absolute h-[30px] w-1 ${active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
                                    } bottom-[-100%]`}

                            />

                        )}
                    </div>
                    <h5 className={`pl-3 ${active === index ? "dark:text-white text-black" : "dark:text-white text-bl;ack"
                        } text-[20px]`}>
                            {option}

                    </h5>
                </div>
            ))}
>>>>>>> b393845a1fae59fa7b4de70d5d61bfcb3c5c9263
        </div>
    )
}

export default CourseContent