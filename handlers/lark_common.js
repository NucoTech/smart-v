const { Blogs } = require("../smartVrc")
const { codeTopSpider } = require("./spider")
const { tenant_access_token_api, send_messages_api } = require("../apis/lark")
const { fetchRequest } = require("./utils")
const { Lark } = require("../smartVrc")
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

const getLarkHelp = (open_id) => {
    const content = JSON.stringify({
        zh_cn: {
            title: "帮助",
            content: [
                [
                    {
                        tag: "text",
                        text: `获取算法题口令: 随机算法\n`
                    },
                    {
                        tag: "text",
                        text: "获取博客地址: 博客\n"
                    }
                ]
            ]
        }
    })
    sendMessages("", open_id, content, "post")
    return
}

const getBlogs = (open_id) => {
    if (!Blogs || Blogs.length === 0) {
        const content = JSON.stringify({
            text: "🚧 暂无可展示的博客嗷~"
        })
        sendMessages("", open_id, content, "text")
        return
    }

    const res = Blogs.map((item) => {
        return [
            {
                tag: "text",
                text: `${item[0].split("|")[0].trim()}: \n`
            },
            {
                tag: "a",
                text: `🍖 ${item[1]}`,
                href: item[1]
            }
        ]
    })

    sendMessages(
        "",
        open_id,
        JSON.stringify({
            zh_cn: {
                title: "博客 Blogs",
                content: res
            }
        }),
        "post"
    )
    return
}

const getRandomAl = async (open_id) => {
    const [
        question_id,
        title,
        value,
        time,
        hard,
        url
    ] = await codeTopSpider("", parseInt(Math.random() * 28))
    const content = {
        zh_cn: {
            title: "随机算法题",
            content: [
                [
                    {
                        tag: "text",
                        text: `❓ Leetcode - ${question_id} - ${title}\n`
                    },
                    {
                        tag: "text",
                        text: `🙉 最近考察时间: ${time}\n`
                    },
                    {
                        tag: "text",
                        text: `👀 考察频率: ${value}\n`
                    },
                    {
                        tag: "text",
                        text: `💪 题目难度: ${hard}\n`
                    },
                    {
                        tag: "a",
                        text: `🚀 ${title}`,
                        href: url
                    }
                ]
            ]
        }
    }
    sendMessages("", open_id, JSON.stringify(content), "post")
    return
}

module.exports = {
    getLarkHelp,
    getBlogs,
    getRandomAl,
    verifyLarkToken
}
