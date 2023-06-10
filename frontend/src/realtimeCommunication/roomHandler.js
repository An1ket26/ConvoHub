import store from "../store/store";
import { setOpenRoom,setRoomDetails,setActiveRooms, setLocalStream, setRemoteStreams, setScreenSharingStream } from "../store/actions/roomActions";
import * as socketConnections from './socketConnection';
import * as webRTCHandler from "./webRTCHandler";

export const createNewRoom=()=>{

    const successCalbackFunc=()=>{
        store.dispatch(setOpenRoom(true,true));
        socketConnections.createNewRoom();
    }
    const audioOnly=store.getState().room.audioOnly
    webRTCHandler.getLocalStreamPreview(audioOnly,successCalbackFunc);
}

export const newRoomCreated=(data)=>{
    const {roomDetails}=data;
    store.dispatch(setRoomDetails(roomDetails));
}

export const updateActiveRooms=(data)=>{
    const {activeRooms}=data;
    
    const friends=store.getState().friends.friends;
    const rooms=[];
    activeRooms.forEach(room=>{
        friends.forEach(friend=>{
            if(friend.id===room.roomCreator.userId)
            {
                rooms.push({...room,creatorUsername:friend.username})
            }
        })
    })
    store.dispatch(setActiveRooms(rooms));
}

export const joinRoom=(roomId)=>{

    const successCalbackFunc=()=>{
        store.dispatch(setRoomDetails({roomId}));
    store.dispatch(setOpenRoom(false,true));
    socketConnections.joinRoom({roomId});
    }

    const audioOnly=store.getState().room.audioOnly
    webRTCHandler.getLocalStreamPreview(audioOnly.valueOf,successCalbackFunc);

    
}

export const leaveRoom=()=>{
    const roomId=store.getState().room.roomDetails.roomId;

    const localStream=store.getState().room.localStream;
    if(localStream){
        localStream.getTracks().forEach(track=>track.stop());
        store.dispatch(setLocalStream(null));
    }

    const screenSharingStream=store.getState().room.screenSharingStream;
    if(screenSharingStream)
    {
        screenSharingStream.getTracks().forEach(track=>track.stop());
        store.dispatch(setScreenSharingStream(null));
    }

    store.dispatch(setRemoteStreams([]));

    webRTCHandler.closeAllConnections();

    socketConnections.leaveRoom({roomId});
    store.dispatch(setRoomDetails(null));
    store.dispatch(setOpenRoom(false,false));
}