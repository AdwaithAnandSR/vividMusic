require("dotenv").config();
const express = require("express");
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");
const app = express();

const { init } = require("./config/socket.config.js");

const PORT = process.env.PORT || 4000;
const server = http.createServer(app)
const io = init(server)

const uploadHandler = require('./handlers/socket.file.handler.js')
const searchHandler = require("./handlers/search.handler.js")
const mongoConfig = require("./config/mongodb.config.js");
const indexRoutes = require("./routes/indexRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js");

app.use(express.json());
app.use(
  cors({
    origin: ["http://192.168.20.104:8081", "exp://192.168.20.104:8081", "exp://127.0.0.1:8081"],
  })
);

app.use("/", indexRoutes);
app.use("/admin", adminRoutes);
app.use("/dashboard", dashboardRoutes);

server.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
