import db from "../models/index"
import _, { includes } from 'lodash'
let getTopDoctors = (limit) =>{
    return new Promise(async (resolve, reject) =>{
        try {
            let doctors = await db.User.findAll({
                where:{roleid:'R2'},
                limit:limit,
                order:[["createdAt",'DESC']],
                attributes:{
                    exclude:['password']
                },
                include:[
                    {model:db.Allcode, as:'positionData', attributes:['valueEn','valueVi']},
                    {model:db.Allcode, as:'genderData', attributes:['valueEn','valueVi']},
                    {
                        model: db.Markdown,
                            attributes: [],
                            include: [
                                { model: db.Specialty, attributes: ['id', 'name'] }                          
                        ],
                            
                            raw:true,
                            nest:true,
                            
                    }

                ],
                raw:true,
                nest:true,
            })
            resolve({
                errCode:0,
                data:doctors
            })
        } catch (error) {
            reject(error);
        }
    })
}
let getAllDoctors = (id) =>{
    return new Promise(async (resolve, reject) =>{
        try {
            let doctors = '';
            if (id === 'All'){
                doctors = await db.User.findAll({
                where:{roleid:'R2'},
                attributes:{
                    exclude:['password','email']
                },
                include:[
                    {model:db.Allcode, as:'positionData', attributes:['valueEn','valueVi']},
                    {model:db.Allcode, as:'genderData', attributes:['valueEn','valueVi']},
                ],
                raw:true,
                nest:true,
            })
            }
            if(id && id !=='All'){
                doctors = await db.User.findOne({
                where:{roleid:'R2',id:id},
                attributes:{
                    exclude:['password']
                },
                include:[
                    {model:db.Allcode, as:'positionData', attributes:['valueEn','valueVi']},
                    {model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },                 
                    {
                        model: db.Markdown,
                            attributes: ['contentHTML', 'contentMarkdown', 'description'],
                            include: [
                                { model: db.Allcode, as: 'priceData', attributes: ['keyMap','valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentData', attributes: ['keyMap','valueEn', 'valueVi'] },
                                { model: db.Clinic, attributes: ['id', 'name', 'address'] },
                                { model: db.Specialty, attributes: ['id', 'name'] }                          
                        ],
                            
                            raw:true,
                            nest:true,
                            
                    }
                    ],
                raw:true,
                nest:true,
                })
            }
            resolve({
                errCode:0,
                data:doctors
            })
        }
        catch (error) {
            reject(error);
        }
    })
}
let saveInforDoctor =(data) =>{
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.contentHTML || !data.contentMarkdown ||
                !data.action || !data.priceId || !data.paymentId || !data.clinicId) {
                resolve({
                    errCode:1,
                    errMessage:'Missing parameter'
                })
            }
            else {
                if (data.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        description: data.description,
                        doctorId: data.id,
                        clinicId: data.clinicId,
                        specialtyId: data.specialtyId,
                        priceId: data.priceId,
                        paymentId: data.paymentId,
                    })
                }
                else if (data.action === 'EDIT') {
                    await db.Markdown.update({
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        description: data.description,
                        clinicId: data.clinicId,
                        specialtyId: data.specialtyId,
                        priceId: data.priceId,
                        paymentId: data.paymentId,     
                    }, { where: { doctorId: data.id } })
                }
                resolve({
                    errCode:0,
                    errMessage:'Success',
                })
            }
        } catch (error) {
            reject(error);
        }
    })  
}
let createSchedules = (data) => {
    return new Promise(async(resolve, reject) => { 
        try {
            if (!data && !data.arrSchedule || !data.doctorId || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage:'Missing parameters'
                })
            }
            else {
                let schedule = data.arrSchedule;
                schedule = schedule.map(item => {
                    item.maxNumber = 10
                    item.currentNumber = 0
                    item.date = String(item.date)
                    return item;

                }) 

                let existing = await db.Schedule.findAll({
                    where: {
                        doctorId: data.doctorId,
                        date: data.date,
                    },
                    attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                    raw:true
                })
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && a.date === b.date;
                });
                if (toCreate && toCreate.length > 0) { 
                    await db.Schedule.bulkCreate(toCreate)         
                }
                resolve({
                    errCode: 0,
                    errMessage:'Success'
                });
            }           
        } catch (error) {
            reject(error);
        }
    })
}
let getScheduleByDate = (doctorId, date) => { 
    return new Promise(async(resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage:'Missing parameters'
                })
            }
            else {
                
                let data = await db.Schedule.findAll({
                    where: { doctorId: doctorId, date: date },
                    include:[
                        { model: db.Allcode, as: 'timeData', attributes: ['valueEn', 'valueVi', 'keyMap'] },
                        // { model: db.User, as: 'doctorData', attributes: ['firstName', 'lastName'] },
                    ],
                    raw:true,
                    nest:true,
                    
                })
                if (!data) data = [];
                resolve({
                    errCode: 0,
                    data:data
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
let getExtraInforById = (doctorId) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    errMessage:'Missing parameters'
                })
            }
            else {
                
                let data = await db.Markdown.findAll({
                    where:{doctorId:doctorId},
                    attributes: [],
                    include: [
                        { model: db.Allcode, as: 'priceData', attributes: ['keyMap','valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'paymentData', attributes: ['keyMap','valueEn', 'valueVi'] },
                        { model: db.Clinic, attributes: ['id', 'name', 'address'] },
                        { model: db.Specialty, attributes: ['id', 'name'] }
                    ],
                    raw:true,
                    nest:true,
                    
                })
                if (!data) data = [];
                resolve({
                    errCode: 0,
                    data:data
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
let getFullDetailDoctor = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        console.log(doctorId)
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    errMessage:'Missing parameters'
                })
            }
            else {
                doctor = await db.User.findOne({
                where:{roleid:'R2',id:doctorId},
                raw:true,
                nest:true,
                })
                if (!doctor) doctor = [];
                resolve({
                    errCode: 0,
                    data:doctor
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
let getDoctorBySpecialty = (specialtyId) => { 
    return new Promise(async(resolve, reject) => {
        try {
            if (!specialtyId ) {
                resolve({
                    errCode: 1,
                    errMessage:'Missing parameters'
                })
            }
            else {
                
                let data = await db.User.findAll({
                    where: { roleid: 'R2' },
                    attributes:{
                                exclude:['password','email']
                            },
                    include: [
                        {model:db.Allcode, as:'positionData', attributes:['valueEn','valueVi']},
                        {
                            model: db.Markdown,
                            where: { specialtyId: specialtyId },
                            attributes: {
                                exclude: ['contentMarkdown', 'contentHTML', 'priceId', 'paymentId', 'count', 'clinicId']
                            },
                            include: [
                                { model: db.Allcode, as: 'priceData', attributes: ['keyMap', 'valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentData', attributes: ['keyMap','valueEn', 'valueVi'] },
                                { model: db.Clinic, attributes: ['id', 'name', 'address'] },
                                { model: db.Specialty, attributes: ['id', 'name'] }
                            ],
                            raw:true,
                            nest:true,
                            
                        }
                    ],
                    raw:true,
                    nest:true,
                    
                })
                if (!data) data = [];
                resolve({
                    errCode: 0,
                    data:data
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
module.exports ={
    getTopDoctors:getTopDoctors,
    getAllDoctors:getAllDoctors,
    saveInforDoctor: saveInforDoctor,
    createSchedules: createSchedules,
    getScheduleByDate: getScheduleByDate,
    getExtraInforById: getExtraInforById,
    getFullDetailDoctor: getFullDetailDoctor,
    getDoctorBySpecialty:getDoctorBySpecialty

    
}