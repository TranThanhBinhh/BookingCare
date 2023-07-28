import clinicService from "../services/clinicService"

let getAllClinics = async(req,res) =>{
    let id = req.query.id;
    try {
        if(!id){
            return res.status(200).json({
            errCode:-1,
            errorMessage:'Missing parameter '
        })
        }
            let respone = await clinicService.getAllClinics(id);
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

module.exports = {
    getAllClinics: getAllClinics,
}