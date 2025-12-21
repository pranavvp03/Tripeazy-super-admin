const mongoose = require("mongoose")


const AgencySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  contactNO: {
    type: Number,
    required: true,
  },
  nameOfManager: {
    type: String,
    required: true,
  },
  registrationId: {
    type: String,
    required: true,
  },
  countryname: {
    type: String,
    required: true,
  },
  stateName: {
    type: String,
    required: true,
  },
  cityName: {
    type: String,
    required: true,
  },
 status:{
    type:String,
    default:"Requested"
  },
  image: {
    type: String,
    default: null,
  },
  document: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model("Agency",AgencySchema)

