const express = require('express');
const router = express.Router();
const signup = require("../controllers/usersignup");
const login = require('../controllers/userlogin');
const getblog = require('../controllers/usergetblog');
const postblog = require('../controllers/userpostblog');
const getID = require('../controllers/usergetidblog');

router.post("/signup", signup);
router.post("/login", login);
router.get("/getblog", getblog);
router.post("/postblog", postblog);
router.get('/getblog/:uid', getID);

module.exports = router;
