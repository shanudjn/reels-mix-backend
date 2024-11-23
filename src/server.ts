import express from "express";
import cors from "cors";
import path from "path";
import videoRoutes from "./routes/videoRoutes";
import uploadRoutes from "./routes/uploadRoutes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.static(path.join(__dirname, "../public")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/uploads", uploadRoutes);
app.use("/videos", videoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
