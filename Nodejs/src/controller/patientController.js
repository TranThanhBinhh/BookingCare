import patientService from "../services/patientService"

let postBookAppointment = async (req, res) => {
    try {
        let response = await patientService.postBookAppointment(req.body);
        return res.status(200).json(
        response
        );
    }
        
    catch (error) {
        return res.status(200).json({
            errCode:-1,
            errorMessage:'Error from server '
        })
    }
}
let postVerifyBookAppointment = async (req, res) => {
    try {
        let response = await patientService.postVerifyBookAppointment(req.body);
        return res.status(200).json(
            response
        );
    }
        
    catch (error) {
        return res.status(200).json({
            errCode: -1,
            errorMessage: 'Error from server '
        })
    }
}
module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment
}