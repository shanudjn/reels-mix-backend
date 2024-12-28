import { rejects } from "assert";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

export const createMontage = (
  videoPaths: string[],
  outputFile: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const videoListPath = "video_list.txt";
    const fileContent = videoPaths.map((path) => `file '${path}'`).join("\n");

    fs.writeFileSync(videoListPath, fileContent);

    const outputFilePath = path.join(__dirname, "../../uploads", outputFile);
    const command = `
    ffmpeg -f concat -safe 0 -i ${videoListPath} -t 30 -c copy ${outputFilePath}
  `;

    exec(command, (error, stdout, stderr) => {
      fs.unlinkSync(videoListPath); // Clean up the temporary file
      if (error) {
        return reject(error);
      }
      resolve(outputFile);
    });
  });
};
