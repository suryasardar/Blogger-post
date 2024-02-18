const express = require('express');
const router = express.Router();
const signup = require("../controllers/usercontrol");
const login = require('../controllers/userlogin');
const getblog = require('../controllers/usergetblog');
const postblog = require('../controllers/userpostblog');

router.post("/signup", signup);
router.post("/login", login);
router.get("/getblog", getblog);
router.post("/postblog", postblog);

module.exports = router;
