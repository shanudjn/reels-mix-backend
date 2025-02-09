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
  async (req: Request, res: Response): Promise<any> => {
    const files = (req as MulterRequest).files;
    //TODO
    // if (!files || files.length < 3) {
    //   return res.status(400).json({ error: "Please upload at least 3 videos" });
    // }
    const videoPaths = files.map((file) => file.path);
    const outputFile = `montage_${Date.now()}.mp4`;

    try {
      const output = await createMontage(videoPaths, outputFile);
      res.json({ message: "Montage created successfully", output });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to create montage", details: error });
    }
  }
);

export default router;
