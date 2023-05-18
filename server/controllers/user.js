import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser=async(req,res)=>{
    try{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser=  new user({
        name:req.body.name,
        username:req.body.username,
        password:hash,
        email:req.body.email,
        isAdmin:req.body.isAdmin
    })
    await newUser.save()
    const UserValid = await user.findOne({username:req.body.username})
    res.status(201).json(UserValid._id)
}
catch(err){
    console.log(err)
}
}
export const getUser=async(req,res)=>{
   try{

    const userData = await user.findById(req.params.id)
    res.status(200).json(userData)
    }
   catch(err){
    
    console.log(err)
    res.status(500).json(err)
   }
}
export const addFav=async(req,res)=>{
   try{
     const updated=  await user.findByIdAndUpdate(req.params.id, {$push : {recipe:{id:req.body.id,img:req.body.img,ingr: req.body.ingr,name:req.body.name}}},{new:true})
    
    res.status(201).json(updated)}
    catch(err){
        res.status(500).json(err)
    }
}

export const delFav=async(req,res)=>{
    try{
        const deleted=await user.findByIdAndUpdate(req.params.id,{$pull:{recipe:{id:req.body.id}}},{new:true})
        res.status(201).json(deleted)
    }
    catch(err){
        res.status(500).json(err)
    }
}
export const getAllUsers=async(req,res)=>{
    try{
        const users= await user.find()
        res.status(201).json(users)
    }
    catch(err){
        res.status(501).json(err)

    }
}

export const findFav=async(req,res)=>{
    try{
        
        const users= await user.find({_id:`${req.body.id}`,"recipe.id":req.body.recipe},)
        if(users.length>0)
        res.status(201).json("found")
        else
        res.status(201).json("not")

    }
    catch(err){
        res.status(501).json(err)
    }

}
export const listFav = async(req,res)=>{
    try{
        const users=await user.findById(req.body.id)
        res.status(201).json(users.recipe)
    }
    catch(err){
        res.status(500).json(err)
    }   
}
export const login = async (req,res,next)=>{
    try{
        const UserValid = await user.findOne({username:req.body.username})
        if(!UserValid)
        res.status(404).json("User not found")

       const isPwdValid = await bcrypt.compare(req.body.password, UserValid.password)
       if(!isPwdValid)
       res.status(404).json(404,"Wrong username or password!")

      const token=jwt.sign({userid:UserValid._id,name:UserValid.username,admin:UserValid.isAdmin}, process.env.JWT)
      const {password, ...otherDetails}=UserValid._doc
      res.cookie("access_token",token,{httpOnly:true}).status(200).json({...otherDetails})
    }
    catch(err){
        console.log(err)
    }
}