// 用于飞书Lark的响应函数
const { Lark } = require("../smartVrc")
const { VerificationToken } = Lark

/**
 * 验证lark消息来源
 * @param {*} token
 */
const verifyLarkToken = (token) => {
    return VerificationToken === token
}

module.exports = {
    verifyLarkToken,
}
