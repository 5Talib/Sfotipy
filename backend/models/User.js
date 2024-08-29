const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const User = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:false,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        private:true,
    },
    username:{
        type:String,
        required:true,
    },
    likedSongs:{
        type:String,
        default:"",
    },
    likedPlaylists:{
        type:String,
        default:"",
    },
    subscribedArtists:{
        type:String,
        default:"",
    },
});

User.pre("save", async function(){
    if(!this.isModified){
        return next();
    }

    try {
        const genSalt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password,genSalt);
        this.password=hashPassword;
    } catch (error) {
        console.log(error);
    }
});

User.methods.generateToken = async function(){
    try {
        return jwt.sign(
            {
                userId:this._id,
                email:this.email,
            },
            process.env.JWT_SECRET_KEY,
            // "secret",
            // {
            //     expiresIn:"30d",
            // }
        );
    } catch (error) {
        console.error("token error: ",error);
    }
};

User.methods.comparePassword = async function(password){
    try{
        // console.log(password,this.password);
        return await bcrypt.compare(password,this.password);
    }catch(error){
        console.error("token error: ",error);
    }
}

const UserModel = mongoose.model("User",User);

module.exports = UserModel;