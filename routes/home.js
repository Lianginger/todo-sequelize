const express = require('express')
const router = express.Router()

const db = require('../models')
const User = db.User
const Todo = db.Todo

router.get('/', (req, res) => {
  Todo.findAll({
    where: { UserId: req.user.id }
  })
    .then(todos => {
      res.render('home', { todos })
    })
    .catch(error => {
      res.status(422).jason(error)
    })
})

module.exports = router