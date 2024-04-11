const express = require('express');
const router = express.Router();
const signup = require("../controllers/usersignup");
const login = require('../controllers/userlogin');
const getblog = require('../controllers/usergetblog');
const postblog = require('../controllers/userpostblog');
const getID = require('../controllers/usergetidblog');
const GoogleAuth = require('../controllers/userGoogle')
const AWSserver = require('../controllers/ useraws');

router.post("/signup", signup);
router.post("/signin", login);
router.get("/getblog", getblog);
router.post("/postblog", postblog);
router.get('/getblog/:uid', getID);
router.post("/google-auth", GoogleAuth);
router.get('/get-upload-url', AWSserver);

module.exports = router;
