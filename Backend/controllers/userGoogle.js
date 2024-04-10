var admin = require("firebase-admin");
var serviceAccountKey = require("../blogger-post-eac84-firebase-adminsdk-netbc-fee6d1fd00.json");
const { auth } = require("firebase-admin");
const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

const formatDatatosend = (user) => {
  const token = jwt.sign({ Id: User._id }, "your-secret-key");
  return {
    token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname,
  };
};

const generateusername = async (email) => {
  try {
    let username = email.split("@")[0];

    let userunique = await User.exists({
      "personal_info,username": username,
    }).then((result) => result);
    userunique ? (username += uid().substring(0, 5)) : "";
    return username;
  } catch (error) {
    console.error("error generating username", error);
  }
};

  
const GoogleAuth = async (req, res) => {
    try {
        const { accessToken } = req.body;
      // console.log(accessToken, "oktoken");
      const decodeUser = await auth().verifyIdToken(accessToken);

      const { email, name, picture } = decodeUser;
      const pictureUrl = picture.replace("s96-c", "s384-c");
      
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
          }
      //  console.log(personal_info.email,"Email");
      let user = await User.findOne({ "personal_info.email": email }).select("personal_info.fullname personal_info.username personal_info.profile_img google_auth").then((u) => {
        return u || null
      })
        .catch((err) => {
        return res.status(500).json({"error":err.message})
      })
        // console.log(user,"user");
      if (user) {
        if (!user.google_auth) {
           return res.status(403).json({"error":"this email was signed up without google.Please log in eith password to access the account"})
          }  
        } else {
          
          // If user does not exist, create a new user
          const username = await generateusername(email);
          user = new User({
            personal_info: { fullname: name,email,  profile_img: pictureUrl, username },
            google_auth: true,
          });
          await user.save();
        }
          return res.status(200).json(formatDatatosend(user));
    } catch (error) {
      console.error("Failed to authenticate you with Google", error);
      return res.status(500).json({ error: "Failed to authenticate you with Google. Please try with another Google account." });
    }
  };
  
  module.exports = GoogleAuth;
  

  