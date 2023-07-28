import db from "../models/index"
require('dotenv').config();
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from 'uuid';
let buildUrlEmail = (doctorId,token) => { 
    let result = '';
    return result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`

}
let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.date || !data.timeType || !data.doctorId ) {
                resolve({
                    errCode: 1,
                    errMessage:'Missing parameters'
                })
            }
            else {
                let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
                await sendSimpleEmail({
                    email: data.email,
                    patientName: data.firstname + " " + data.lastname,
                    doctorName: data.doctorName,
                    time: data.time,
                    redirectLink:buildUrlEmail(data.doctorId,token)
                });
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleid: 'R3',
                        firstName: data.firstname,
                        lastName: data.lastname,
                        gender: data.gender,
                        phonenumber: data.phonenumber,
                        address: data.address,
                    },
                });
                let schedule = await db.Schedule.findOne({
                        where: {
                            doctorId: data.doctorId,
                            date: data.date,
                            timeType: data.timeType,
                        },
                    });
                if (user && schedule && schedule.currentNumber < schedule.maxNumber) {
                    schedule.currentNumber += 1;
                    await db.Schedule.update(
                        { currentNumber: schedule.currentNumber },
                        { where: { id: schedule.id } }
                    );
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id,statusId:'S3' },
                        defaults :{
                            statusId: 'S1',
                            patientId: user[0].id,
                            doctorId: data.doctorId,
                            date: data.date,
                            timeType: data.timeType,
                            token:token
                        }
                    })
                    resolve({
                        errCode:0,
                        errMessage:'Booking successful',
                    })
                } 
                resolve({
                        errCode:2,
                        errMessage:'Full booking',
                    })
                }
            }
            
            
        catch (error) {
            reject(error);
        }
    })
}
let sendSimpleEmail = async(dataSend) => {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"BookingCare" <BookingCare.com.vn>', // sender address
    to: dataSend.email, // list of receivers
    subject: "Xác nhận lịch khám bệnh", // Subject line
      html: `
      <h2>Xin chào ${dataSend.patientName} !</h2>
      <p>Bạn nhận được email này vì đã đặt lịch khám bệnh trên BookingCare.</p>
      <h3>Thông tin đặt lịch :</h3>
      <div><b>Thời gian: ${dataSend.time}</b></div>
      <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
      <p>Nếu các thông tin trên là đúng, vui lòng click vào đường dẫn bên dưới để 
      xác nhận và hoàn tất thủ tục khám bệnh.</p>
      <div>
      <a href ="${dataSend.redirectLink}">Click here</a>
      <div>Xin chân thành cảm ơn !</div>
      </div>

    `, // html body
  });
}
let postVerifyBookAppointment = (data) => {
    return new Promise(async(resolve, reject) => { 
        try {
            if (!data.doctorId || !data.token) {
                resolve({
                    errCode: 1,
                    errMessage:'Missing parameters'
                })
            }
            else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })
                if (appointment) {
                    await appointment.update({
                        statusId: 'S2'
                    })
                    resolve({
                        errCode: 0,
                        errMessage:'Appointment status update successful'
                    })
                }
                else {
                    resolve({
                        errCode: 2,
                        errMessage:'Appointment confirmed!'
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}
module.exports ={
    postBookAppointment: postBookAppointment,
    sendSimpleEmail: sendSimpleEmail,
    postVerifyBookAppointment:postVerifyBookAppointment
}