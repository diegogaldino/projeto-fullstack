
import app from "./app";
import { imageRouter } from "./routes/imageRouter";
import { userRouter } from "./routes/userRouter";



app.use("/user", userRouter);
app.use("/image", imageRouter);
