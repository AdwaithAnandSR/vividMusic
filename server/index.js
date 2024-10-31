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

const mongoConfig = require("./config/mongodb.config.js");
const indexRoutes = require("./routes/indexRoutes.js");

app.use(express.json());
app.use(cors({
   "origin": ["exp://10.163.4.165:8081", 'exp://127.0.0.1:8081']
}))

app.use("/", indexRoutes);

server.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
