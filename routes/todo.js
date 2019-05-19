const express = require('express')
const router = express.Router()

const db = require('../models')
const User = db.User
const Todo = db.Todo

// 設定 /todos 路由
// 列出全部 Todo
router.get('/', (req, res) => {
  res.send('列出全部 Todo')
})

// 新增一筆 Todo 頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 新增一筆  Todo
router.post('/', (req, res) => {
  Todo.create({
    name: req.body.name,
    done: false,
    UserId: req.user.id
  })
    .then(
      res.redirect('/')
    )
    .catch(err => {
      res.status(422).json(err)
    })
})

// 顯示一筆 Todo 的詳細內容
router.get('/:id', (req, res) => {
  Todo.findOne({
    where: {
      userId: req.user.id,
      id: req.params.id
    }
  })
    .then(todo => {
      res.render('detail', { todo })
    })
    .catch(error => {
      res.status(422).json(error)
    })
})

// 修改 Todo 頁面
router.get('/:id/edit', (req, res) => {
  Todo.findOne({
    where: {
      userId: req.user.id,
      id: req.params.id
    }
  })
    .then(todo => {
      res.render('edit', { todo })
    })
    .catch(error => {
      res.status(422).json(error)
    })
})

// 修改 Todo
router.put('/:id', (req, res) => {
  Todo.findOne({
    where: {
      userId: req.user.id,
      id: req.params.id
    }
  })
    .then(todo => {
      todo.name = req.body.name
      if (req.body.done === 'on') {
        todo.done = true
      } else {
        todo.done = false
      }
      todo.save()
        .then(todo => {
          res.redirect(`/todos/${todo.id}`)
        })
        .catch(error => {
          res.status(422).json(error)
        })
    })
})

// 刪除 Todo
router.delete('/:id/delete', (req, res) => {
  Todo.destroy({
    where: {
      userId: req.user.id,
      id: req.params.id
    }
  })
    .then(
      res.redirect('/')
    )
    .catch(error => {
      res.status(422).json(error)
    })
})

module.exports = router