const fs = require("fs");
const path = require("path");

const { getIo } = require("../config/socket.config.js");
const musicModel = require("../models/musics.js");

const io = getIo();

let fileBuffers = {};

io.on("connection", socket => {
   console.log("Client connected");

   // Handle receiving file chunks
   socket.on("uploadAudioChunk", data => {
      console.log(data);
   });

});
