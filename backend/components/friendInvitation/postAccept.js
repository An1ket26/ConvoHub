const FriendInvitation=require("../../models/friendInvitation")
const friendsUpdates=require('../../socketHandlers/updates/friends')
const User=require('../../models/user')

const postAccept=async(req,res)=>{
    try{
        const {id}=req.body;
        const {userId}=req.user;

        const invitation=await FriendInvitation.findById(id);
        if(!invitation)
        {
            return res.status(401).send("Error occured. Please try again.")
        }

        const {senderId,recieverId}=invitation;
        // add friends

        const senderUser=await User.findById(senderId);
        senderUser.friends=[...senderUser.friends,recieverId];

        const recieverUser=await User.findById(recieverId);
        recieverUser.friends=[...recieverUser.friends,senderId];

        await senderUser.save();
        await recieverUser.save();
        //delete invitation
        await FriendInvitation.findByIdAndDelete(id);

        //update online list
        friendsUpdates.updateFriends(senderId.toString());
        friendsUpdates.updateFriends(recieverId.toString())
        //update request list
        friendsUpdates.updateFriendsPendingInvitation(userId);

        return res.status(200).send("Friend successfully added.")


    }catch(err)
    {
        console.log(err);
        return res.status(500).send("something went wrong pleas try again.")
    }
}

module.exports=postAccept;