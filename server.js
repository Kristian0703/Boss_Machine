const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 4001;

// CORS and body parsing middleware
const cors = require("cors");
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// API routes
const apiRouter = require("./server/api");
app.use("/api", apiRouter);

// Fallback route for '/'
app.get("/", (req, res) => {
  res.send("Boss Machine API is running. Try /api/minions");
});

if (!module.parent) {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

module.exports = app;
