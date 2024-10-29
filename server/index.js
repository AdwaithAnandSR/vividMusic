require('dotenv').config();
const express = require("express");
const app = express();
const PORT = 5000;

const mongoConfig = require("./config/mongodb.config.js")
const indexRoutes = require("./routes/indexRoutes.js");

app.use('/api', indexRoutes)

app.get("/", (req, res) => {
   res.status(200).json("welcome 🤗");
});

app.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
