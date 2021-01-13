const redis = require('redis')
const bluebird = require('bluebird')
const { REDIS_URL } = process.env;

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const redisClient = redis.createClient(REDIS_URL);

redisClient.on('error', err => {
  // console.log('Error ' + err);
  redisClient.quit();
});

redisClient.on('connect', err => {
  console.log('Connect to Redis ' + REDIS_URL);
});

module.exports = redisClient;