// 用于飞书Lark的响应函数
const { tenant_access_token_api, send_messages_api } = require("../apis/lark")
const { Lark } = require("../smartVrc")
const { fetchRequest } = require("./utils")
const { getLarkHelp, getBlogs, getRandomAl } = require("./lark_common")

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
const handleChatPrivate = async (event) => {
    const { open_id, msg_type, text } = event
    if (msg_type === "text") {
        switch (text) {
            case "随机算法": {
                getRandomAl(open_id)
                return
            }
            case "帮助":
            case "help": {
                getLarkHelp(open_id)
                return
            }
            case "博客":
            case "blog": {
                getBlogs(open_id)
                return
            }

            case "文档":
            case "docs": {
                sendMessages(
                    "",
                    open_id,
                    JSON.stringify({
                        text: "🚧 文档施工中~"
                    }),
                    "text"
                )
                return
            }
        }
    }

    sendMessages(
        "",
        open_id,
        JSON.stringify({
            text: "你可以给我发 帮助 或者 help 获取使用方法"
        }),
        "text"
    )
    return
}

/**
 * 处理群消息
 * @param {*} event
 */
const handleChatGroup = (event) => {
    const {
        is_mention,
        employee_id,
        open_id,
        type,
        text_without_at_bot
    } = event
    if (is_mention) {
        // 只处理at的情况
        if (type === "message") {
            if (!text_without_at_bot) {
                sendMessages(
                    "",
                    open_id,
                    JSON.stringify({
                        text: "请告诉我你需要什么吧~"
                    }),
                    "text"
                )
            } else {
                switch (text_without_at_bot) {
                    case "博客":
                    case "blogs": {
                        getBlogs(open_id)
                        return
                    }
                    case "帮助":
                    case "help": {
                        getLarkHelp(open_id)
                        return
                    }
                }
            }
        }
    }
}

module.exports = {
    verifyLarkToken,
    getTenantAccessToken,
    handleChatPrivate,
    sendMessages
}
