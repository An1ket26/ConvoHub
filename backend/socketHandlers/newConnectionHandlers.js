const serverStore = require("../serverStore");
const friendsUpdate = require("./updates/friends");
const roomsUpdates = require("./updates/rooms");

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });
  friendsUpdate.updateFriendsPendingInvitation(userDetails.userId);
  friendsUpdate.updateFriends(userDetails.userId);
  setTimeout(() => {
    roomsUpdates.updateRooms(socket.id);
  }, [500]);
};

module.exports = newConnectionHandler;
