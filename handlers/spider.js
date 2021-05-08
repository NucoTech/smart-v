const { codetop_api } = require("../apis/spider")
const { fetchRequest } = require("./utils")

const codeTopSpider = async (mode, page) => {
    const [res, err] = await fetchRequest(codetop_api(page), "GET")
    const { list } = await res.json()
    mode = !!mode ? mode : "random"
    if (mode === "random") {
        const { value, time, leetcode } = list[
            parseInt(Math.random() * list.length)
        ]
        const { question_id, title, level, slug_title } = leetcode
        let hard = "简单"
        switch (level) {
            case 1:
                hard = "简单"
                break
            case 2:
                hard = "中等"
                break
            case 3:
                hard = "困难"
                break
        }
        return [
            question_id,
            title,
            value,
            time,
            hard,
            `https://leetcode-cn.com/problems/${slug_title}`
        ]
    }
}

module.exports = {
    codeTopSpider
}
