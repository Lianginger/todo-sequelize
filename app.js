const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const db = require('./models')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// 設定路由
// 首頁
app.get('/', (req, res) => {
  res.send('hello world')
})
app.use('/users', require('./routes/user'))

// 設定 express port 3000 與讓資料庫同步
app.listen(port, () => {
  db.sequelize.sync()
  console.log(`App is running on port ${port}!`)
})