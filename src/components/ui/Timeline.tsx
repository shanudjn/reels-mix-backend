import React from "react";
import { Button } from "@/components/ui/button";
import { Scissors } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface TimelineProps {
  videos: File[];
}

const Timeline: React.FC<TimelineProps> = ({ videos }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold">Timeline</h2>
      <Button variant="outline" size="sm">
        <Scissors className="w-4 h-4 mr-2" />
        Trim
      </Button>
    </div>
    <div className="bg-gray-200 h-24 rounded-lg relative">
      {videos.map((file, index) => (
        <div
          key={file.name}
          className="absolute top-0 bottom-0 bg-blue-500 opacity-75"
          style={{
            left: `${(index / videos.length) * 100}%`,
            width: `${100 / videos.length}%`,
          }}
        >
          <div className="h-full flex items-center justify-center text-white font-bold">
            {file.name}
          </div>
        </div>
      ))}
    </div>
    <Slider className="mt-4" defaultValue={[0]} max={100} step={1} />
  </div>
);

export default Timeline;
