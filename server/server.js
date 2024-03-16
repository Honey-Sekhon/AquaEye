const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const coachRoute = require("./routes/coachRoute");
const authRoute = require("./routes/authRoute");
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

// app.get("/api", (req, res) => {
//   res.json({ users: ["user1", "user2", "user3"] });
// });

const cors = require("cors");
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/coach", coachRoute);
app.use("/api", authRoute);

app.listen(5000, () => console.log("server running on port 5000"));
