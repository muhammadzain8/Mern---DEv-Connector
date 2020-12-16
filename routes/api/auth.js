const express=require('express')
const router=express.Router()
const auth=require('../../middleware/auth')
const User=require('../../models/User')
const {check,validationResult}=require('express-validator')
const jwt=require('jsonwebtoken')
const config=require('config')
const bcrypt=require('bcryptjs')



router.get('/',auth,async(req,res) => {
    try{
        const user=await User.findById(req.user.id).select('-password')
        res.json(user)
    }catch(err){
        console.log(err.message)
        res.status(500).send('Server error')
         
    }
})

// Login
router.post('/',[
    check('email','Enter valid Email').isEmail(),
    check('password','password must exists').exists()
],async(req,res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }

    const {email,password}= req.body
    try{
        let user=await User.findOne({email})
        if(!user){
            return res.status(400).json({errors:[{msg:'Invalid Credientiasl '}]})
        }
        // checking matches
        const isMatch=await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({errors:[{msg:'Invalid Credientiasl '}]})
        }

        const payload={
            user:{
                id:user.id
            }
        }
        jwt.sign(payload,config.get('jwtSecret'),(err,token)=>{
            if(err) throw err
            res.json({token})
        })
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error')
    }  
})


module.exports = router