const express = require("express");
const app = express();
require("dotenv").config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("server running with docker");
});

app.listen(process.env.PORT, () => console.log("Server running on port " + process.env.PORT));