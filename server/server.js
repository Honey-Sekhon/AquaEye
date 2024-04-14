// const express = require("express");
// const mongoose = require("mongoose");
// const morgan = require("morgan");
// const bodyParser = require("body-parser");
// const coachRoute = require("./routes/coachRoute");
// const authRoute = require("./routes/authRoute");
// const app = express();

// mongoose.connect("mongodb://localhost:27017/localDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   console.log("Connected to MongoDB!!!");
// });

// // app.get("/api", (req, res) => {
// //   res.json({ users: ["user1", "user2", "user3"] });
// // });

// const cors = require("cors");
// app.use(cors());
// app.use(morgan("dev"));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use("/uploads", express.static("uploads"));
// app.use("/api/coach", coachRoute);
// app.use("/api", authRoute);

// app.listen(5000, () => console.log("server running on port 5000"));

const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Apply CORS to allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:5173' // Adjust this as needed depending on where your frontend is served
}));

// Middleware to parse JSON bodies
app.use(express.json());

// // Route to serve a simple message to ensure the server is working
// app.get('/', (req, res) => {
//   res.send('Raspberry Pi Camera Control API');
// });

// // Route to execute a Python script and handle the process output
// app.get('/api/run-script', (req, res) => {
//   const script = spawn('python3', ['/path/to/your/script.py']);

//   let scriptOutput = '';
//   script.stdout.on('data', (data) => {
//     scriptOutput += data.toString();
//   });

//   script.stderr.on('data', (data) => {
//     console.error(`stderr: ${data}`);
//   });

//   script.on('close', (code) => {
//     if (code !== 0) {
//       console.log(`Script exited with code ${code}`);
//       res.status(500).send('Script execution failed');
//     } else {
//       res.send(scriptOutput);
//     }
//   });
// });

// Route to handle turning on the camera using a POST request
app.post('/turn-on-camera', (req, res) => {
  const script = spawn('python3', ['/home/capstone/Documents/capstone/test.py']);

  let output = '';
  script.stdout.on('data', (data) => {
    output += data.toString();
  });

  script.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  script.on('close', (code) => {
    if (code !== 0) {
      console.error(`Script exited with code ${code}`);
      res.status(500).send('Failed :(');
    } else {
      console.log(`stdout: ${output}`);
      res.send('Passed !');
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
