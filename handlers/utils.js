const fetch = require("node-fetch")

const fetchRequest = async (url, method, body, headers) => {
    try {
        const opts = {
            method
        }
        if (!!body) {
            opts.body = JSON.stringify(body)
        }

        if (!!headers) {
            opts.headers = headers
        }
        const res = await fetch(url, opts)
        return [res, null]
    } catch (e) {
        const err = new Error(`网络请求错误: ${method} ${url}`)
        return [null, err]
    }
}

module.exports = {
    fetchRequest
}
