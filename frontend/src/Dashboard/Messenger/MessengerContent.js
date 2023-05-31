import React,{useEffect} from 'react'
import { styled } from '@mui/system'
import Messages from './Messages/Messages'
import NewMessageInput from './NewMessageInput'
import { getDirectChatHistory } from '../../realtimeCommunication/socketConnection'

const Wrapper=styled('div')({
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    flexGrow:1,
});

const MessengerContent = ({chosenChatDetails}) => {
    useEffect(()=>{
        getDirectChatHistory({
            recieverUserId:chosenChatDetails.id
        })
    },[chosenChatDetails])
  
    return (
        <Wrapper>
            <Messages/>
            <NewMessageInput/>
        </Wrapper>
  )
}

export default MessengerContent