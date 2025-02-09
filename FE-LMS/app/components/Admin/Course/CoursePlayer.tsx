import React, { FC, useEffect, useState } from 'react'
import axios from 'axios';
type Props = {
    videoUrl: string;
    title: string;
}

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
    const [videoData, setVideoData] = useState({
        otp: "",
        playbackInfo: ""
    });
    useEffect(() => {
        axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/getVideoCipherOTP`,
            {
                videoId: videoUrl
            },
            {
                withCredentials: true, // This allows cookies to be sent with the request
            }
        ).then(res => {
            setVideoData(res.data)
        })
    }, [videoUrl])

    return (
        <div style={{ paddingTop: "41%", position: "relative" }}>
            {
                videoData?.otp && videoData?.playbackInfo !== "" && (
                    <iframe
                        src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=gLlynDEnCeYD1Mft`}
                        style={{
                            border: 0,
                            width: "90%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                        allowFullScreen={true}
                        allow="encrypted-media"
                    ></iframe>
                )
            }
        </div>
    )
}

export default CoursePlayer