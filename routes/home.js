const express = require('express')
const router = express.Router()

const db = require('../models')
const User = db.User
const Todo = db.Todo

router.get('/', (req, res) => {
  res.send('List all todo')
})

module.exports = router