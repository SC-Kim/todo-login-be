require('dotenv').config()
const mongoose = require("mongoose")
const Schema = mongoose.Schema 
const jwt = require("jsonwebtoken")
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const userSchema = Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
}, {timestamps: true})

userSchema.methods.toJSON = function(){     // 백엔드에서 프론토엔드로 갈때 패스워드 항상 제외
    const obj=this._doc
    delete obj.password;
    delete obj.__v;
    delete obj.updatedAt;
    return obj;
}

userSchema.methods.generateToken = function(){
    const token = jwt.sign({_id:this.id}, JWT_SECRET_KEY, {expiresIn:'1d'}) // 토큰 유통기한 하루로 설정
    return token;
}

const User = mongoose.model("User", userSchema)
module.exports = User;


