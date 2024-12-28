import React, { useState } from "react";
import { Upload, Video } from "lucide-react";
import { Button } from "./button";

type VideoPreviewProps = {
  videos: File[];
};

const VideoPreview = ({ videos }: VideoPreviewProps) => {
  const [montageUrl, setMontageUrl] = useState<string>("");

  const handleVideoError = (
    event: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    console.error("Error loading video:", event);
    alert("Failed to load video. Please try again.");
  };

  // const fileInputRef = useRef<HTMLInputElement>(null);
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     setVideos([...videos, ...Array.from(event.target.files)]);
  //   }
  // };

  // const handleAddVideoClick = () => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //   }
  // };

  const handleVideoLoaded = () => {
    console.log("Video loaded successfully");
  };
  const handleCreateMontage = async () => {
    if (videos.length < 1) {
      alert("Please add videos to create montage");
      return;
    }
    const formData = new FormData();
    videos.forEach((video) => formData.append("videos", video));

    try {
      const response = await fetch(
        "http://localhost:5000/videos/create-montage",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create montage");
      }
      const result = await response.json();
      const fileName = result.output;
      setMontageUrl(`http://localhost:5000/stream/${fileName}`);
    } catch (error) {
      console.error("Error creating montage:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col">
      <Button variant="outline" onClick={handleCreateMontage}>
        <Upload className="w-4 h-4 mr-2" />
        Create Montage
      </Button>

      {/* <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="video/*"
        multiple
        onChange={handleFileChange}
      /> */}
      <div className="bg-black aspect-video rounded-lg flex items-center justify-center">
        {montageUrl ? (
          <video
            src={montageUrl}
            controls
            className="w-full h-full"
            onError={handleVideoError}
            onLoadedData={handleVideoLoaded}
          />
        ) : (
          <Video className="w-16 h-16 text-gray-400" />
        )}
      </div>
    </div>
  );
};

export default VideoPreview;
