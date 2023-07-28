import pool from "../config/connectDB"
import allCodeService from "../services/allCodeService"
let handleGetAllCodes = async(req,res) => {
    try {
        let data = await allCodeService.GetAllCodes(req.query.type)
        return res.status(200).json({
        errCode:data.errCode,
        message:data.errMessage,
        data :data.allcodes
    });
    } catch (error) {
        console.log('GetAllCode error: ' + error)
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error from server'
        })
    }
}
module.exports ={
    handleGetAllCodes:handleGetAllCodes
}
