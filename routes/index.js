const express = require('express')
const klikBCA = require('../services/klikBCA')
const router = express.Router()
const username = process.env.BCA_USERNAME
const password = process.env.BCA_PASSWORD

router.get('/', async (req, res, next) => {
  return res.json('ok')
})

router.get('/balance', async (req, res, next) => {
  try {
    const balance = await klikBCA.balance(username, password)
    return res.json(balance)
  } catch (error) {
    return res.json(error)
  }
})

router.get('/settlement', async (req, res, next) => {
  try {
    const settlement = await klikBCA.settlement(username, password, req.query.date_start, req.query.date_finish)
    return res.json(settlement)
  } catch (error) {
    return res.json(error)
  }
})
module.exports = router
