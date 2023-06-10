import React from "react";
import { IconButton } from "@mui/material";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import * as webRTCHandler from "../../../realtimeCommunication/webRTCHandler"

const constraints = {
  audio: false,
  video: true,
};

const ScreeShareButton = ({
  localStream,
  screenSharingStream,
  setScreenSharingStream,
  isScreenSharingActive,
}) => {
  const handleToggleScreeShare = async () => {
    if (!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (err) {
        console.log(
          "error occured when trying to get access to screen share stream"
        );
      }
      if (stream) {
        setScreenSharingStream(stream);
        webRTCHandler.switchOutgoingTracks(stream);
      }
    } else {
      webRTCHandler.switchOutgoingTracks(localStream);
      screenSharingStream.getTracks().forEach((t) => t.stop());
      setScreenSharingStream(null);
    }
  };
  return (
    <IconButton onClick={handleToggleScreeShare} style={{ color: "white" }}>
      {isScreenSharingActive ? <StopScreenShareIcon /> : <ScreenShareIcon />}
    </IconButton>
  );
};

export default ScreeShareButton;
