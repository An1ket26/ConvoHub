const serverStore=require('../serverStore');
const roomsUpdates=require('./updates/rooms');

const roomCreatehandler=(socket)=>{
    console.log('HANDLING ROOM CREATE EVENT');
    const scoketId=socket.id;
    const userId=socket.user.userId;
    
    const roomDetails=serverStore.addNewActiveRoom(userId,scoketId);

    socket.emit('room-create',{
        roomDetails 
    })

    roomsUpdates.updateRooms();
}

module.exports=roomCreatehandler;