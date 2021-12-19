const dotenv = require('dotenv');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
// const bodyParser = require('body-parser');
// ???
// var fs = require('fs');
// var path = require('path');
const checkPerms = require('./controllers/auth').checkPerms;

// Функция подключения к БД
const connectDB = require('./config/db.js');

// Загрузка переменный окружения
dotenv.config({ path: './config/config.env' });
connectDB();
app.use(express.json());
// api router
const api = require('./routes/api-master');
app.use('/api/', api);

// // set up multer for storing uploaded files
// var multer = require('multer');
//
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
//
// var upload = multer({ storage: storage });

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
//
// // Set EJS as templating engine
// app.set("view engine", "ejs");

// var imgModel = require('./models/Image');

// app.get('/', (req, res) => {
//     imgModel.find({}, (err, items) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send('An error occurred', err);
//         }
//         else {
//             res.render('imagesPage', { items: items });
//         }
//     });
// });

// app.get("/*", function (req, res) {
//    res.sendFile(path.resolve(__dirname, '../pd/build', 'index.html'));
// })

// app.post('/', upload.single('image'), (req, res, next) => {
//
//     var obj = {
//         name: req.body.name,
//         desc: req.body.desc,
//         img: {
//             data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//             contentType: 'image/png'
//         }
//     }
//     imgModel.create(obj, (err, item) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             // item.save();
//             res.redirect('/');
//         }
//     });
// });

// route files
const users = require('./routes/users');
const worlds = require('./routes/worlds');
const images = require('./routes/images');

// Получаем возможность брать данные из body
app.use(express.json());

//Включаем логгер в случае dev
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Enable CORS
app.use(cors());
// if (process.env.NODE_ENV === 'production') {
app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
// }
const PORT = process.env.PORT || 3000;

// Запускаем сервер на порту
const server = app.listen(
  PORT,
  console.log(
    `Сервер запущен в режиме ${process.env.NODE_ENV} на порту ${PORT}`
  )
);
