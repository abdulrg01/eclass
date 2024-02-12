import { useEffect, useState } from "react";
import axios from "axios";

export default function CoursePlayer({ videoUrl }) {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      .post(`https://api-3w7q.onrender.com/api/v1/course/getVdoCipherOTP`, {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      });
  }, [videoUrl]); 

  return (
    <div style={{ paddingTop: "56.25%", position: "relative", overflow: "hidden" }}>
      {videoData.otp && videoData.playBackInfo !== "" && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=bey4vkVZyZhDV4tz`}
          style={{
            border: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          allow="encrypted-media"
          allowfullscreen={true}
        ></iframe>
      )}
    </div>
  );
}
