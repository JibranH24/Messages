"use strict"

const http = require("http");
const bcrypt = require("bcryptjs")
const {User} = require("./db")

exports.cors = function (_req, res, next){
    res.set("Access-Control-Allow-Origin","*")
    next();
}
exports.auth = async function (_req, res, next){
   const AUTH_TYPE = "Basic";
   let header = _req.get("Authorization");

   if(!header){
    res.set("WWW-Athenticate","Basic")
    res.status(401).send({error:http.STATUS_CODES[401]})
    return;
   }

   let [type, token] = header.split(" ");

   if(type !== AUTH_TYPE ||!token){
    res.status(401).send({error:http.STATUS_CODES[401]})
    return;
   }

   let buffer = Buffer.from(token,"base64")
   let decoded = buffer.toString("utf8")
   let [username, password] = decoded.split(":")

   if(!password){
    res.status(401).send({error:http.STATUS_CODES[401]})
    return;
   }
   //protects from timing attack
   try {
    let user = await User.findOne({ where: { username }});
    let hash = user ? user.get("password"): "undefined";

    let success = await bcrypt.compare(password, hash)

    if (success){
        next()
        return;
    }
    res.status(401).send({error:http.STATUS_CODES[401]})
    } catch (err){
        res.status(500).send({error:http.STATUS_CODES[500]})
        next(err)
    }
}

    
   
