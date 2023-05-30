const User = require("../../models/user");
const FriendInvitation = require("../../models/friendInvitation");
const serverStore = require("../../serverStore");

const updateFriendsPendingInvitation = async (userId) => {
  try {
    const pendingInvitations = await FriendInvitation.find({
      recieverId: userId,
    }).populate("senderId", "_id username mail");

    const recieverList = serverStore.getActiveConnections(userId);
    const io = serverStore.getSocketServerInstance();

    recieverList.forEach((recieverSocketId) => {
      io.to(recieverSocketId).emit("friends-invitations", {
        pendingInvitations: pendingInvitations ? pendingInvitations : [],
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const updateFriends = async (userId) => {
  try {
    //find active connections
    const recieverList = serverStore.getActiveConnections(userId);
    if (recieverList.length > 0) {
      const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
        "friends",
        "_id username mail"
      );
      if (user) {
        const friendsList = user.friends.map((f) => {
          return {
            id: f._id,
            mail: f.mail, 
            username: f.username,
          };
        });

        const io = serverStore.getSocketServerInstance();

        recieverList.forEach((recieverSocketId) => {
          io.to(recieverSocketId).emit("friends-list", {
            friends: friendsList ? friendsList : [],
          });
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { updateFriendsPendingInvitation, updateFriends };
