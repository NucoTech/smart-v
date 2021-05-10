const { sendMessages } = require("./lark")
const { Blogs } = require("../smartVrc")
const { codeTopSpider } = require("./spider")

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
    getRandomAl
}
