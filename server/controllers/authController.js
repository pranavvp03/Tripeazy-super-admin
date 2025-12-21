const express = require("express")
const Admin = require("../model/Admin")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Role = require("../model/role")
const Contact = require("../model/contact")
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"


exports.createAdmin = async (req, res) => {
    // const { name, email, password, roleName } = req.body; 
    //   file= req.file
    const {name,password,email,phoneNumber,gender,position}=req.body
    // console.log(name,password,email,phoneNumber,gender,position)
    // console.log(position);
    
    

    try {
        

        // Fetch the role by roleName
        const role = await Role.findOne({ roleName:position });
        console.log(role)
        if (!role) {
            return res.status(404).json({ message: `Role '${roleName}' not found` });
        }

        // Check if an admin with the same email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).send({ error: "Admin with this email already exists" });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new admin
        // const admin = new Admin({
        //     name,
        //     email,
        //     password: hashedPassword,
        //     role: role._id, // Save role as ObjectId
        // });
        const admin =  new Admin ({
                  name,
                  password:hashedPassword,
                  email,
                  phoneNumber,
                  gender,
                  status:"active",
                  role: role._id
                  // file
                 })

        await admin.save();
        res.status(201).json({ message: "Admin created successfully", admin });
    } catch (error) {
        res.status(500).json({ message: "Admin creation failed", error: error.message });
    }
};

// Login Super Admin
exports.loginAdmin = async (req,res)=>{
    const {email,password} = req.body;
    console.log(password,email);
    
    try {
        const admin = await Admin.findOne({email}).populate("role");
        console.log(admin,"admin");
        if(!admin){
            return res.status(404).json({message:"Admin not found"})
        }

        const isPasswordValid = await bcrypt.compare(password,admin.password);
        if(!isPasswordValid){
            return res.status(401).json({message: "invalid credentials"})
        }

        const token = jwt.sign(
            {id:admin._id, role:admin.role.roleName},
            JWT_SECRET,
            {expiresIn:"30d"}
        )

        res.status(200).json({message:"Login successful",token,
            role: admin.role,
            permissions: admin.role.permissions,user:{name:admin.name,email:admin.email}})
            console.log(admin.role.roleName,"role");
    } catch (error) {
        console.log(error,"error in login admin");
        res.status(500).json({message:"Login failed please try again later."})
    }
}

exports.getContactRequests = async (req, res) => {
    try {
      const { read, type } = req.query;
  
      let filter = {};
      if (read) {
        filter.read = read === "true" ? true : false;
      }
      if (type) {
        filter.type = type; // Filter by user or agency (future use)
      }
  
      const contactRequests = await Contact.find(filter).sort({ createdAt: -1 });
  
      res.status(200).json({ success: true, data: contactRequests });
    } catch (error) {
      console.error("Error fetching contact requests:", error);
      res.status(500).json({ success: false, message: "Failed to fetch contact requests." });
    }
  };
  

exports.markAsRead = async (req, res) => {
    try {
        console.log("request hitted for mark as read");
      const { id } = req.params;
      await Contact.findByIdAndUpdate(id, { read: true });
      res.status(200).json({ success: true, message: "Notification marked as read." });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ success: false, message: "Failed to mark notification as read." });
    }
  };