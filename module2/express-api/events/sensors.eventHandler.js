module.exports = (io, socket) => {
  const handleUpdateSensor = (payload) => {};

  const handleGetSensor = (orderId, callback) => {};

  socket.on("sensors:update", handleUpdateSensor);
  socket.on("sensors:get", handleGetSensor);
};
