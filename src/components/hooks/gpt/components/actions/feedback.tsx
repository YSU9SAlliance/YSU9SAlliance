"use client";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";

const FeedbackTempComponent = ({ msg }: { msg: string }) => {
  useEffect(() => {
    axios
      .post("/api/feedback", {
        msg: msg,
        ...parseCookieData(document.cookie),
      })
      .then(() => {
        toast.success("反馈成功，感谢您的反馈！");
      });
  }, []);
  return null;
};

export default FeedbackTempComponent;

type ParsedData = {
  distinct_id: string;
  device_id: string;
};

function parseCookieData(cookieData: string): ParsedData | null {
  try {
    // 对整个cookie字符串进行URL解码
    const decodedData = decodeURIComponent(cookieData);

    // 从解码的字符串中提取JSON部分
    const sensorsData = decodedData.match(
      /sensorsdata2015jssdkcross=({.*?})(;|$)/
    );
    if (!sensorsData || sensorsData.length < 2) {
      return null; // 未找到或无法匹配JSON数据
    }

    // 将匹配到的JSON字符串转换为对象
    const jsonObject = JSON.parse(sensorsData[1]);

    // 提取需要的字段
    const distinct_id = jsonObject.distinct_id;
    const device_id = jsonObject.$device_id;

    return {
      distinct_id,
      device_id,
    };
  } catch (error) {
    console.error("Error parsing cookie data: ", error);
    return null; // 处理解析错误
  }
}
