
const User=require('../../models/user')
const FriendInvitation=require('../../models/friendInvitation')
const friendsUpdate=require('../../socketHandlers/updates/friends')

const postInvite=async(req,res)=>{
    const {targetMailAddress}=req.body;
    const {userId,mail}=req.user;
    
    if(mail.toLowerCase()===targetMailAddress.toLowerCase()){
        return res.status(409).send("Sorry,you cannot become friend with yourself.");
    }
    const targetUser=await User.findOne({mail:targetMailAddress.toLowerCase()})
    if(!targetUser)
    {
        return res.status(404).send(`Friend of ${targetMailAddress} has not been found. Please Check mail address`)
    }

    // check if invite already sent

    const invitationAlreadyRecieved=await FriendInvitation.findOne({
        senderId:userId,
        recieverId:targetUser._id
    })

    if(invitationAlreadyRecieved)
    {
        return res.status(409).send('Invitation has been already sent.');
    }

    //if user is already a friend

    const userAlreadyFriends=targetUser.friends.find(friendId=>
        friendId.toString()===userId.toString()
        );
    if(userAlreadyFriends)
    {
        return res.status(409).send('Friend already added . Please check friendlist.')
    }


    const newInvitation=await FriendInvitation.create({
        senderId:userId,
        recieverId:targetUser._id
    });

    friendsUpdate.updateFriendsPendingInvitation(targetUser._id.toString());

    return res.status(201).send("Invitation is sent");

};

module.exports=postInvite;