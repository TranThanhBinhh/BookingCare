const express = require("express");
const router = express.Router();
const path = require("path");
import specialtyController from "../controller/specialtyController";

router.get('/get-all-specialties', specialtyController.getAllSpecialties);
router.post('/create-new-specialty', specialtyController.createNewSpecialty);




module.exports = router;