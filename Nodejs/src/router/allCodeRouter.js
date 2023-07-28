const express = require("express");
const router = express.Router();
const path = require("path");
import allCodeController from "../controller/allCodeController";

    router.get('/get-allcodes',allCodeController.handleGetAllCodes);

module.exports = router;