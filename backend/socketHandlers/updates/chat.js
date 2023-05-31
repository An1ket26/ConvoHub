const Conversation=require('../../models/conversation')
const serverStore=require('../../serverStore')

const updateChatHistory=async(conversationId,toSpecificSocketId=null)=>{
    const conversation=await Conversation.findById(conversationId).populate({
        path:'messages',
        model:'Message',
        populate:{
            path:'author',
            model:'User',
            select:'username _id'
        },
    });
    // console.log(conversation)
    if(conversation)
    {
        const io=serverStore.getSocketServerInstance();
        // console.log(toSpecificSocketId)
        if(toSpecificSocketId)
        {
            //initial update
            return io.to(toSpecificSocketId).emit('direct-chat-history',{
                messages:conversation.messages,
                participants:conversation.participants
            })
        }
        // online users update
        conversation.participants.forEach(userId=>{
            const activeConnections=serverStore.getActiveConnections(userId.toString());
            activeConnections.forEach(socketId=>{
                io.to(socketId).emit('direct-chat-history',{
                    messages:conversation.messages,
                    participants:conversation.participants
                })
            })
        })
    }

}

module.exports={updateChatHistory}