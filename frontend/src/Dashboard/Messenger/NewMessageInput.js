import React, { useState } from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import { sendDirectMessage } from "../../realtimeCommunication/socketConnection";

const MainContainer = styled("div")({
  height: "60px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Input = styled("input")({
  backgroundColor: "#2f3136",
  width: "98%",
  height: "44px",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  padding: "0 10px",
});

const NewMessageInput = ({ chosenChatDetails }) => {
  const [message, setMessage] = useState("");

  const handleMessageValueChanged = (event) => {
    setMessage(event.target.value);
  };
  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };
  const handleSendMessage = () => {
    console.log("sending message");
    if (message.length > 0) {
      sendDirectMessage({
        recieverUserId: chosenChatDetails.id,
        content: message,
      });
    }

    setMessage("");
  };

  return (
    <MainContainer>
      <Input
        placeholder={`write a message to ${chosenChatDetails.name}`}
        value={message}
        onChange={handleMessageValueChanged}
        onKeyDown={handleKeyPressed}
      />
    </MainContainer>
  );
};

const mapStoreToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStoreToProps)(NewMessageInput);
