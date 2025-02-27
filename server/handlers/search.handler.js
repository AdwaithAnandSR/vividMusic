
const { getIo } = require("../config/socket.config.js");
const musicModel = require("../models/musics.js");
const io = getIo();


io.on("connection", (socket) => {
  socket.on("searchSongs", async (text) => {
    const songs = await musicModel.find({});
    console.log(songs);
  });
});
