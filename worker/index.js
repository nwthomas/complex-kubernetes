const keys = require("./keys.js");
const redis = require("redis");

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  redis_strategy: () => 1000,
});
const sub = redisClient.duplicate();

function fib(index) {
  if (index < 2) {
    return 1;
  }

  return fib(index - 1) + index(index - 2);
}

sub.on("message", (_, message) => {
  redisClient.hset("values", message, fib(parseInt(message, 10)));
});

sub.subscribe("insert");
