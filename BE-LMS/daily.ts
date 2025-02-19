const axios = require("axios");
const querystring = require("qs"); // Thư viện để mã hóa data trong định dạng x-www-form-urlencoded
import fs from "fs";
import { CatchAsyncError } from "./middleware/cacthAsyncErrors";
import { NextFunction, Request, Response } from "express";

let upload_url: any;
const getUploadUrl = async (accessToken: string) => {
  try {
    const response = await axios.get(
      "https://api.dailymotion.com/file/upload",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Upload URL:", response.data.upload_url);
    return response.data.upload_url;
  } catch (error: any) {
    console.error(
      "Error getting upload URL:",
      error.response ? error.response.data : error.message
    );
  }
};

export const getAccessToken = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await axios.post(
        "https://partner.api.dailymotion.com/oauth/v1/token",
        querystring.stringify({
          grant_type: "client_credentials", // Grant type phải là "client_credentials"
          client_id: "b31da1a43397919462f0", // Thay thế bằng client_id của bạn
          client_secret: "9359002b02c3b27a51bcd29b7be14b188f9417d3", // Thay thế bằng client_secret của bạn
          scope: "manage_videos", // Scope bạn yêu cầu quyền truy cập
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // Đảm bảo sử dụng đúng Content-Type
          },
        }
      );

      const accessToken = response.data.access_token;
      console.log("Access Token:", accessToken);
      const data = await axios.get(
        "https://api.dailymotion.com/file/upload",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const url = data.data.upload_url;
      console.log('url',url);
      res.status(201).json({
        succues: true,
        upload_url:url
      });
    } catch (error: any) {
      // In thêm thông tin chi tiết về lỗi
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      } else {
        console.error("Error message:", error.message);
      }
    }
  }
);

export const uploadVideoToDailymotion = async (): Promise<any> => {};

export const createSet = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    getAccessToken();

    try {
      const { filePath } = req.body;
      const fileStream = fs.createReadStream(filePath);

      const response = await axios.post(upload_url, fileStream, {
        headers: {
          "Content-Type": "video/mp4", // Định dạng video, thay đổi nếu cần
        },
        maxBodyLength: Infinity, // Cho phép tải file lớn
      });

      console.log("Upload successful:", response.data);
      return response.data; // Trả về phản hồi từ Dailymotion
    } catch (error: any) {
      console.error(
        "Error uploading video:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }
);
