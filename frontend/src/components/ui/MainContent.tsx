import React, { useState } from "react";
import Timeline from "./Timeline";
import AddedVideos from "./AddedVideos";
import VideoPreview from "./VideoPreview";

const MainContent = () => {
  const [videos, setVideos] = useState<File[]>([]);
  const [montageUrl, setMontageUrl] = useState<string>("");
  return (
    <main className="flex-1 flex overflow-hidden">
      <AddedVideos videos={videos} setVideos={setVideos} setMontageUrl={setMontageUrl} />
      <div className="flex-1 flex flex-col p-4 space-y-4">
        <VideoPreview montageUrl={montageUrl} />
        <Timeline videos={videos} />
      </div>
    </main>
  );
};

export default MainContent;
