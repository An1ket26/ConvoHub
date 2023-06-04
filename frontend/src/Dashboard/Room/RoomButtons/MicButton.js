import React,{useState} from 'react'
import { IconButton } from '@mui/material'
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

const MicButton = () => {
    const [MicEnabled,setMicEnabled]=useState(true);

    const handleToggleMic=()=>{
        setMicEnabled(!MicEnabled);
    }
  return (
    <IconButton onClick={handleToggleMic} style={{color:'white'}}>
        {MicEnabled?<MicIcon/>:<MicOffIcon/>}
    </IconButton>
  )
}

export default MicButton