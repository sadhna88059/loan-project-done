var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const { home } = require("nodemon/lib/utils")
const nodemailer=require("nodemailer")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb+srv://project18:Sadhna@123@cluster0.0pktl.mongodb.net/loaninfo?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    // var email = req.body.email;
    var phno = req.body.phno;
    var loan=req.body.loan;
    var pan=req.body.pan;
    var lname=req.body.lname;
    var dob=req.body.dob;
    // var password = req.body.password;

    var data = {
        "name": name,
        // "email" : email,
        "phno": phno,
        "loan":loan,
        "pan":pan,
        "loan":lname,
        "dob":dob
        // "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_success.html')


    // var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: 'sadhnasharma41234@gmail.com',
    //       pass: ''
    //     }
    //   });
      
    //   var mailOptions = {
    //     from: 'sadhnasharma41234@gmail.com',
    //     to: 'sadhnasharma1808@gmail.com',
    //     subject: 'Sending Email using Node.js',
    //     text: `Hi Smartherd, thank you for your nice Node.js tutorials.
    //             I will donate 50$ for this course. Please send me payment options.`
    //     // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
    //   };
      
    //   transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log('Email sent: ' + info.response);
    //     }
    //   });
      
      






})


// app.post('/sign_up', (req, res) => {
//     const output = `
//       <p>You have a new contact request</p>
//       <h3>Contact Details</h3>
//       <ul>  
//         <li>Name: ${req.body.name}</li>
//         <li>Company: ${req.body.company}</li>
//         <li>Email: ${req.body.email}</li>
//         <li>Phone: ${req.body.phone}</li>
//       </ul>
//       <h3>Message</h3>
//       <p>${req.body.message}</p>
//     `;
  
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//           user: 'sadhnasharma41234@gmail.com', // generated ethereal user
//           pass: 'Sadhna@123'  // generated ethereal password
//       },
//       tls:{
//         rejectUnauthorized:false
//       }
//     });
  
//     // setup email data with unicode symbols
//     let mailOptions = {
//         from: '"Nodemailer Contact" <sadhnasharma41234@gmail.com>', // sender address
//         to: 'sadhnasharma1808@gmail.com', // list of receivers
//         subject: 'Node Contact Request', // Subject line
//         text: 'Hello world?', // plain text body
//         html: output // html body
//     };
  
//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);   
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
//         res.render('contact', {msg:'Email has been sent'});
//         console.log(output)
//     });
//     });


// var nodemailer = require('nodemailer');



// var index = require('home');
// app.use('/', index);

app.get("/",(req,res)=>{
    // res.render(home)
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);


console.log("Listening on PORT 3000");
