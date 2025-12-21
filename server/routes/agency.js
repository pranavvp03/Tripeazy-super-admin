const express =require("express")
const {fetchAgecy,updateAgencyStatus,searchAgency} =require("../controllers/agencyContoller")

const router=express.Router()

router.get("/fetchAgency",fetchAgecy)
router.put("/updateStatus/:id", updateAgencyStatus);
router.get("/SearchAgency",searchAgency );


// console.log("agency updating")


module.exports = router
