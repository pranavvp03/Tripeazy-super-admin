const express=require("express")
const {getNewAdmin, updateRole,updateAdminStatus,getSuspendedAdmin }= require("../controllers/newAdminController")
const {authmiddleware} = require("../middleware/authMiddleware")
const router= express.Router()




// router.post("/",createNewAdmin)
router.get("/getAdmin",getNewAdmin)
router.put("/updateRole/:id",updateRole); 
router.put("/suspendAdmin/:id",updateAdminStatus);
router.get("/getSuspendedAdmin",getSuspendedAdmin);



module.exports = router
