var express = require("express");
var router = express.Router();
const signUpSchema = require("../schema/signUpModal");
const registerHotelSchema = require("../schema/hotelRegisterModal");
const findRoommateSchema = require("../schema/findRoommateModal");
const NotificationSchema = require("../schema/notificationModal");
var mongoUtil = require( '../mongoUtil' );
var commonUtils = require('../commonUtils');


/**
 * create collections
 */
router.get("/createCollection", function(req, res, next){
    res.send("createCollection url hit");
    // mongoUtil.createCollection("signup");
})


/**
 * sign handler
 */
router.post("/signup", function(req, res, next){
  var reqData = req.body;
  var signUpDb = new signUpSchema(reqData);
  var query = {"email":reqData.email};
  signUpSchema.find(query, function (err, signUpData) {
    if (err)  return handleError(err);
    else{
      if(signUpData.length > 0){
        var resData = commonUtils.emailExist();
        res.send(resData);
      }else{
        commonUtils.saveData(signUpDb, res);
      }
    }
  })
})

router.post("/setNotification", function(req, res, next){
  var reqData = req.body;
  var setNotificationData = new NotificationSchema(reqData);
  setNotificationData.save(function(error){
    if(error){
      console.log("error "+error);
      res.json({res:"error"});
    }else{
      res.json({res:"success"});
    }
  })
})

router.post("/notificationData", function(req, res, next){
  var data = req.body;
  var query = { 'finderUserID': data.userId, 'NotificationSeen': data.isSeen };
  NotificationSchema.find(query, function (err, userData) {
    if(err){
      console.log("error "+err);
      res.json({res:"error"});
    }else{
      res.json({
        res:"success",
        data:userData
      });
    }
  })
})

router.post("/setNotificationSeen", function(req, res, next){
  var data = req.body;
  var query = { 'finderUserID': data.userId };
  var updateData = { 'NotificationSeen' : true };
  NotificationSchema.update(query, updateData, function (err, userData) {
    if(err){
      console.log("error "+err);
      res.json({res:"error"});
    }else{
      res.json({res:"success", data: userData});
    }
  })
})

router.post("/getAllNotification", function(req, res, next){
  var data = req.body;
  var query = { 'finderUserID': data.userId };
  NotificationSchema.find(query, function (err, userData) {
    if(err){
      console.log("error "+err);
      res.json({res:"error"});
    }else{
      res.json({
        res:"success",
        data:userData
      });
    }
  })
})

router.post("/currentRequest", function(req, res, next){
  var data = req.body;
  var query = { '_id': data.requestId };
  findRoommateSchema.find(query, function (err, userData) {
    if(err){
      console.log("error "+err);
      res.json({res:"error"});
    }else{
      res.json({
        res:"success",
        data:userData
      });
    }
  })
})

router.post("/registerHotel", function(req, res, next){
  // res.send("signup url hit");
  var reqData = req.body;
  console.log(JSON.stringify(reqData));
  var registerHotelData = new registerHotelSchema(reqData);
  registerHotelData.save(function(error){
    if(error){
      console.log("error "+error);
      res.json({res:"error"});
    }else{
      res.json({res:"success"});
    }
  })
})

router.post("/intreatedRoomates", function(req, res, next){
  var data = req.body;
  var query = { 'hotelId': data.hotelId };
  findRoommateSchema.find(query, function (err, userData) {
    if(err){
      console.log("error "+err);
      res.json({res:"error"});
    }else{
      res.json({
        res:"success",
        data:userData
      });
    }
  })
})

router.post("/findRoommate", function(req, res, next){
  // res.send("signup url hit");
  var reqData = req.body;
  console.log(JSON.stringify(reqData));
  var findRoommateData = new findRoommateSchema(reqData);
  findRoommateData.save(function(error){
    if(error){
      console.log("error "+error);
      res.json({res:"error"});
    }else{
      res.json({res:"success"});
    }
  })
})

