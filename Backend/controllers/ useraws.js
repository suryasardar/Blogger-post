const aws = require('aws-sdk');
const uid = require("uuid");


const s3 = new aws.S3({
    region: 'ap-southeast-2',
    accessKeyId:process.env.accessKeyId,
    secretAccessKey:process.env.secretAccessKey,

})

const generateURL = async () => {
    const date = new Date();
    const imagename = `${uid()}-${date.getTime()}.jpg`;
c 
   return await s3.getSignedUrlPromise('putObject', {
        Bucket: 'blog-website-op',
        Key: imagename,
        Expires: 1000,
        ContentType:"image/jpg"
    })
}

const AWS = ('/get-upload-url', (req, res) => {
    generateURL().then(url => {
        res.status(200).json({ uploadurl: url });
    }).catch(err => {
        return res.status(500).json({ error: err.message });
    })
})

module.exports = AWS;