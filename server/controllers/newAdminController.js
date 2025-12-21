// // const express= require("express")
// // const NewAdminModel  = require("../model/CreateNewAdmin")
const Admin =require("../model/Admin")
const Role =require("../model/role")



exports.getNewAdmin= async (req,res)=>{
  // console.log("admin data fetching...")
  
  try{
    const admins = await Admin.find({ name: { $ne: "superadmin" },status:"active" }).populate("role");
    const fullRole = await Role.find()
    res.status(200).send({message:"Admins fetched successfully",admins:admins,role:fullRole})
    // console.log(admins)
  }
  catch(error){
     res.status(500).send(error.message)
     console.log(error)
     
  }

}

exports.updateAdminStatus =async (req,res)=>{
  const {id}= req.params
  const {status} =req.body
  console.log(status,id,"this is for")
  try{
    const response = await Admin.findByIdAndUpdate(id,
      {status:status },
    {new:true})
    res.status(200).json({message:"Admin Suspeded Successfully",response})
  }catch(error){
    console.log(error)
    res.status(500).json({error:"error ocuured while suspending Admin",error})
  }
}

exports.updateRole = async (req, res) => {
  
  const { id } = req.params;  
  const { role } = req.body;   
  console.log(role)
 
  try {
      // Find the new role document by roleName
      const newRole = await Role.findOne({ roleName: role });

      if (!newRole) {
          return res.status(404).json({ message: "Role not found" });
      }

      // Find and update the admin's role
      const updatedAdmin = await Admin.findByIdAndUpdate(
          id,
          { role: newRole._id },  // Update role ID
          { new: true }           // Return updated document
      ).populate("role");        // Populate role data

      if (!updatedAdmin) {
          return res.status(404).json({ message: "Admin not found" });
      }

      res.status(200).json({ message: "Role updated successfully", updatedAdmin });
  } catch (error) {
      console.error("Error updating role:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

exports.getSuspendedAdmin = async(req,res)=>{
   try{
    const admins = await Admin.find({ name: { $ne: "superadmin" },status:"deActive" }).populate("role");
    const fullRole = await Role.find()
    res.status(200).send({message:"Admins fetched successfully",admins:admins,role:fullRole})
    // console.log(admins)
  }
  catch(error){
     res.status(500).send(error.message)
     console.log(error)
     
  }

}

