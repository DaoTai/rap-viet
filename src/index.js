const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')

const app = express()
const port = 3000

const router = require('./routes')
const db = require('./config/db')
const SortMiddleware = require('./app/middlewares/SortMiddleware')

// Static dictionary
app.use(express.static(path.join(__dirname, 'public')))

// Parse body
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Template engine
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    helpers:{
        sum: (a, b) => a + b,
        getAge: (birth) => {
            const today = new Date();
            const birthDate = new Date(birth)
            if(birthDate.getFullYear()){
              return birthDate.getDate() + '-' + (birthDate.getMonth() + 1 ) + '-' + birthDate.getFullYear() + ` (${today.getFullYear() - birthDate.getFullYear()} tuổi)`
            }
            else{
              return birth || 'Chưa cập nhật'
            }
        },
        formatDate: (birth) => {
            birth = new Date(birth)
            return birth.toLocaleDateString("en-US")
        } ,
        isCheckedRadio: (data, value) => data === value ? 'checked' : '',
        isCheckedCheckbox: (data, value) => data.includes(value) ? 'checked' : '',
        sortable: (field, sort) => {
          const sortType = field === sort.column ? sort.type : 'default'
          const types = {
            default: 'desc',
            desc: 'asc',
            asc: 'desc'
          }
          const icons = {
            default: "oi oi-elevator",
            desc: "oi oi-sort-descending",
            asc:"oi oi-sort-ascending"
          }

          const type = types[sortType]
          const icon = icons[sortType]

          return `<a href="?_sort&column=${field}&type=${type}"><span class="${icon}"></span></a>`
        }
    }
}))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/resources/views'))

// Override methods
app.use(methodOverride('_method'))

// Custom middlewares
app.use(SortMiddleware)

// Connect db
db.connect()
// Routes
router(app)


app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`)
})