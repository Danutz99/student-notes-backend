import express from 'express';
import bodyParser from 'body-parser';
import db from './dbConfig.js';
import Course from './entities/Course.js';

let app = express();
let router = express.Router();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  async function createCourse(course){
      return await Course.create(course);
  }


  async function getCourse(){
      return await Course.findAll();  
  }

  router.route('/courses').post(async (req, res) => {
    return res.json(await createCourse(req.body));
  })

  router.route('/courses').get( async (req, res) => {
    return res.json(await getCourse());
})

let port = process.env.PORT || 8000;
app.listen(port);
console.log('API is runnning at ' + port);