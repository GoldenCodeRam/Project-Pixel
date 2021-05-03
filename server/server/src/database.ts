import { promisify } from 'util'
import redis from 'redis'

import { StoredPixel } from './interfaces/StoredPixel'
import { databaseLogger as logger } from './utils/logger'

const redisDatabase: redis.RedisClient = redis.createClient({
  port: 6379,
  host: 'redis'
})

const keysAsync = promisify(redisDatabase.keys).bind(redisDatabase)
const getAsync = promisify(redisDatabase.get).bind(redisDatabase)
const setAsync = promisify(redisDatabase.set).bind(redisDatabase)

async function getStoredPixels (): Promise<Array<StoredPixel>> {
  logger.info('Getting stored pixels from Redis server')
  const storedPixels: Array<StoredPixel> = []

  if (redisDatabase.connected) {
    const reply = await keysAsync('*').catch((error) => {
      logger.error('Something went wrong getting the signatures from this Redis server')
      console.log(error)
    })

    if (reply) {
      for (const key of reply) {
        const signature = await getSignatureFromKey(key)
        if (signature) storedPixels.push(signature)
      }
    }
  }
  return storedPixels
}

async function addPixelToRegistry (newPixel: StoredPixel) {
  if (redisDatabase.connected) {
    await setAsync(
      newPixel.signature,
      `${newPixel.pixelX},${newPixel.pixelY},${newPixel.r},${newPixel.g},${newPixel.b},${newPixel.a}`
    )
  }
}

async function getSignatureFromKey (key: string): Promise<StoredPixel | undefined> {
  const reply = await getAsync(key).catch((error) => {
    logger.error('Something went wrong getting a signature from this Redis server')
    console.log(error)
  })

  if (reply) {
    const storedPixel = reply.split(',')
    return {
      signature: key,
      pixelX: parseInt(storedPixel[0]),
      pixelY: parseInt(storedPixel[1]),
      r: parseInt(storedPixel[2]),
      g: parseInt(storedPixel[3]),
      b: parseInt(storedPixel[4]),
      a: parseInt(storedPixel[5])
    }
  }
}

export {
  getStoredPixels,
  getSignatureFromKey,
  addPixelToRegistry
}
