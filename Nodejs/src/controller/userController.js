import pool from "../config/connectDB"
import userService from "../services/userService"
let handleUserLogin = async(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password )
    {
        return res.status(500).json({
            errCode:1,
            message:"Missing inputs parameter"
        })
    }
    let user = await userService.handleUserLogin(email,password)
    return res.status(200).json({
        errCode:user.errCode,
        message:user.errMessage,
        user
    });
}
let handleGetAllUsers = async(req,res)=>{
    let userId = req.query.id;
    if(!userId){
        return res.status(500).json({
            errCode:1,
            message:"Missing inputs parameter",
            data:[]
        })
    }
    let users = await userService.GetAllUsers(userId)
    return res.status(200).json({
        errCode:0,
        message:'OK',
        data :users
    });
}
let handleCreateNewUser = async(req,res)=>{
    let message = await userService.createNewUser(req.body)
    return res.status(200).json({
        message:message.message,
        errCode:message.errCode
    });
    
    
}
let handleUpdateUser = async(req,res)=>{
    let id = req.params.userId;
    let data = await userService.updateUser(req.body,id)
    return res.status(200).json({
        message:data.message,
        errCode:data.errCode

    });
}
let handleDeleteUser = async(req,res)=>{
    let id = req.params.userId;
    if(!id){
        return res.status(200).json({
        message:'Missing required params',
        });
    }   
    let data = await userService.deleteUser(id);
    return res.status(200).json({
        message:data.message,
        errCode:data.errCode
    });
}
export default{
    handleUserLogin,
    handleGetAllUsers,
    handleCreateNewUser,
    handleUpdateUser,
    handleDeleteUser
}