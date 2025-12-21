const nodemailer= require("nodemailer")
require("dotenv").config();

exports.sentEmail =  (nameOfCandidate,toEmail,status)=>{
    console.log(nameOfCandidate,toEmail,status)
    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS

        }
    })

    let mailOptions={
        from:process.env.EMAIL_USER,
        to:toEmail,
        subject:"To notify the Request status",
        text:"Hello from TRIPEAZY Admin",
        html: `
        <b>Hello ${nameOfCandidate}! You got ${status} from Tripeazy Admin</b>
        ${status === "Rejected" 
            ? '<p>Sorry, You cannot continue with the Tripeazy Team.</p>' 
            : '<p>Click the link to login: <a href="http://localhost:5173/login">Login</a></p>'
        }
    `

    }

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
          console.log(`Error on sent Email :${error}`);
          return
          
        }
        console.log(`Message Sent Successfully ${info}`);
        
    })
}