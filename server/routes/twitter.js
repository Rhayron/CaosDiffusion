var express = require('express');
var router = express.Router();
var cors = require("cors");
var keys = require("../../keys");

APIKey = keys.APIKey
APIKeySecret = keys.APIKeySecret
accessToken = keys.accessToken
accessTokenSecret = keys.accessTokenSecret

router.use(cors());
router.post('/', function(req, res) {
  const { TwitterApi } = require('twitter-api-v2');

  const client = new TwitterApi({
    appKey: APIKey,
    appSecret: APIKeySecret,
    accessToken: accessToken,
    accessSecret: accessTokenSecret,
  });

  const rwClient = client.readWrite;

  async function postTweet(imagem) {
    try {
      const mediaId = await rwClient.v1.uploadMedia(imagem);
      const tweet = await rwClient.v2.tweet({
        text: '',
        media: {media_ids: [mediaId]}
      });
      console.log(`Tweet postado com o ID ${tweet.data.id}`);
    } catch (error) {
      console.error(`Erro ao postar o tweet: ${error}`);
    }
  }

  postTweet(req.body.imagem);
});

module.exports = router;
