import db from "../models/index";
import multer from "multer";
import path from "path";
import bcrypt from "bcryptjs"
let GetHomepage = async(req,res)=>{
    try{
        let data = await db.User.findAll();
        console.log(data)
        return res.render('index.ejs',{dataUser:data});
    }
    catch(e){
        console.log(e)
    }
}
let GetDetailpage = async(req,res)=>{
    let id = req.params.userId;
    let func = req.params.func;
    const [user, fields] = await pool.execute(`SELECT * FROM table1 where Maso = "${id}"`);
    return res.render('Detaill.ejs',{user:user,func:func});
}
let CreateNewUser = async(req,res)=>{
    try{
        await db.User.create({
				firstName: req.body.firstname,
				lastName: req.body.lastname,
				gender: req.body.gender,
				phonenumber: req.body.phonenumber,
				address: req.body.address,
				email: req.body.email,
                roleid:req.body.roleId,
                password:bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
			});
        console.log(req.body)
        return res.redirect('/');
    }
    catch(e){
        console.log(e)
    }
    
    
}
let FormDetail = async(req,res)=>{
    try{
        return res.render('detailForm.ejs');
    }
    catch(e){
        console.log(e)
    }
}
let DeleteUser = async(req,res)=>{
     let id = req.params.userId;
     await pool.execute(`DELETE FROM table1 WHERE Maso = "${id}"`);
     return res.redirect("/");
}
let EditUser = async(req,res)=>{
     let id = req.params.userId;
     let func = req.params.func;
     
     if(func =="edit")
     {
        let Hoten = req.body.Fullname;
        let Ngaysinh = req.body.Birthday;
        let Nghenghiep = req.body.Job;
        let Phone = req.body.Phone;
        let Email = req.body.Email;
        await pool.execute(`update table1 set Hoten = ?,Ngaysinh = ?,Nghenghiep = ?,Phone =?,Email = ? where Maso = ?`,
        [Hoten,Ngaysinh,Nghenghiep,Phone,Email,id]);
        return res.redirect("/");
     }
     else{
        return res.redirect("/");
     }
}
let GetUpload = async(req,res)=>{
    return res.render('UploadFile.ejs')
}
let SaveImg = async(req,res)=>{
    console.log(req.file);
     if (req.fileValidationError) {

        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    res.send(`You have uploaded this image: <hr/><img src="/image${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    
}
export default {
    GetHomepage,
    GetDetailpage,
    CreateNewUser,
    FormDetail,
    DeleteUser,
    EditUser,
    GetUpload,
    SaveImg

}