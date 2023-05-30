const friendInvitation=require('../../models/friendInvitation')
const friendsUpdates=require('../../socketHandlers/updates/friends')
const postReject=async(req,res)=>{
    try{
        const {id}=req.body;
        const {userId}=req.user;
        const invitationExist = await friendInvitation.exists({
            _id:id
        });
        if(invitationExist){
            await friendInvitation.findByIdAndDelete(id);
        }
        else{
            return res.status(401).send("Error occured. Please try again.")

        }

        friendsUpdates.updateFriendsPendingInvitation(userId);
        return res.status(200).send("Invitaion Rejected !!!")

    }catch(err)
    {
        console.log(err);
        return res.status(500).send("Something went wrong please try again later")
    }
}

module.exports=postReject;