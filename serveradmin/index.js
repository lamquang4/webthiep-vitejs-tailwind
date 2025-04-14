const express = require("express");
const cors = require("cors");
const router = require("./routes/index");
require("dotenv").config();
const path = require("path");
//const app = express()
const { app, server } = require("./socket/index");
const connectDB = require("./config/connectDB");
const cookieParser = require("cookie-parser");
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 8082;

app.get("/", (request, response) => {
  response.json({
    message: "Server running at " + PORT,
  });
});

app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("Server running at " + PORT);
  });
});
