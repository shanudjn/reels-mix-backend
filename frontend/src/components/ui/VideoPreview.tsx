import React from "react";
import { Video } from "lucide-react";

const VideoPreview = ({ montageUrl }: { montageUrl: string }) => {
  console.log("montageUrl", montageUrl);

  const handleVideoError = (
    event: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    console.error("Error loading video:", event);
    alert("Failed to load video. Please try again.");
  };

  const handleVideoLoaded = () => {
    console.log("Video loaded successfully");
  };
  return (
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
  );
};

export default VideoPreview;
