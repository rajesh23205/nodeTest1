const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/fagli";

// var db;

module.exports = {

  errorResponse: function(){
    return {
      err:1,
      processCode:0,
      info:'DB Error'
    }
  },

  successResponse: function(){
    return {
      err:0,
      processCode:1,
      info:'Success'
    }
  },

  emailExist: function(){
    return {
      err:0,
      processCode:2,
      info:'Email Id already exist'
    }
  },

  invalidUsarResponse: function(){
    return {
      err:0,
      processCode:3,
      info:'Email or password is not valid'
    }
  },

  saveData: function(dbSchema, res){
    dbSchema.save(function(error){
      var resData;
      if(error){
        resData = {
          err:1,
          processCode:0,
          info:'DB Error'
        }
        res.json(resData);
      }else{
        resData = {
          err:0,
          processCode:1,
          info:'Success'
        }
        res.json(resData);
      }
    })
  },

  findData: function(){},

  findDataByQuery: function(){}

};
