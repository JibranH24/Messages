"use strict"

const path = require("path");
const {Sequelize, Model, DataTypes, ValidationError } = require("sequelize");

exports.sequelize = new Sequelize({
    dialect:"sqlite",
    storage:path.join(__dirname, "db.sqlite"),
});

// define models we want to use

exports.Message = class Message extends Model {};
exports.User = class User extends Model {};

// last part points to what model we want to use
exports.Message.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true,
        },
        message:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize:exports.sequelize,
    }
)

exports.User.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true,
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
       type: DataTypes.STRING ,
       allowNull: false
    }
},
{
    sequelize: exports.sequelize,
}

)
exports.ValidationError = ValidationError