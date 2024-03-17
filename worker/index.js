const keys = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const sub = redisClient.duplicate();

function fib(index) {
  let first = 1;
  let second = 1;

  if (index <= 1) {
    return 1;
  }

  let currentIndex = 1;

  while (currentIndex < index) {
    let temp = first + second;
    first = second;
    second = temp;
    currentIndex += 1;
  }

  return second;
}

sub.on("message", (channel, message) => {
  redisClient.hset("values", message, fib(parseInt(message)));
});
sub.subscribe("insert");
