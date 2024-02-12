const e = require('express')
const router = e.Router()
const path = require('path')

router.use('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router