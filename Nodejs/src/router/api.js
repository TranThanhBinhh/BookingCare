import express  from "express";
let router = express.Router();
const initAPIRouter = (app)=>{
    const userRoutes = require("./userRouter");
    router.use("/user", userRoutes);
    const allCodeRoutes = require("./allCodeRouter");
    router.use("/allcode", allCodeRoutes);
    const doctorRoutes = require("./doctorRouter");
    router.use("/doctor", doctorRoutes);
    const clinicRoutes = require("./clinicRouter");
    router.use("/clinic", clinicRoutes);
    const patientRoutes = require("./patientRouter");
    router.use("/patient", patientRoutes);
    const specialtyRoutes = require("./specialtyRouter");
    router.use("/specialty", specialtyRoutes);

module.exports = router;
    return app.use('/api',router)
}
export default initAPIRouter;
