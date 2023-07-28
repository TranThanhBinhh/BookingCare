import db from "../models/index"
let GetAllCodes = (typeInput) =>{
    return new Promise(async(resolve,reject)=>{
        
        try{ 
            if(!typeInput){
                resolve({
                    errCode:1,
                    errMessage:'Missing require parameters !'
                })
            }
            else{
                let allcodes = await db.Allcode.findAll({
                where:{ type : typeInput }
            });
            resolve({
                errCode: 0,
                errMessage:'OK',
                allcodes:allcodes
            });
            }
        }
        catch(e){
            reject(e);
        }
    })
}

module.exports ={
    GetAllCodes:GetAllCodes,
}