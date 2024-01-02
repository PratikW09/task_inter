const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/Connection');
const {signup,login,logout, adduser, getuser, deleteuser, edituser} = require('./Controller/auth_controller');
require('dotenv').config();
const cors = require('cors');

const { verifyTokenMiddleware } = require('./utils/token');

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true

};

app.use(cors(corsOptions));
app.use(cookieParser());

const PORT = process.env.PORT || 4000;
//middleware
app.use(express.json());  
// MongoDB Connection
connectDB();
app.post("/auth/signup",signup)
app.post("/auth/login",login)
app.get("/auth/logout",logout)
app.post("/auth/adduser",verifyTokenMiddleware,adduser)
app.get("/getuser",getuser);
app.delete("/delete/:addUserId",verifyTokenMiddleware,deleteuser);
app.put("/edit/:addUserId",verifyTokenMiddleware,edituser);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
