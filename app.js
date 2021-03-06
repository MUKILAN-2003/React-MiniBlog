const express = require("express");
const mongo = require("mongoose");
const corns = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");

const Controller = require("./routes/routting.js");

dotenv.config();
const app = express();
app.use(corns());
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("client/build"));
app.use(express.urlencoded({ extended: true }));

const connect_mongo =
  process.env.MONGODB_URI ||
  "--------------------------MONGO (db) URI-------------------------------";
const port = process.env.PORT || 8000;

mongo.connect(connect_mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

console.log("Database Connection Check............ok");

app.listen(port);
console.log("Server Listening :: " + port);

app.use(Controller);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
