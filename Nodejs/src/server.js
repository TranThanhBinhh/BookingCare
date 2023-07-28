import  express  from "express";
import configViewEngine from "./config/viewEngine";
import initWebRouter from "./router/web";
import connectDB from './config/connectDB';
import initAPIRouter from "./router/api";
import cors from 'cors';

require('dotenv').config();
const app = express()
app.use(cors({ 
  origin : true,
  credentials: true}));
const port = process.env.PORT;
app.use(express.urlencoded({ extended: true,limit:'50mb' }));
app.use(express.json({limit:'50mb'}));
configViewEngine(app);
initWebRouter(app);
initAPIRouter(app);
connectDB();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})