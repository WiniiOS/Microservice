const mongoose = require("mongoose");
const jwt      = require("jsonwebtoken");
const express  = require("express");
const User     = require("./User");

const app      = express();
const PORT     = process.env.PORT_ONE || 7070 ;


// Note: - Please Update the mongoURL as it suits you with Local or the MongoDB Atlas URL
// Connection DB
mongoose.connect("mongodb://localhost:27017/auth-service", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Successfully connected to the database (Auth service)'))
.catch(() => console.log('Could not connect to the database. Exiting now...'));

//CORS error Handler,Errors Types and headers
// app.use((req,res,next) => {
//     res.setHeader('Access-Control-Allow-Origin','*');
//     res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With,Content,Accept,Content-Type,Authorization');
//     res.setHeader('Access-Control-Allow-Methods','POST');
//     next();
// });

/**
* Creates/Registers User
* @param {email} string Name of the User
* @param {password} String Name of the User
* @param {name} Name Name of the User
*/

app.post("/auth/register", async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const userExists = await User.findOne({ email: email });
        if (userExists){
            return req.json({ message: 'User Already Exist' });
        }else{
            const newUser = new User({ email, name, password });
            newUser.save()
            return res.send (newUser)
        }
    }catch(err){
        console.log('Error',err);
    }
});


/** 
* Signing Users with Providing teh JWT Token
* @param {email} string Email of the User
* @param {password} String Password of the User
*/

app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (user == null) {
            return res.json({message:"User Doesn't Exist"})
        } else {
            if (user.password !== password) {

                return res.json({ message:"Incorrect Password"});
                const payload = { email, name: req.body.name }
                jwt.sign(payload,"secret", (err, token) => {
                    if (err) return console.log(err);
                    else {
                        return res.send({ token: token });
                    }
                });
            }
        }
    } catch (error) {
        console.log('Error',error);
    }
});



app.use(express.json());

app.listen(PORT,() => {
    console.log(`Auth-Service at ${PORT}`);
})
