import { rejects } from "assert";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

import { promisify } from "util";

const execPromise = promisify(exec);

const trimVideo = async (videoPath: string, index: number): Promise<string> => {
  const trimmedVideoPath = path.join(
    __dirname,
    `../../uploads/trimmed_${index}.mp4`
  );
  const trimCommand = `ffmpeg -i ${videoPath} -t 10 -c copy ${trimmedVideoPath}`;
  await execPromise(trimCommand);
  return trimmedVideoPath;
};

export const createMontage = async (
  videoPaths: string[],
  outputFile: string
): Promise<string> => {
  const trimmedVideoPaths: string[] = [];
  for (const [index, videoPath] of videoPaths.entries()) {
    try {
      const trimmedVideoPath = await trimVideo(videoPath, index);
      trimmedVideoPaths.push(trimmedVideoPath);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to trim video: ${error.message}`);
      } else {
        throw new Error("Failed to trim video: Unknown error");
      }
    }
  }
  const videoListPath = "video_list.txt";
  const fileContent = trimmedVideoPaths
    .map((path) => `file '${path}'`)
    .join("\n");
  fs.writeFileSync(videoListPath, fileContent);
  const outputFilePath = path.join(__dirname, "../../uploads", outputFile);
  const command = `ffmpeg -f concat -safe 0 -i ${videoListPath} -t 30 -c copy ${outputFilePath}`;
  try {
    await execPromise(command);
    fs.unlinkSync(videoListPath);
    trimmedVideoPaths.forEach((path) => fs.unlinkSync(path));
    return outputFile;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to trim video: ${error.message}`);
    } else {
      throw new Error("Failed to trim video: Unknown error");
    }
  }
};
