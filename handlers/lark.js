// 用于飞书Lark的响应函数
const { tenant_access_token_api, send_messages_api } = require("../apis/lark")
const { Lark } = require("../smartVrc")
const { fetchRequest } = require("./utils")
const { codeTopSpider } = require("../handlers/spider")

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
    const [res, err] = await fetchRequest(
        tenant_access_token_api,
        "POST",
        "",
        body
    )
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
}

const sendMessages = async (idType, id, content, msgType) => {
    const token = await getTenantAccessToken()
    if (!token) {
        return
    }
    const headers = {
        Authorization: `Bearer ${token}`
    }

    const body = {
        receive_id: id,
        content,
        msg_type: !!msgType ? msgType : "text"
    }

    const [res, err] = await fetchRequest(
        send_messages_api,
        "POST",
        `?receive_id_type=${!!idType ? idType : "open_id"}`,
        body,
        headers
    )

    const { code, msg } = await res.json()

    if (code !== 0) {
        // 处理错误
    }
}

/**
 * 处理用户私聊消息
 */
const handleChatPrivate = (event) => {
    const { open_id, msg_type, text } = event
    if (msg_type === "text" && text === "随机算法") {
        const [question_id, title, hard, url] = codeTopSpider(
            "",
            parseInt(Math.random() * 28)
        )
        const content = {
            zh_cn: {
                title: "随机算法题",
                content: [
                    [
                        {
                            tag: "text",
                            text: `Leetcode - ${question_id} -${title}`
                        },
                        {
                            tag: "text",
                            text: `题目难度: ${hard}`
                        },
                        {
                            tag: "a",
                            text: "题目地址",
                            href: url
                        }
                    ]
                ]
            }
        }
        sendMessages("", open_id, JSON.stringify(content), "post")
    } else {
        sendMessages(
            "",
            open_id,
            JSON.stringify({
                text: "你可以给我发 help 获取使用方法"
            }),
            "text"
        )
    }
}

module.exports = {
    verifyLarkToken,
    getTenantAccessToken,
    handleChatPrivate,
    sendMessages
}
