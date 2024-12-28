import React, { useState } from "react";
// import Timeline from "./Timeline";
import AddedVideos from "./AddedVideos";
import VideoPreview from "./VideoPreview";

const MainContent = () => {
  const [videos, setVideos] = useState<File[]>([]);
  return (
    <main className="flex-1 flex overflow-hidden">
      <AddedVideos videos={videos} setVideos={setVideos} />
      <div className="flex-1 flex flex-col p-4 space-y-4">
        <VideoPreview videos={videos} />
        {/* <Timeline videos={videos} /> */}
      </div>
    </main>
  );
};

export default MainContent;
