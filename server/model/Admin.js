const mongoose = require("mongoose");
const Role = require("./role");

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    status:{type:String,default:"active"},
    role: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Role", 
        required: true 
    }
}); 


module.exports = mongoose.model("Admin", adminSchema);
