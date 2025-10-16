const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./routes/user.routes")
const postRouter = require("./routes/post.routes")
const commentRouter = require("./routes/comment.routes");
const courseRouter = require("./routes/course.route");
const enrollementRouter = require("./routes/enrollement.route");

app.use("/user",userRouter);
app.use("/post",postRouter);
app.use("/comment",commentRouter);
app.use("/course",courseRouter);
app.use("/enrollement",enrollementRouter);

app.listen(PORT, () => console.log("Server running on port " + PORT));