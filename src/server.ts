import express from "express";
import cors from "cors";
import path from "path";
import videoRoutes from "./routes/videoRoutes"; // Ensure this path is correct

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's origin
  })
);

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use the video routes
app.use("/videos", videoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port 222  ${PORT}`);
});

export default app;
