const { getIo } = require("../config/socket.config.js");
const musicModel = require("../models/musics.js");
const io = getIo();

const searchSongs = async query => {
   try {
      const words = query.toLowerCase().split(" ");

      // Create search conditions with both singular and plural forms
      const mustConditions = words.flatMap(word => [
         { text: { query: word, path: "title", fuzzy: { maxEdits: 1 } } },
         {
            text: {
               query: word.replace(/s$/, ""),
               path: "title",
               fuzzy: { maxEdits: 1 }
            }
         } // Remove trailing 's'
      ]);

      const result = await musicModel.aggregate([
         {
            $search: {
               index: "title",
               compound: {
                  must: mustConditions
               }
            }
         }
      ]);
      return result;
   } catch (error) {
      console.error("Search error:", error);
      return [];
   }
};

io.on("connection", socket => {
   socket.on("searchSongs", async text => {
      const songs = await searchSongs(text);
      socket.emit('searchSongsRes', songs)
   });
});
