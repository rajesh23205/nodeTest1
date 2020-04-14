var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next){
    res.send("blank");
    // mongoUtil.createCollection("signup");
})

router.get("/test", function(req, res, next){
    res.send("test");
    // mongoUtil.createCollection("signup");
})