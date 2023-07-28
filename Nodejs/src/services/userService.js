import db from "../models/index"
import bcrypt from "bcryptjs"
let handleUserLogin =(email,password)=>{
    return new Promise(async(resolve,reject)=>{
        try{ 
            let user = {};
            let isExist = await checkUserEmail(email);
            if(isExist){
                let userData = await db.User.findOne({
                where:{email:email},
                attributes: ['email','roleId','password','firstName','lastName'], 
                raw : true,

            })
                let check = await bcrypt.compareSync(password,userData.password);
                if(check){
                    user.errCode = 0;
                    user.errMessage = "OK";
                    delete userData.password;
                    user.user = userData;
                    
                }
                else{
                    user.errCode = 2;
                    user.errMessage = "Incorrect password";
                }
            }
            else{
                user.errCode = 1;
                user.errMessage =`Your's email isn't exist in your system.Please try other email`;
                
            } 
            resolve(user);      
        }
        catch(e){
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            let user = await db.User.findOne({
                where:{email:userEmail}
            })
            if(user){
                resolve(true);
            }
            else{
                resolve(false);
            }
        }
        catch(e){
            reject(e);
        }
    })
}
let GetAllUsers = (userId) =>{
    return new Promise(async(resolve,reject)=>{
        
        try{ 
            let users = '';
            if (userId === 'All'){
                users = await db.User.findAll({
                    attributes:{
                    exclude:['password']
                },
                })
            }
            if(userId && userId !=='All'){
                users = await db.User.findOne({
                where:{id:userId},
                attributes:{
                    exclude:['password']
                },
            }) 
        }
        resolve(users);
      }
        catch(e){
            reject(e);
        }
    })
}
let createNewUser = (data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let isExist = await checkUserEmail(data.email);
            if(!isExist){
                await db.User.create({
				firstName: data.firstname,
				lastName: data.lastname,
				gender: data.gender,
				phonenumber: data.phonenumber,
				address: data.address,
				email: data.email,
                roleid:data.role,
                image:data.avatar,
                positionId:data.position,
                password:bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))              
                });
            resolve({
                errCode : 0,
                message:'Add success'
                });
            }
            else resolve({
                errCode : 1,
                errMessage:'Email is already exist'
            })
        }
        catch(e){
            reject(e);
        }
    })
}
let deleteUser = (id) =>{
    return new Promise(async(resolve,reject)=>{
        try{
            await db.User.destroy({
                where:{id:id}
            })
            resolve({
                errCode : 0,
                message:'Delete success'
            })
        }
        catch(e){
            reject(e);
        }
    })
}
let updateUser = (data,id) => {
    return new Promise(async(resolve,reject)=>{
        try{
            await db.User.update({
				firstName: data.firstname,
				lastName: data.lastname,
				gender: data.gender,
				phonenumber: data.phonenumber,
				address: data.address,
                image: data.avatar,
                roleid:data.role, 
                positionId:data.position         
                },{where:{id:id}})
            resolve({
                errCode : 0,
                message:'Update success'
            })
        }
        catch(e){
            reject(e);
        }
    })
}
module.exports ={
    handleUserLogin:handleUserLogin,
    GetAllUsers:GetAllUsers,
    createNewUser:createNewUser,
    deleteUser:deleteUser,
    updateUser:updateUser
}