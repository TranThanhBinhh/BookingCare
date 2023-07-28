import db from "../models/index"
import _ from 'lodash'
let createNewSpecialty = (data) => {
    return new Promise(async (resolve, reject) =>{
        try {
            if (!data.name || !data.descriptionMarkdown || !data.descriptionHTML) {
                resolve({
                    errCode: 1,
                    errMessage:'Missing parameters'
                })
            }
            else {
                await db.Specialty.create({
                    name: data.name,
                    descriptionMarkdown: data.descriptionMarkdown,
                    descriptionHTML: data.descriptionHTML,
                    image:data.image,        
                });
            resolve({
                errCode : 0,
                message:'Add success'
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}
let getAllSpecialties = (id) => {
    return new Promise(async (resolve, reject) =>{
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage:'Missing parameters'
                })
            }
            else {
                let specialties = '';
                if (id === 'All') {
                    console.log(id);

                    specialties = await db.Specialty.findAll({
                    raw:true,
                    })
                }
                if(id && id !=='All'){
                    specialties = await db.Specialty.findOne({
                    where:{id:id},
                    raw:true,
                    })
                }
                resolve({
                    errCode:0,
                    data:specialties
                })
            }
        }
        catch (error) {
            reject(error);
        }
    })
}
module.exports ={
    createNewSpecialty: createNewSpecialty,
    getAllSpecialties:getAllSpecialties
}