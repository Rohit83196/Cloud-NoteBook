const express = require('express');
const ser = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT_SECRET = "rohitistoxicin$ature";
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');


// Create a user using SignUp  : POST "./api/auth/createuser" no login required
router.post('/createuser', [
    body('email').isEmail(),
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),
],
    // (req,res)=>{
    //     // console.log(req.body);
    //     // const kk = ser(req.body)
    //     // kk.save()
    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         return res.status(400).json({ errors: errors.array() });
    //     }
    //     ser.create(    
    //         req.body 
    //         // {
    //         // name: req.body.na,
    //         // email: req.body.em,   
    //         // password: req.body.password,
    //     //   }
    //       )
    //       .then(create => res.json(create))
    //       .catch(err=>{console.log(err)
    //         res.json({error: 'please enter a unique value for email', message : err.message})}); 

    //     // res.send(req.body)
    //     // res.send("hello")
    //     // obj = {
    //     //     a:"thios", 
    //     //     number: 34
    //     // }
    //     // res.json(obj)
    // }

    async (req, res) => {
        let success =false
        // console.log(req.body); 
        // const kk = ser(req.body)
        // kk.save()
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // chech wheater the user with this email exists already
        try {

            let user = await ser.findOne({ email: req.body.email });
            // console.log(user);
            if (user) {
                return res.status(400).json({ success , error: "sorry a user with ths email already exists" })
            }

            const salt = bcrypt.genSaltSync(10);
            const secPass = await bcrypt.hash(req.body.password, salt)
            user = await ser.create(
                // req.body 
                // {
                //     name: req.body.na,
                //     email: req.body.em,   
                //     password: req.body.password,
                //       }
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    password: secPass,
                }
            )
            // res.json({"nice":"nice"})
            const data = {
                user:{
                    id:user.id
                }
            }
            const jwtData = jwt.sign(data , JWT_SECRET);
            console.log(jwtData);
            // res.json({ user })
            success = true
            res.json({success , jwtData})
        } catch (error) {
            console.log(error.message);
            res.status(500).send("internal server error")
        }

        //   .then(create => res.json(create))
        //   .catch(err=>{console.log(err)
        //     res.json({error: 'please enter a unique value for email', message : err.message})}); 

        // res.send(req.body)
        // res.send("hello")
        // obj = {
        //     a:"thios", 
        //     number: 34
        // }
        // res.json(obj)
    }

)


// Authenticate a user using  : POST "./api/auth/login" no login required
router.post('/login', [
    body('email').isEmail(),
    body('password',"password cannot be blank").exists(),

],
    async (req, res) => {
        let success =false
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }     
        const {email , password} = req.body;    //array destructinging
        try {
            let user = await ser.findOne({email});
            if (!user) {
                return res.status(400).json({success , error:"sorry this username doesnot exists "})
            }
            const passwordCompare = await bcrypt.compare(password , user.password)
            if (!passwordCompare) {
                success = false
                return res.status(400).json({success , error:"Wrong password"})
                
            }
            const data = {
                user:{
                    id:user.id
                }
            }
            const jwtData = jwt.sign(data , JWT_SECRET);
            console.log(jwtData);
            success = true;
            // res.json({ user })
            res.json({success,jwtData})
        }  catch (error) {
            console.log(error.message);
            res.status(500).send("internal server error")
        }

})

// Get loggedin User Details using JWT token  : POST "./api/auth/getuser"  login required
router.post('/getuser', fetchuser ,   async (req, res) => {
try {
    userId = req.user.id;
    const user = await ser.findById(userId).select("-password"); 
    res.send(user)
}   catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error")
}
})


module.exports = router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3YTI4YWRjZjA2OTI4NDI3N2NlZWE5In0sImlhdCI6MTY2ODk1MDE4OX0.JLa_DbaiawbrBhOEwo8sZhyyapBkGzFf_Sw8y5oczuM
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3YTI4YWRjZjA2OTI4NDI3N2NlZWE5In0sImlhdCI6MTY2ODk1MDI0MX0.KcBLwEr5MR3in4wy1rDRPCMp79nt1IqItyJo8kSTOFg