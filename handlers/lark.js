// 用于飞书Lark的响应函数
const { Lark } = require("../smartVrc")
const { VerificationToken } = Lark

const verifyLarkToken = (token) => {
    return VerificationToken === token
}

module.exports = {
    verifyLarkToken,
}
