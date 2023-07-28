import db from "../models/index"
import _ from 'lodash'
let getAllClinics = (id) => {
    return new Promise(async (resolve, reject) =>{
        try {
            let clinics = '';
            if (id === 'All'){
                clinics = await db.Clinic.findAll({
                   raw:true, 
                })
            }
            if (id && id !== 'All') {
                clinics = await db.Clinic.findOne({
                where:{id:1},
                raw:true,
            })
            }
            resolve({
                errCode:0,
                data:clinics
            })
        } catch (error) {
            reject(error);
        }
    })
}
module.exports ={
    getAllClinics:getAllClinics,
}