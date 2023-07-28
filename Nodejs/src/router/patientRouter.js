const express = require("express");
const router = express.Router();
const path = require("path");
import patientController from "../controller/patientController";

router.post('/book-appointment', patientController.postBookAppointment);
router.post('/verify-book-appointment', patientController.postVerifyBookAppointment);



module.exports = router;