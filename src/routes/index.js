
const siteRouter = require('./site')
const rapperRouter = require('./rapper')
const meRouter = require('./me')

const router = (app) => {
    app.use('/', siteRouter)
    app.use('/rapper', rapperRouter)
    app.use('/me', meRouter)
}

module.exports = router