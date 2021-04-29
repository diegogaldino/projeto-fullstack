
import app from "./app";
import { collectionRouter } from "./routes/collectionRouter";
import { imageRouter } from "./routes/imageRouter";
import { tagRouter } from "./routes/tagRouter";
import { userRouter } from "./routes/userRouter";



app.use("/user", userRouter)
app.use("/image", imageRouter)
app.use("/tag", tagRouter)
app.use("/collection", collectionRouter)
