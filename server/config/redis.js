const redis = require('redis')

// const redisConf= {
//     host: 'localhost',
//     port: '7000',
//     pass: ''
// }
// const client = redis.createClient(redisConf)

const client = redis.createClient(process.env.REDIS_URL)

client.on('error', function (error) {
    console.log('Error ', error);
})

client.on('connect', function (error) {
    console.log('redis connected');
})

module.exports = client


// const { redis } = require('ioredis')

// const redisClient = () => {
//     try {
//         if (process.env.REDIS_URL) {
//             console.log('Redis Connected')
//             return process.env.REDIS_URL
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// export const redis = new redis(redisClient)