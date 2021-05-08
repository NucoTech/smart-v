// 用于飞书Lark的响应函数
const { tenant_access_token_api } = require("../apis/lark")
const { Lark } = require("../smartVrc")
const { fetchRequest } = require("./utils")

const { VerificationToken, AppID, AppSecret } = Lark

/**
 * 验证lark消息来源
 * @param {*} token
 */
const verifyLarkToken = (token) => {
    return VerificationToken === token
}

/**
 * 获取 tenant_access_token
 */
const getTenantAccessToken = async () => {
    const body = {
        app_id: AppID,
        app_secret: AppSecret
    }
    const [res, err] = await fetchRequest(tenant_access_token_api, "POST", body)
    if (res !== null) {
        const { code, tenant_access_token: token } = await res.json()
        if (code === 0) {
            // 正常获取token
            return token
        } else {
            // 错误
            return ""
        }
    }

    if (err !== null) {
        // 记录错误
    }
}

module.exports = {
    verifyLarkToken,
    getTenantAccessToken
}
