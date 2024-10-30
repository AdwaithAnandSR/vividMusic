// socket.js
const { Server } = require("socket.io");

let io; // Declare the variable to hold the io instance

function init(server) {
   io = new Server(server); // Initialize the io instance
   return io;
}

function getIo() {
   if (!io) {
      throw new Error(
         "Socket.io not initialized. Please call init(server) first."
      );
   }
   return io;
}

module.exports = { init, getIo };
