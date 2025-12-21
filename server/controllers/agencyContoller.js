const agency = require("../model/Agency/AgencyMode")
const {sentEmail} =require("../lib/acceptEmail")

exports.fetchAgecy = async (req,res)=>{

    // console.log("agency data is fetching");

    try{
       const agencyData =  await  agency.find({}).select("-password")
       
       res.status(200).send(agencyData)
    //    console.log(agencyData)


    }catch(error){
     res.status(500).send( error)
     console.error(error)
    }
    

}

exports.updateAgencyStatus= async (req,res)=>{
        console.log(req.body)
         const {id}=req.params
         const{status}=req.body
         console.log(id)
         console.log(status)

         

         try{
            console.log("Agency status is updating")
          const response=  await agency.findByIdAndUpdate(id,{status},{new:true, select:"email companyName"})
          
          res.status(200).json({
            message: "Agency status updated successfully",
            data: response
        });
           sentEmail(response.companyName,response.email,status)
        

         }

         catch(error){
           res.status(500).json({ message:"internal server error occured while updating Agency status",error})
           console.error(error)
         }

}
exports.searchAgency =async  (req,res)=>{
   const {search} = req.query 
    console.log(search)
 try{ 
   const response = await agency.find({companyName:{$regex:search,$options:'i'}})
   if(response.length ===0){
     res.status(404).json({message:`There is no agency for ${search}`})
     return
   }
   res.status(200).json({message:"agency found", response})
   console.log(response)

 }catch(error){
  console.log(error," error while search agency")
  res.status(500).json({message:"error occured while search agency",error})
 }
}