const express = require("express")
 const router = express.Router()
 
 const {fetchProfile,EditAdminName}= require("../controllers/profileController")
 const {verifyToken} = require ("../middleware/authMiddleware")

 router.get("/getProfile",verifyToken,fetchProfile)
 router.put("/editAdminName",verifyToken,EditAdminName)

module.exports= router