const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://admin:password@172.28.0.2:27017/?authSource=admin")
  .then(() => console.log("connected to database"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("<h2>Hi there</h2>");
});

const port = process.env.port || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
