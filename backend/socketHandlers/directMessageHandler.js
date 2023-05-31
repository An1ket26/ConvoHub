const Message = require("../models/message");
const Conversation = require("../models/conversation");
const chatUpdates = require("./updates/chat");

const directMessageHandler = async (socket, data) => {
  try {
    console.log("event is being handled");
    const { userId } = socket.user;
    const { recieverUserId, content } = data;

    //create new message
    const message = await Message.create({
      content: content,
      author: userId,
      date: new Date(),
      type: "DIRECT",
    });

    // find if convo exist if not create new

    const conversation = await Conversation.findOne({
      participants: { $all: [userId, recieverUserId] },
    });

    if (conversation) {
      conversation.messages.push(message._id);
      await conversation.save();
      chatUpdates.updateChatHistory(conversation._id.toString());
    } else {
      const newConversation = Conversation.create({
        messages: [message._id],
        participants: [userId, recieverUserId],
      });

      //update to sender and reciver if online
      chatUpdates.updateChatHistory(newConversation._id.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = directMessageHandler;
