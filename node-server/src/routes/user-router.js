const router = require('express').Router()

router.get('/', (_req, res) => {
  const x = 'world'
  return res.json({ hello: x })
})

module.exports = router
