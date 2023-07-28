import doctorService from "../services/doctorService";
let getTopDoctors = async(req,res) =>{
    let limit = req.query.limit;
    try {
        if(limit){
            let respone = await doctorService.getTopDoctors(+limit);
            return res.status(200).json(
            respone
        );
    }
        
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode:-1,
            errorMessage:'Error from server '
        })
    }
}
let getAllDoctors = async(req,res) =>{
    let id = req.query.id;
    try {
        if(!id){
            return res.status(200).json({
            errCode:-1,
            errorMessage:'Missing parameter '
        })
        }
            let respone = await doctorService.getAllDoctors(id);
            return res.status(200).json(
            respone
        );
        }
        
    catch (error) {
        return res.status(200).json({
            errCode:-1,
            errorMessage:'Error from server '
        })
    }
}
let postInforDoctor =async(req,res) =>{
    try {
        let response = await doctorService.saveInforDoctor(req.body);
        return res.status(200).json(
            response
            )
    } catch (error) {
        return res.status(200).json({
            errCode:-1,
            errorMessage:'Error from server '
        })
    }
}
let createSchedules = async (req, res) => { 
    try {
        let response = await doctorService.createSchedules(req.body);
        return res.status(200).json(
            response
            )
    }
    catch {
        return res.status(200).json({
            errCode:-1,
            errorMessage:'Error from server '
        })
    }
}
let getScheduleByDate = async(req, res) => {
    try {
        let respone = await doctorService.getScheduleByDate(req.query.doctorId,req.query.date);
        return res.status(200).json(
            respone
            )
    }
    catch {
        return res.status(200).json({
            errCode:-1,
            errorMessage:'Error from server '
        })
    }
}
let getExtraInforById = async (req, res) => {
    try {
        let response = await doctorService.getExtraInforById(req.query.doctorId);
        return res.status(200).json(
            response
            )
    }
    catch {
        return res.status(200).json({
            errCode:-1,
            errorMessage:'Error from server '
        })
    }
} 
let getDoctorBySpecialty = async (req, res) => {
    try {
        let response = await doctorService.getDoctorBySpecialty(req.query.specialtyId);
        return res.status(200).json(
            response
            )
    }
    catch {
        return res.status(200).json({
            errCode:-1,
            errorMessage:'Error from server '
        })
    }
} 
module.exports ={
    getTopDoctors:getTopDoctors,
    getAllDoctors:getAllDoctors,
    postInforDoctor: postInforDoctor,
    createSchedules: createSchedules,
    getScheduleByDate: getScheduleByDate,
    getExtraInforById: getExtraInforById,
    getDoctorBySpecialty: getDoctorBySpecialty,
}