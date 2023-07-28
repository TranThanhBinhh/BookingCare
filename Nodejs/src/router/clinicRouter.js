const express = require("express");
const router = express.Router();
const path = require("path");
import clinicController from "../controller/clinicController";

router.get('/get-all-clinics', clinicController.getAllClinics);



module.exports = router;