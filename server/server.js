const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

const userAuth = require("./routes/UserRoute");
const athleteRoute = require("./routes/AthleteRoute");
const profileRoute = require("./routes/ProfileRoute");
const coachRoute = require("./routes/CoachRoute");
const trainingSessionRoute = require("./routes/TrainingSessionRoute");
const app = express();

mongoose.connect("mongodb://localhost:27017/localDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
app.use("/uploads", express.static("uploads"));
app.use("/api/coach", coachRoute);
app.use("/api", userAuth);
app.use('/api', athleteRoute);
app.use('/api', profileRoute);
app.use('/api/trainingSessions', trainingSessionRoute);

app.listen(5000, () => console.log("server running on port 5000"));
