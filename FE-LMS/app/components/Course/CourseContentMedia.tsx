import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import { useAddNewQuestionMutation } from "@/redux/features/courses/coursesApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from "react-icons/ai";
import { format } from "timeago.js";

type Props = {
    data: any;
    id: string;
    activeVideo: number;
    setActivevideo: (activeVideo: number) => void;
    user: any;
    refetch: any;
};

const CourseContentMedia = ({ data, id, activeVideo, setActivevideo, user, refetch }: Props) => {
    const [activeBar, setActiveBar] = useState(0);
    const [comment, setComment] = useState("");
    const [question, setQuestion] = useState("");
    const isReviewExist = data?.review?.find((item: any) => item.user._id === user._id);
    const [rating, setRating] = useState(0);
    const [answer, setAnswer] = useState("");
    const [addNewQuestion, { isSuccess, error, isLoading: questionCreateLoading }] = useAddNewQuestionMutation();
    const [answerId, setAnswerId] = useState("");
    const handleQuestion = () => {
        if (question.length === 0) {
            toast.error("Question can't be empty");
        } else {
            console.log(question, id, data[activeVideo]._id);
            addNewQuestion({ question, courseId: id, contentId: data[activeVideo]._id });
        }
    };
    useEffect(() => {
        if (isSuccess) {
            setQuestion("");
            refetch();
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isSuccess, error]);
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
                        className={`800px:text-[20px] cursor-pointer ${activeBar === index ? "text-red-500" : "text-black dark:text-white"}  `}
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
            {activeBar === 1 && (
                <div>
                    {data[activeVideo]?.links.map((item: any, index: number) => (
                        <div className="mb-5" key={index}>
                            <h2 className="800px:text-[20px] 800px:inline-block dark:text-white text-black">
                                {item.title && item.title + ":"}
                            </h2>
                            <a className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2" href={item.url}>
                                {item.url}
                            </a>
                        </div>
                    ))}
                </div>
            )}
            {activeBar === 2 && (
                <>
                    {" "}
                    <div className="flex w-full">
                        <Image
                            src={user?.avatar ? user.avatar.url : ""}
                            width={50}
                            height={50}
                            alt=""
                            className="rounded-full max-h-[50px] max-w-[50px]"
                        />
                        <textarea
                            name=""
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            id=""
                            rows={4}
                            cols={50}
                            placeholder="Write your question..."
                            className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
                        ></textarea>
                    </div>
                    <div className="w-full flex justify-end">
                        <div className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5`}>Submit</div>
                    </div>
                    <br />
                    <br />
                    <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
                    <div>{/*comment Reply*/}</div>
                </>
            )}
            {activeBar === 3 && (
                <div className="w-full">
                    {/*Reviews */}
                    <>
                        {!isReviewExist && (
                            <>
                                <div className="flex w-full">
                                    <Image
                                        src={user?.avatar ? user.avatar.url : ""}
                                        width={50}
                                        height={50}
                                        alt=""
                                        className="rounded-full max-h-[50px] max-w-[50px] object-cover"
                                    />
                                    <div className="w-full">
                                        <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black">
                                            Give a rating <span className="text-red-500">*</span>
                                        </h5>
                                        <div className="flex w-full ml-2 pb-3">
                                            {[1, 2, 3, 4, 5].map((i) =>
                                                rating >= i ? (
                                                    <AiFillStar
                                                        key={i}
                                                        className="mr-1 cursor-pointer"
                                                        color="rgb(246,186,0)"
                                                        size={25}
                                                        onClick={() => setRating(i)}
                                                    />
                                                ) : (
                                                    <AiOutlineStar
                                                        key={i}
                                                        className="mr-1 cursor-pointer"
                                                        size={25}
                                                        color="rgb(246,186,0)"
                                                        onClick={() => setRating(i)}
                                                    />
                                                )
                                            )}
                                        </div>
                                        <textarea
                                            name=""
                                            value={question}
                                            onChange={(e) => setQuestion(e.target.value)}
                                            id=""
                                            cols={40}
                                            rows={5}
                                            placeholder="Write your comment..."
                                            className="outline-none bg-transparent 800px:ml-3 border border-[#ffffff] w-[95%] 800px:w-full p-2 rounded text-[18px] font-Poppins"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="w-full flex justify-end">
                                    <div
                                        className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 ${questionCreateLoading && "cursor-not-allowed"}`}
                                        onClick={questionCreateLoading ? () => {} : handleQuestion}
                                    >
                                        Submit
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
                                <div>
                                    <CommentReply />
                                </div>
                            </>
                        )}
                    </>
                </div>
            )}
        </div>
    );
};

const CommentReply = ({ data, activeVideo, answer, setAnswer, handleAnswerSubmit, user, setAnswerId }: any) => {
    return (
        <>
            <div className="w-full my-3">
                {data[activeVideo].question.map((item: any, index: any) => (
                    <CommentItem
                        key={index}
                        data={data}
                        activeVideo={activeVideo}
                        item={item}
                        index={index}
                        answer={answer}
                        setAnswer={setAnswer}
                        handleAnswerSubmit={handleAnswerSubmit}
                    />
                ))}
            </div>
        </>
    );
};

const CommentItem = ({ data, activeVideo, item, answer, setAnswer, handleAnswerSubmit }: any) => {
    console.log(item);
    return (
        <>
            <div className="my-4">
                <div className="flex mb-2">
                    <div>
                    <Image
                            src={item?.user?.avatar ? item?.user.avatar.url : ""}
                            width={50}
                            height={50}
                            alt=""
                            className="rounded-full max-h-[50px] max-w-[50px]"
                        />
                    </div>

                    <div className="pl-3 dark:text-white text-black">
                        <h5 className="text-[20px]">{item.user.name}</h5>
                        <p>{item?.question}</p>
                        <small className="text-[#ffffff83]">{item.createdAt ? format(item.createdAt) : ""}</small>
                    </div>
                </div>
            </div>
        </>
    );
};
export default CourseContentMedia;
