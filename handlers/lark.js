// 用于飞书Lark的响应函数
const { getLarkHelp, getBlogs, getRandomAl, sendMessages } = require("./lark_common")

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
                return
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
    return
}

module.exports = {
    handleChatPrivate,
    handleChatGroup
}
