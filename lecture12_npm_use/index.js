const express = require("express");
const app = express();
const PORT = 5000;
//routers
const otpRouter = require("./routes/otp.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/otp",otpRouter);

app.get("/", (req, res) => {	});

app.listen(PORT, () => console.log("Server running on port " + PORT));