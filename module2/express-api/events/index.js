const socketIo = require("socket.io");

/**
 * @references
 *  https://socket.io/docs/v3/server-application-structure/
 *  https://stackoverflow.com/questions/18856190/use-socket-io-inside-a-express-routes-file
 */
const initializeWebSockets = (app) => {
  const io = socketIo(app, {
    cors: {
      origin: "*",
      allowedHeaders: ["*"],
    },
  });

  const onConnection = (socket) => {
    console.log("A user connected");

    /**
     * import and register socket event handlers here
     */
    require("./sensors.eventHandler")(io, socket);

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  };

  io.on("connection", onConnection);

  return io;
};

module.exports = initializeWebSockets;
