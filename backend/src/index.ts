import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";



/*
app.delete("/user/:id",(req,res,next) => {
    console.log(req.params.id);
    return res.send("HELLO");
});  //Express handles it as a middleware (are functions which handles request)
*/

const PORT=process.env.PORT || 5000;
connectToDatabase().then(()=> {
   
app.listen(PORT,() => 
    console.log("Server Open and connected to database"));  //To open the development server of the apllication

})
.catch((err) => console.log(err));



