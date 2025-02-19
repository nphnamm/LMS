import React, { useState } from "react";
import axios from "axios";

const VideoUploader: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadUrl, setUploadUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const getUploadUrl = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/upload-video");
            setUploadUrl(response.data.upload_url);
            return response.data.upload_url;
        } catch (error) {
            setMessage("Failed to get upload URL");
        }
    };

    const uploadVideo = async () => {
        if (!file) {
            setMessage("Please select a file!");
            return;
        }

        setIsUploading(true);
        setMessage("");

        try {
            const url = uploadUrl || (await getUploadUrl());
            if (!url) {
                setMessage("Upload URL not found");
                setIsUploading(false);
                return;
            }

            const formData = new FormData();
            formData.append("file", file);

            await axios.post(url, formData, {
                headers: { "Content-Type": "video/mp4" },
            });

            setMessage("Upload successful!");
        } catch (error) {
            setMessage("Upload failed!");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div>
            <h2>Upload Video to Dailymotion</h2>
            <input type="file" accept="video/*" onChange={handleFileChange} />
            <button onClick={uploadVideo} disabled={isUploading}>
                {isUploading ? "Uploading..." : "Upload"}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default VideoUploader;
