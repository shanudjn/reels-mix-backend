import express from "express";
import cors from "cors";
import path from "path";
import videoRoutes from "./routes/videoRoutes";
import streamRoutes from "./routes/streamRoutes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.static(path.join(__dirname, "../public")));
app.use("/stream", streamRoutes);
app.use("/videos", videoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
