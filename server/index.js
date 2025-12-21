const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const authRouter = require("./routes/authRoutes");
const roleRoutes = require("./routes/roleRoutes");
const newAdminRouter  = require("./routes/newAdmin")
const agency= require("./routes/agency")
const blogRouter = require("./routes/blog.route")
const packageRouter= require("./routes/packageRoute")
const profileRouter = require("./routes/profileRotuter")
dotenv.config()
app.use(express.json())
// app.use(express());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))                             
app.use("/api",authRouter)
app.use("/api/roles", roleRoutes);
app.use("/api/admins",newAdminRouter)
app.use("/api/agency",agency)
app.use("/api/blogs",blogRouter)
app.use("/api/packages",packageRouter)
app.use("/api/profile",profileRouter)

mongoose
.connect(process.env.MONGO_URI)
.then(()=>console.log(`mongodb connected successfully...😎`))
.catch((error)=>console.log("mongodb connection error",error))


const PORT = process.env.PORT || 3001
app.listen((PORT),()=>console.log(`server is running on port ${PORT}`))