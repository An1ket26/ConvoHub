import store from "../../store/store";
import { setMessages } from "../../store/actions/chatActions";

export const updateDirectChatHistoryIfActive = (data) => {
  const { participants, messages } = data;

  const recieverId = store.getState().chat.chosenChatDetails?.id;
  const userId = store.getState().auth.userDetails._id;

  if (recieverId && userId) {
    const usersInConversation = [recieverId, userId];
    updateChatHistoryIfSameConversationActive({
      participants,
      usersInConversation,
      messages,
    });
  }
};

const updateChatHistoryIfSameConversationActive = ({
  participants,
  usersInConversation,
  messages,
}) => {
    const result=participants.every((participantId)=>{
        return usersInConversation.includes(participantId);
    })
    if(result)
    {
        store.dispatch(setMessages(messages));
    }
};
