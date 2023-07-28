import express  from "express";
import homeController from "../controller/homeController"; 
import multer from "multer";
import path from "path";
var appRoot = require('app-root-path');
let router = express.Router();
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log('Check approot')
        // cb(null,appRoot + '/src/pubic/image/');
        cb(null, path.join(appRoot.toString(), 'src', 'public', 'image'));
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
let upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRouter = (app)=>{
    router.get('/',homeController.GetHomepage)
    router.get('/user/:func/:userId',homeController.GetDetailpage)
    router.get('/home', (req, res) => {
        res.render('index.ejs')
    })
    router.get('/user/:userId',homeController.DeleteUser)
    router.post('/user/:func/:userId',homeController.EditUser)
    router.get('/form-detail',homeController.FormDetail)
    router.post('/comfirm',homeController.CreateNewUser)
    router.get('/upload',homeController.GetUpload)
    router.post('/save-img',upload.single('image'),homeController.SaveImg)
    return app.use('/',router)
}
export default initWebRouter;
