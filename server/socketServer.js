const { Server } = require("socket.io");

const initSocketServer = (server) => {
  const io = new Server(server, {
    // options
  });

  io.on("connection", (socket) => {
    // ...
    console.log("A user is connected");

    //listen for "notification" event from from the frontend

    socket.on("notification", (data) => {
      //Broadcast the notification data to all connected clients (admin dashboard)
      io.emit("newNotification", data);

      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });
  });
};

module.exports = initSocketServer;
