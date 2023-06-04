import React,{useState} from 'react'
import { IconButton } from '@mui/material'
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';

const ScreeShareButton = () => {
    const [ScreeShareEnabled,setScreeShareEnabled]=useState(false);

    const handleToggleScreeShare=()=>{
        setScreeShareEnabled(!ScreeShareEnabled);
    }
  return (
    <IconButton onClick={handleToggleScreeShare} style={{color:'white'}}>
        {ScreeShareEnabled?<StopScreenShareIcon/>:<ScreenShareIcon/>}
    </IconButton>
  )
}

export default ScreeShareButton