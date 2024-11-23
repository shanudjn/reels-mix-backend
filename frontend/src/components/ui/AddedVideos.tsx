import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Film, Plus, Upload } from "lucide-react";

interface AddedVideosProps {
  videos: File[];
  setVideos: React.Dispatch<React.SetStateAction<File[]>>;
  setMontageUrl: React.Dispatch<React.SetStateAction<string>>;
}

const AddedVideos: React.FC<AddedVideosProps> = ({
  videos,
  setVideos,
  setMontageUrl,
}) => {
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

  const handleCreateMontage = async () => {
    if (videos.length < 1) {
      alert("Please add at least 1 videos");
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
      setMontageUrl(`http://localhost:5000/uploads/stream/${fileName}`);
    } catch (error) {
      console.error("Error creating montage:", error);
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
        <Button
          className="w-full"
          variant="outline"
          onClick={handleCreateMontage}
        >
          <Upload className="w-4 h-4 mr-2" />
          Create Montage
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
