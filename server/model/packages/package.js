const mongoose = require("mongoose")

const PakageSchema = new mongoose.Schema({
    companyDescription :{
        type:String,
    
    },
    destination :{
        type:String,
        required:true

    },
    destinationCategory :{
        type:String,
        required:true
    },

    adult :{
        type:Number,
        required:true

    },
    minor :{
        type:Number,
        required:true

    },
    phoneCode :{
        type:String,
        required:true

    },
    mobileNumber :{
        type:Number,
        required:true

    },
    currency :{
        type:String,
        required:true

    },
    payment :{
        type:Number,
        required:true

    },
    packageDescription :{
        type:String,
        required:true

    },
    agencyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Agency"
    },
    ratings:{
      type:Number
    },
   images: [
  {
    url: {
      type: String,
      required: true
    },
    public_id: {
      type: String,
      required: true
    }
  }
],
    likedBy: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: "likedBy.userModel", 
          },
          userModel: {
            type: String,
          
            enum: ["User", "Agency"], 
          },
          status: {
            type: Boolean,
            default:false,
          },
        },
      ],
      
      
  
    
})
module.exports = mongoose.model("packageModel",PakageSchema)