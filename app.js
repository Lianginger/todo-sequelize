const express = require('express')
const app = express()
const port = 3000
const db = require('./models')
const { authenticated } = require('./config/auth')

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const session = require('express-session')
const passport = require('passport')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session({
  secret: 'secretKey',
  resave: 'false',
  saveUninitialized: 'false',
}))

app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})


// 設定路由
// 首頁

app.use('/users', require('./routes/user'))
app.use('/', authenticated, require('./routes/home'))
app.use('/todos', authenticated, require('./routes/todo'))

// 設定 express port 3000 與讓資料庫同步
app.listen(port, () => {
  db.sequelize.sync()
  console.log(`App is running on port ${port}!`)
})