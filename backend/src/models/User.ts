import mongoose from "mongoose";
import {randomUUID} from "crypto";

const ChatSchema = new mongoose.Schema({
id:{
    type:String,
    default:randomUUID(),
},
role:{                                   //Assitant or the User are role
    type:String,
    required:true,
},
content:{                             //Message property of the user
    type:String,
    required:true,
},
})

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    chats: [ChatSchema],
});

export default mongoose.model("User",UserSchema);