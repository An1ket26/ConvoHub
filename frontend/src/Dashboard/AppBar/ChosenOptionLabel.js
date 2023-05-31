import React from "react";
import { Typography } from "@mui/material";
import { connect } from "react-redux";

const ChosenOptionLabel = ({ name }) => {
    console.log(name);
  return (
    
    <Typography
      sx={{
        fontSize: "16px",
        color: "white",
        fontWeight: "bold",
      }}
    >
      {`${name ? name : ""}`}
    </Typography>
  );
};

const mapStoreToProps = (state) => {
  return {
    name: state.chat.chosenChatDetails?.name,
  };
};

export default connect(mapStoreToProps)(ChosenOptionLabel);
