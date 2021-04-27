import redis from 'redis'

export default class Database {
  private _redisDatabase: redis.RedisClient

  constructor () {
    this._redisDatabase = redis.createClient({
      port: 6379,
      host: '127.0.0.1'
    })
  }
}
