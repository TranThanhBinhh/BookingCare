const express = require("express");
const router = express.Router();
const path = require("path");
import doctorController from "../controller/doctorController";

router.get('/get-top-doctors',doctorController.getTopDoctors);
router.get('/get-all-doctors',doctorController.getAllDoctors);
router.post('/save-infor-doctor', doctorController.postInforDoctor);
router.post('/create-schedules', doctorController.createSchedules);
router.get('/get-schedule-doctor-by-date', doctorController.getScheduleByDate);
router.get('/get-extra-infor-by-id', doctorController.getExtraInforById);
router.get('/get-doctor-by-specialty', doctorController.getDoctorBySpecialty);





module.exports = router;