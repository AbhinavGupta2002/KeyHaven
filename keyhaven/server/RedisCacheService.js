const {responses} = require('./functionLibrary.js')
const redis = require('redis')

class RedisCacheService {
    #client
    #timeToExpire
    
    constructor() {
        this.#timeToExpire = 60 * 30
        this.#client = redis.createClient({
            password: 'NkrmL67KkrSHUCeCMjWbimvGYS8kxGaX',
            socket: {
                host: 'redis-14910.c10.us-east-1-3.ec2.cloud.redislabs.com',
                port: 14910
            }
        })
    }

    connect() {
        this.#client.connect()
    }

    async updateCache(key, value, isEditJSON = false, JSONfields = {}) {
        const isKeyValid = await this.#client.exists(key)
        if (isKeyValid) {
            if (isEditJSON) {
                value = JSON.parse(await this.#client.get(key))
                Object.keys(JSONfields).forEach(field => value[field] = JSON.stringify(JSONfields[field]))
            }
            await this.#client.setEx(key, this.#timeToExpire, JSON.stringify(value))
        }
    }

    async fetchCache(key, DBclient, DBquery, firstRowOnly = false, rowPropName = null) {
        const value = await this.#client.get(key)
        let response
        if (value) {
            response = responses('success-value', JSON.parse(value))
        } else {
            const results = await DBclient.query(DBquery);
            if (!results.rowCount) {
                response = responses('account not found', 404)
            } else {
                let cacheValue
                if (firstRowOnly) {
                    if (rowPropName) {
                        cacheValue = results.rows[0][rowPropName]
                    } else {
                        cacheValue = results.rows[0]
                    }
                } else {
                    cacheValue = results.rows
                }
                response = responses('success-value', cacheValue)
                await this.#client.setEx(key, this.#timeToExpire, JSON.stringify(cacheValue))
            }
        }
        return response
    }

    async deleteCache(email) {
        Promise.all([this.#client.del(`account@${email}`), this.#client.del(`isVerified@${email}`)]).then(_ => {
            return;
        })
    }

    async deleteAllCache() {
        await this.#client.flushAll();
    }
}

module.exports = { RedisCacheService };