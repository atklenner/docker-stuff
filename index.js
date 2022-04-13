const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");
const postRouter = require("./routes/postRoutes");

const app = express();

// should probably include logic that retries the mongo connection in case Docker doesn't start it up in time
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
mongoose
  .connect(mongoURL)
  .then(() => console.log("connected to database"))
  .catch((err) => console.error(err));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h2>Hi there</h2>");
});

app.use("/posts", postRouter);

const port = process.env.port || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
