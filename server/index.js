const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()
app.use(express.json())
app.use(cors())


mongoose
.connect(process.env.MONGO_URI)
.then(()=>console.log(`mongodb connected successfully...😎}`))
.catch((error)=>console.log("mongodb connection error",error))