router.post("/updateIntreastedUser", function(req, res, next){
  var data = req.body;
  var query = { _id: data._id };
  findRoommateSchema.find(query, function (err, userData) {
    if (err) return handleError(err);
      var userList = userData[0].intreastedUsers.split(",")
      var index = userList.indexOf("");
      if(index >= 0){
        userList.splice(index,1)
      }
      userList.push(data.intreastedUserId);
      userList.join();
      console.log(userList[0]);
      var updateData = {'intreastedUsers': userList[0]}
    findRoommateSchema.update(query, updateData, function (err, userData) {
      if(err){
        console.log("error "+err);
        res.json({res:"error"});
      }else{
        res.json({res:"success", data: userData});
      }
    })
  })
})

router.post("/hotelList", function(req, res, next){
  var data = req.body;
  var limit = data['limit'];
  var count = data['count'];
  var skip = limit * count;
  for(let a in data){
    if(!data[a]){
        delete data[a]
    }
  }
  var query = {};
  if(data.userId){
    var query = { 'userId': { $nin: data.userId } };
  }
  if(data.state){
    query['state'] = data.state;
  }
  if(data.city){
    query['city'] = data.city;
  }
  if(data.area){
    query['area'] = data.area;
  }
  if(data['minRoomCharge']){
    query['minRoomCharge'] = { $lte: data.minRoomCharge };
  }
  registerHotelSchema.find(query,null,{limit:limit,skip:skip}, function (err, hotelList) {
    if(err){
      console.log("error "+err);
      res.json({res:"error"});
    }else{
        if(data.state){
          var stateQuery = { 'state':  data.state, 'userId': { $nin: data.userId } };
          registerHotelSchema.find(stateQuery, function (err, stateHotelList) {
            if(err){
              console.log("error "+err);
              res.json({res:"error"});
            }else{
              if(data.city){
                var cityQuery = { 'state':  data.state, 'city': data.city, 'userId': { $nin: data.userId } };
                registerHotelSchema.find(cityQuery, function (err, cityHotelList) {
                  if(err){
                    console.log("error "+err);
                    res.json({res:"error"});
                  }else{
                    var allCityList = stateHotelList.map(function(data,index){
                      return data.city
                  })
                  var cityList = [];
                  allCityList.map(function(city, index){
                    if(cityList.indexOf(city) === -1){
                        cityList.push(city)
                    }
                  })
                    var allAreaList = cityHotelList.map(function(data,index){
                      return data.area
                  })
                  var areaList = [];
                  allAreaList.map(function(area, index){
                    if(areaList.indexOf(area) === -1){
                      areaList.push(area)
                    }
                  })
                    res.json({
                      res:"success",
                      data:{
                        'hotelList': hotelList,
                        'cityList': cityList,
                        'areaList': areaList
                      }
                    });
                  }
                })
              }else{
                var allCityList = stateHotelList.map(function(data,index){
                  return data.city
                })
                var cityList = [];
                allCityList.map(function(city, index){
                  if(cityList.indexOf(city) === -1){
                      cityList.push(city)
                  }
                })
                res.json({
                  res:"success",
                  data:{
                    'hotelList': hotelList,
                    'cityList': cityList,
                    'areaList': []
                  }
                });
              }
            }
          })
        }else{
          res.json({
            res:"success",
            data:{
              'hotelList': hotelList,
              'cityList': [],
              'areaList': []
            }
          });
        }
    }
    // if (err) return handleError(err);
    // if(data.state){
    //   var stateQuery = { 'state':  data.state };
    //   registerHotelSchema.find(stateQuery, function (err, stateHotelList) {
    //     if (err) return handleError(err);
    //     res.send(hotelList);
    //   })
    // }
    // res.send(hotelList);
  })
})

