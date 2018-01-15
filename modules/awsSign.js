var aws = require('aws-sdk')
const awsConfig = require('./awsConfig').aws

aws.config.update({
  accessKeyId: awsConfig.awsAccessKey
  secretAccessKey: awsConfig.awsSecretKey
})

exports = module.exports = {
  sign: function(filename, filetype) {
    let s3 = new aws.S3()
    let params = {
        Bucket: awsConfig.awsBucket,
        Key: filename,
        Expires: 60,
        ContentType: filetype
    }
    s3.getSignedUrl(‘putObject’, params, function(err, data) {
      if (err) return err
      else return data
    })
  }
}
