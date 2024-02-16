require("express-async-errors");
require("dotenv").config();
const e = require("express");
const http = require("http");
const app = e();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/connectDB");
const path = require("path");
const { v2: cloudinary } = require("cloudinary");
const initSocketServer = require("./socketServer");
const PORT = process.env.PORT || 9000;
const server = http.createServer(app);

console.log(process.env.NODE_ENV);

connectDB();

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

initSocketServer(server);

app.use(logger);
app.use(e.json({ limit: "50mb" }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/", e.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root"));
app.use("/api/v1", require("./routes/user"));
app.use("/api/v1/course", require("./routes/course"));
app.use("/api/v1/order", require("./routes/order"));
app.use("/api/v1/notification", require("./routes/notification"));
app.use("/api/v1/analytics", require("./routes/analytics"));
app.use("/api/v1/layout", require("./routes/layout"));

app.all("*", (req, res) => {
  res.status(400);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server is Connected with port ${PORT}`);
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
