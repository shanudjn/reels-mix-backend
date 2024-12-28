import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Film, Plus } from "lucide-react";

interface AddedVideosProps {
  videos: File[];
  setVideos: React.Dispatch<React.SetStateAction<File[]>>;
}

const AddedVideos: React.FC<AddedVideosProps> = ({ videos, setVideos }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddVideoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setVideos([...videos, ...Array.from(event.target.files)]);
    }
  };

  return (
    <div className="w-80 bg-white shadow-md p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Added Videos</h2>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {videos.map((file) => (
          <div
            key={file.name}
            className="flex items-center bg-gray-100 p-2 rounded"
          >
            <Film className="w-6 h-6 mr-2 text-blue-500" />
            <span className="flex-1">{file.name}</span>
            <Button variant="ghost" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        <Button className="w-full" onClick={handleAddVideoClick}>
          <Plus className="w-4 h-4 mr-2" />
          Add Video
        </Button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="video/*"
        multiple
        onChange={handleFileChange}
      />
    </div>
  );
};

export default AddedVideos;
