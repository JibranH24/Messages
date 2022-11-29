"use strict"

require("dotenv").config()
const bcrypt = require("bcryptjs");
const {sequelize, User} = require("./db");

let username = process.env.USERNAME;
let password = process.env.PASSWORD;

exports.createUser = async function createUser(username,password){

    try{
        await sequelize.sync();
        let salt = await bcrypt.genSalt();
        let hash = await bcrypt.hash(password, salt);

         const user = await User.create({username, password: hash})
          return user;
    }catch(err){
        console.error(err)
    }
}

//just for learning, wouldnt have this normally


 //createUser(username,password)