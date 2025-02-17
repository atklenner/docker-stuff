const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const redis = require("redis");
let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// should probably include logic that retries the mongo connection in case Docker doesn't start it up in time
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
mongoose
  .connect(mongoURL)
  .then(() => console.log("connected to database"))
  .catch((err) => console.error(err));

app.enable("trust proxy");
app.use(cors({}));
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      resave: false,
      saveUninitialized: false,
      secure: false,
      httpOnly: true,
      maxAge: 30000,
    },
  })
);
app.use(express.json());

app.get("/api/v1/", (req, res) => {
  res.send("<h2>Hi there</h2>");
  console.log("yeah it ran");
});

app.use("/api/v1/posts", postRouter);

app.use("/api/v1/users", userRouter);

const port = process.env.port || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
