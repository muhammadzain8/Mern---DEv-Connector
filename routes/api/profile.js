const express=require('express')
const router=express.Router()
const auth=require('../../middleware/auth')
const User=require('../../models/User')
const Profile=require('../../models/Profile')
const Post=require('../../models/Post')
const {check,validationResult}=require('express-validator')

router.get('/me',auth,async(req,res) => {
    try{
        const profile= await Profile.findOne({user:req.user.id}).populate('user',['name','avatar'])
        if(!profile){
            return res.status(400).send({msg:'There is no profile for this USer '})
        }
        res.json({profile})
    }catch(err){
        console.log(err)    
        res.status(500).send('Server Error')
    }
})

// create profile
router.post('/',[auth,[
    check('status','Status required').not().isEmpty(),
    check('skills','Skills are required').not().isEmpty()
    ]],async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }
    const {company,website,location,bio,status,githubusername,skills,
           youtube,twitter,facebook,instagram,linkedin}=req.body;
    // build profile objects

    let profileFiedls={}
    profileFiedls.user=req.user.id;
    if(company) profileFiedls.company=company
    if(website) profileFiedls.website=website
    if(location) profileFiedls.location=location
    if(bio) profileFiedls.bio=bio
    if(status) profileFiedls.status=status
    if(githubusername) profileFiedls.githubusername=githubusername
    if(skills) profileFiedls.skills=skills.split(',').map(skill => skill.trim())
    
    profileFiedls.social={}
    if(youtube) profileFiedls.social.youtube=youtube
    if(facebook) profileFiedls.social.facebook=facebook
    if(twitter) profileFiedls.social.twitter=twitter
    if(linkedin) profileFiedls.social.linkedin=linkedin
    if(instagram) profileFiedls.social.instagram=instagram
    
    try {
        let profile=await Profile.findOne({user:req.user.id})
        if(profile){
            profile=await Profile.findOneAndUpdate({user:req.user.id},{$set:profileFiedls},{new:true})
            return res.json(profile)
        }
        profile=new Profile(profileFiedls) 
        await profile.save()
        res.json(profile)

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
})

//  Get all Profiles
router.get('/',async(req,res)=>{
    try {
        const profiles = await Profile.find().populate('user',['name','avatar'])
        
        res.json(profiles)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// get single profile by userId
router.get('/user/:user_id',async(req,res)=>{
    try {
        const profile=await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar'])
        if(!profile){
            return res.status(404).json({msg :" Profile not Found! "}) 
        }
        res.json(profile)

    } catch (error) {
        console.log(error.message)
        if(error.kind === 'ObjectId'){
            return res.status(400).json({msg : "Profile not Found!"})
        }
        res.status(500).send('Server Error')
    }
})
        
// Delete profile , post , user 
router.delete('/',auth,async(req,res)=>{
    try {
        
        await Post.deleteMany({user:req.user.id})
        await Profile.findOneAndRemove({ user:req.user.id}) 
        await User.findOneAndRemove({_id:req.user.id})

        res.json({msg : "User deleted "})

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})

// Add Profile Experience 
router.put('/experience',[auth,[
    check('title','Title required').not().isEmpty(),
    check('company','Compnay required').not().isEmpty(),
    check('from','form Date required').not().isEmpty(),

]],async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const{title,company,location,from,to,current,description}=req.body
    const newExp={title,company,location,from,to,current,description}
    try {
        const profile=await Profile.findOne({ user:req.user.id})
        profile.experience.unshift(newExp)  // push on  the beggining 
        await profile.save()

        res.json(profile)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')

    }

})

// Delete profile Experience
router.delete('/experience/:exp_id',auth,async(req,res)=>{
    try {
        const profile=await Profile.findOne({user:req.user.id})
        const removeIndex=profile.experience.map(item=>item.id).indexOf(req.params.exp_id)  // find the experience
        profile.experience.splice(removeIndex,1)    // remove the experience
       
        await profile.save()
        res.json(profile)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})


// Add Profile Education
router.put('/education',[auth,[
    check('school','School required').not().isEmpty(),
    check('degree','degree required').not().isEmpty(),
    check('fieldofstudy','fieldofstudy Date required').not().isEmpty(),
    check('from','from required').not().isEmpty()

]],async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const{school,degree,fieldofstudy,from,to,current,description}=req.body
    const newEdu={school,degree,fieldofstudy,from,to,current,description}
    try {
        const profile=await Profile.findOne({ user:req.user.id})
        profile.education.unshift(newEdu)
        await profile.save()

        res.json(profile)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')

    }

})

// Delete profile Education
router.delete('/education/:edu_id',auth,async(req,res)=>{
    try {
        const profile=await Profile.findOne({user:req.user.id})
        const removeIndex=profile.education.map(item=>item.id).indexOf(req.params.edu_id) // get remove index 
        profile.education.splice(removeIndex,1)
       
        await profile.save()
        res.json(profile)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router