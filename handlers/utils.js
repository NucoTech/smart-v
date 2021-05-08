const fetch = require("node-fetch")
const nodejieba = require("nodejieba")

const fetchRequest = async (url, method, params, body, headers) => {
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

        if (!!params) {
            url += params
        }

        const res = await fetch(url, opts)
        return [res, null]
    } catch (e) {
        const err = new Error(`网络请求错误: ${method} ${url}`)
        // 在此记录错误
        return [null, err]
    }
}

const fenci = (text) => {
    return nodejieba.cut(text)
}

module.exports = {
    fetchRequest,
    fenci
}
