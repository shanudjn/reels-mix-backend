import React from "react";
import { Video } from "lucide-react";

const VideoPreview = ({montageUrl}:{montageUrl : string}) => {
  console.log("montageUtl", montageUrl)
return(
 <div className="bg-black aspect-video rounded-lg flex items-center justify-center">
    {montageUrl ? (
      <video
        src={montageUrl}
        controls
        className="w-full h-full"
      />
    ) : (
      <Video className="w-16 h-16 text-gray-400" />
    )}
  </div>
  )

}

export default VideoPreview;
