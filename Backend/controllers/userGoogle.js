var admin = require("firebase-admin");
// import serviceAccountKey from "./blogger-post-eac84-firebase-adminsdk-netbc-fee6d1fd00.json";
var serviceAccountKey = require("../blogger-post-eac84-firebase-adminsdk-netbc-fee6d1fd00.json");

// var getAuth = require ("firebase-admin/auth");
const { auth } = require("firebase-admin");
 
const User = require("../models/usermodel");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

const formatDatatosend = (user) => {
  const token = jwt.sign({ Id: User._id }, "your-secret-key");
  return {
    token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    Fullname: user.personal_info.Fullname,
  };
};

const generateusername = async (Email) => {
  try {
    let username = Email.split("@")[0];

    let userunique = await User.exists({
      "personal_info,username": username,
    }).then((result) => result);
    userunique ? (username += uid().substring(0, 5)) : "";
    return username;
  } catch (error) {
    console.error("error generating username", error);
  }
};

// const GoogleAuth =
//   ("/google-auth",
//   async (req, res) => {
//     let { access_token } = req.body;
//     getAuth()
//       .verifyIdToken(access_token)
//       .then(async (decodeUser) => {
//         let { email, name, picture } = decodeUser;
//         picture = picture.replace("s96-c", "s384-c");
//         let user = await User.findOne({ "personal_info.Email": email })
//           .select(
//             "personal_info.Fullname personal_info.username personal_info.profile_img google_auth"
//           )
//           .them((u) => {
//             return u || null;
//           })
//           .catch((err) => {
//             return res.status(500).json({ error: err.message });
//           });

//         if (user) {
//           if (!user.google_auth) {
//             return res
//               .status(403)
//               .json({
//                 error:
//                   "This email was signed up without google.please login with password to access the account",
//               });
//           }
//         } else {
//           let username = await generateusername(email);
//           user = new User({
//             personal_info: { Fullname: name, profile_img: picture, username },
//             google_auth: true,
//           });
//           await user
//             .save()
//             .then((u) => {
//               user = u;
//             })
//             .catch((err) => {
//               return res.status(500).json({ error: err.message });
//             });
//         }
//         return res.status(200).json(formatDatatosend(user));
//       })
//       .catch((err) => {
//         return res
//           .status(500)
//           .json({
//             error:
//               "Failed to autenticate you with google.try with some other google account",
//           });
//       });
//         });
  
const GoogleAuth = async (req, res) => {
    try {
        const { accessToken } = req.body;
        // const accessToken = currentUser.accessToken;

        console.log(accessToken,"oktoken");
      const decodeUser = await auth().verifyIdToken(accessToken);
        const { email, name, picture } = decodeUser;
        console.log(email,picture,"okemail");
        const pictureUrl = picture.replace("s96-c", "s384-c");
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
          }
  
      let user = await User.findOne({ "personal_info.Email": email }).select("personal_info.Fullname personal_info.username personal_info.profile_img google_auth");
  
      if (!user) {
        // If user does not exist, create a new user
        const username = await generateusername(email);
        user = new User({
          personal_info: { Fullname: name, profile_img: pictureUrl, username },
          google_auth: true,
        });
        await user.save();
      } else if (!user.google_auth) {
        return res.status(403).json({
          error: "This email was signed up without Google. Please login with password to access the account",
        });
      }
  
      return res.status(200).json(formatDatatosend(user));
    } catch (error) {
      console.error("Failed to authenticate you with Google", error);
      return res.status(500).json({ error: "Failed to authenticate you with Google. Please try with another Google account." });
    }
  };
  
  module.exports = GoogleAuth;
  

  