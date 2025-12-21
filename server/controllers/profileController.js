const adminModel = require("../model/Admin")
const role = require("../model/role")

exports.fetchProfile = async (req,res)=>{
    console.log("api hit  profile controller")
    if(!req.user){
        res.status(401).json({message:"unAuthorized"})
    }
   const  userId = req.user.id
   
   console.log(userId, "this is the id ")

  try{
    const response = await adminModel.findById(userId).populate("role")
    if(response){
        res.status(200).json({message:" data fetched successfully",response})
    }
    console.log(response, "this is the fetched result")

  }catch(error){
    res.status(500).json({message:"error occured while fetching personal detailes",error})
    console.log(error," this is the result ")
  }
}

exports.EditAdminName= async (req,res)=>{
     if(!req.user){
        res.status(401).json({message:"unAuthorized"})
    }
   const  userId = req.user.id
   try {
    const {  name } = req.body;
    const updatedUser = await adminModel.findByIdAndUpdate(
      userId,
      { name },
      { new: true }
    );
    res.status(200).json("this is data afte updating",updatedUser)
  } catch (err) {
    res.status(500).json({ error: "Failed to update name" });
  }
}