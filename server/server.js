const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

const userAuth = require("./routes/UserRoute");
const clubRoutes = require("./routes/ClubRoutes");

const app = express();

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB!!!");
});

const cors = require("cors");
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", userAuth);
app.use("/club", clubRoutes);

app.listen(5000, () => console.log("server running on port 5000"));
