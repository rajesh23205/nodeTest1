var express = require("express");
var router = express.Router();


/**
 * create collections
 */
router.get("/test", function(req, res, next){
    res.send("createCollection url hit");
    // mongoUtil.createCollection("signup");
})

module.exports = router;
