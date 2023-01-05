const express=require("express");
const app=express();

require("dotenv").config();
const connectDB=require("./config/dbConfig");

connectDB();

const port=process.env.port || 5000;
app.use(express.json());

app.use("/api/users",require("./routes/usersRoute"));
app.use("/api/buses",require("./routes/busesRoute"));
app.use("/api/bookings",require("./routes/bookingsRoute"));

//for deploying i have to tell heroku that where is client
//i have to write config for heroku
const path=require("path");
if(process.env.NODE_ENV==="production")
{
    //i am deploying complete route folder so i have to write client/build
    //for all req from the client im sending the response
    app.use(express.static("client/build"));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client/build/index.html'));
    });
}



app.listen(port,()=>{
    console.log(`App is listening on port ${port}!`);
})
