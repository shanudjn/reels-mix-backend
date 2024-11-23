import { Router, Request, Response } from "express";
import path from "path";
import fs from "fs";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const uploadsDir = path.resolve(__dirname, "../../uploads");
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Unable to list files" });
    }
    res.json({ files });
  });
});

router.get("/stream/:filename", (req: Request, res: Response) => {
  const fileName = req.params.filename;
  const filePath = path.resolve(__dirname, "../../uploads", fileName);

  fs.stat(filePath, (error, stats) => {
    if (error) {
      return res.status(404).json({ error: "File not found" });
    }
    const range = req.headers.range;
    if (!range) {
      return res.status(416).json({ error: "Range header is required" });
    }

    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, stats.size - 1);

    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${stats.size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(filePath, { start, end });
    videoStream.pipe(res);
  });
});

export default router;
