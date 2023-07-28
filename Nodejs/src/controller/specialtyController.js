import specialtyService from "../services/specialtyService"

let createNewSpecialty = async(req,res) =>{
    try {
            let response = await specialtyService.createNewSpecialty(req.body);
            return res.status(200).json(
            response
        );
        }
        
    catch (error) {
        return res.status(200).json({
            errCode:-1,
            errorMessage:'Error from server '
        })
    }
}
let getAllSpecialties = async(req,res) =>{
    try {
        let id = req.query.id;
        if (!id) { 
            return res.status(200).json({
            errCode:1,
            errorMessage:'Missing parameter'
            })
        }
        else {
            let response = await specialtyService.getAllSpecialties(id);
            return res.status(200).json(
                response
            );
            }   
        }
        
    catch (error) {
        return res.status(200).json({
            errCode:-1,
            errorMessage:'Error from server '
        })
    }
}


module.exports = {
    createNewSpecialty: createNewSpecialty,
    getAllSpecialties: getAllSpecialties,
}