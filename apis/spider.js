const codetop_api = (page) =>
    `https://codetop.cc/api/questions/?page=${
        !!page ? page : 1
    }&search=&ordering=-frequency`

module.exports = {
    codetop_api
}