router.post("/hotelDetails", function(req, res, next){
  var data = req.body;
  var query = { 'userId': data.userId, '_id': data.hotelId };
  registerHotelSchema.find(query, function (err, hotelData) {
    if (err) return handleError(err);
    res.send(hotelData);
  })
})

router.post("/myHotels", function(req, res, next){
  var data = req.body;
  var limit = data['limit'];
  var count = data['count'];
  var skip = limit * count;
  for(let a in data){
    if(!data[a]){
        delete data[a]
    }
  }
  var query = { 'userId': data.userId };
  registerHotelSchema.find(query,null,{limit:limit,skip:skip}, function (err, hotelList) {
    if (err) return handleError(err);
    res.send(hotelList);
  })
})

router.post("/logout", function(req, res, next){
  var data = req.body;
  var query = { _id: data._id };
  console.log(query);
  signUpSchema.find(query, function (err, userData) {
    if (err) return handleError(err);
    res.send(userData);
  })
})

router.post("/profile", function(req, res, next){
  var data = req.body;
  var query = { _id: data.userId };
  signUpSchema.find(query, function (err, userData) {
    if(err){
      console.log("error "+err);
      res.json({res:"error"});
    }else{
      res.json({
        res:"success",
        data:userData
      });
    }
  })
})

router.post("/updateProfile", function(req, res, next){
  var data = req.body;
  var query = { _id: data.userId };
  console.log(query);
  signUpSchema.update(query, data, function (err, userData) {
    if(err){
      console.log("error "+error);
      res.json({res:"error"});
    }else{
      res.json({res:"success"});
    }
  })
})

router.post("/updateHotel", function(req, res, next){
  var data = req.body;
  var query = { _id: data.hotelId, userId: data.userId };
  // var updatedData = { 'house': '999999999' }
  console.log(query);
  registerHotelSchema.update(query, data, function (err, userData) {
    // if (err) return handleError(err);
    // res.send(userData);
    if(err){
      console.log("error "+error);
      res.json({res:"error"});
    }else{
      res.json({res:"success"});
    }
  })
})

router.post("/login", function(req, res, next){
  var query = { email: req.body.email };
  signUpSchema.find(query, function (err, signUpData) {
    if (err) return handleError(err);
    if(signUpData.length === 0){
      var response = commonUtils.invalidUsarResponse();
      res.json(response);
    }else{
      if(signUpData[0].password === req.body.password){
        var response = commonUtils.successResponse();
        response.data = signUpData;
        res.json(response);
      }else{
        var response = commonUtils.invalidUsarResponse();
        res.json(response);
      }
    }
  })
})

router.post("/allRequest", function(req, res, next){
  var data = req.body;
  var query = { 'finderUserID': data.userId };
  findRoommateSchema.find(query, function (err, userData) {
    if(err){
      console.log("error "+err);
      res.json({res:"error"});
    }else{
      res.json({
        res:"success",
        data:userData
      });
    }
  })
})

router.post("/deleteHotel", function(req, res, next){
  var data = req.body;
  var query = { '_id': data.hotelId };
  registerHotelSchema.findByIdAndRemove(data.hotelId, function (err, deleteData) {
    if(err){
      console.log("error "+err);
      res.json({res:"error"});
    }else{
      res.json({
        res:"success",
        data:deleteData
      });
    }
  })
})

router.post("/validateUser", function(req, res, next){
  var data = req.body;
  var query = { '_id': data.userId };
  signUpSchema.find(query, function (err, userData) {
    if(err){
      console.log("error "+err);
      res.json({res:"error"});
    }else{
      res.json({
        res:"success",
        data:userData
      });
    }
  })
})

router.post("/registerHotelSchema", function(req, res, next){
  var data = req.body;
  var query = { '_id': data.hotelId, 'userId': data.userId };
  registerHotelSchema.find(query, function (err, userData) {
    if(err){
      console.log("error "+err);
      res.json({res:"error"});
    }else{
      res.json({
        res:"success",
        data:userData
      });
    }
  })
})

module.exports = router;
