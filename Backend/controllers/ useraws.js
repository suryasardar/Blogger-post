const aws = require("aws-sdk");
const express = require("express");
// const uuid = require("uuid");
require("dotenv").config();

const s3 = new aws.S3({
  region: "ap-southeast-2",
  // credentials: new aws.Credentials({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
  // })
});

const generateURL = async () => {
  const date = new Date();
  const imagename = `${date.getTime()}.jpg`;

  try {
    // const params = {
    //   Bucket:"blog-website-op",
    //   Key:imagename,
    //   Expires:1000,
    //   ContentType:"image/jpg",
    // };
    // console.log("Generating signed URL with params:", params);
      const url = await s3.getSignedUrlPromise("putObject", {
          Bucket: "blog-website-op",
          Key: imagename,
          Expires: 1000,
          ContentType: "image/jpg",
      } );
    // console.log("Generated signed URL:", url);
    return url;
  } catch (error) {
    console.error("Error generating URL:", error);
    throw error; // Propagate error to caller
  }
};

const AWS =
  ("/get-upload-url",
  (req, res) => {
    generateURL()
      .then((url) => res.status(200).json({ uploadurl: url }))
      .catch((err) => {
        console.log(err, "errrr");
        return res.status(500).json({ error: err.message });
      });
  });

module.exports = AWS;
