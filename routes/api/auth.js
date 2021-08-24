const express =require('express')
const router =express.Router()
const auth =require("../../middleware/auth")
const User = require('../../models/User')

const jwt =require('jsonwebtoken')
const { check, validationResult } = require('express-validator');
const config =require('config')
const bcrypt =require('bcryptjs')

//@route   GET api/auth
//@desc    Test route
//@access  public


//here the auth page protected by auth middleware(jwttoken middleware)
router.get("/" ,auth,async(req,res)=>{
    try {
        const user =await User.findById(req.user.id).select('-password') //without password
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
        
    }
}  )




//@route   POST api/auth
//@desc    Authenticate user && get token
//@access  public


router.post("/" , [
    check('email' , 'Please include a valid email ').isEmail(),
    check('password' , 'Password is required').exists()
] ,
async(req,res)=>
{
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const {email,password} =req.body
    try {

    //See if the user exists 
    let user =await User.findOne({email})
    if(!user){
        return res.status(400).json({errors:[{msg: 'Invalid credentials'}]})
    }

    //check email password

    const isMatch =await bcrypt.compare(password , user.password)
    
    if(!isMatch){
       return res.status(400).json({errors:[{msg: 'Invalid credentials'}]})
    }



    //returm jsonwebtoken
    const payload ={
        user:{
            id:user.id //id for passung with jwt make token
        },
        name:{
            name:user.name //optional
        },
        email:{
            email:user.email //optional
        }
    }
    jwt.sign(
        payload ,
        config.get('jwtSecret'),
        {expiresIn:36000},
        (err,token)=>{
            if(err) throw err;
            res.json({token})
        }) 

    // res.send('user registered')  
        
    } catch (error) {
        console.log(error);
        res.status(500).json("server error")
    }
    
}
)



module.exports =router;