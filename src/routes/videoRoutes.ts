import express, { Request, Response } from "express";
import multer from "multer";
import { createMontage } from "../services/montageService";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

interface MulterRequest extends Request {
  files: Express.Multer.File[];
}

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from the video routes!" });
});

router.post(
  "/create-montage",
  upload.array("videos", 3),
  (req: Request, res: Response): any => {
    const files = (req as MulterRequest).files;

    const videoPaths = files.map((file) => file.path);
    const outputFile = `montage_${Date.now()}.mp4`;

    createMontage(videoPaths, outputFile, (error, output) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Failed to create montage", details: error });
      }
      res.json({ message: "Montage created successfully", output });
    });
  }
);

export default router;
