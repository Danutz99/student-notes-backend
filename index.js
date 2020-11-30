import express from 'express';
import bodyParser from 'body-parser';
import db from './dbConfig.js';
import Course from './entities/Course.js';
import Student from './entities/Student.js';
import CourseStudent from './entities/CourseStudent.js';

let app = express();
let router = express.Router();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization");
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

  Student.belongsToMany(Course, {through: "CourseStudent", as: "Courses", foreignKey: "StudentId"});
  Course.belongsToMany(Student, {through: "CourseStudent", as: "Students", foreignKey: "CourseId"})

  async function createCourse(course){
      return await Course.create(course);
  }

  async function createStudent(student){
    return await Student.create(student);
  }

  async function getStudentById(studentId){
    return await Student.findByPk(studentId);
  }

  async function getCourse(){
      return await Course.findAll();  
  }
  
  async function associateCourseStudent(courseStudent){
    return await CourseStudent.create(courseStudent);
  }

  async function getStudentCourses(studentId){
    return await Student.findByPk(studentId, {
      include: [
          {
              model: Course,
              as: "Courses"
          }
      ]
  })
}

  router.route('/courses').post(async (req, res) => {
    return res.json(await createCourse(req.body));
  })

  router.route('/courses').get( async (req, res) => {
    return res.json(await getCourse());
})

  router.route('/courseStudent').post(async (req, res) => {
  return res.json(await associateCourseStudent(req.body));
})

router.route('/student').post(async (req, res) => {
  return res.json(await createStudent(req.body));
})

router.route('/student/:id').get(async (req, res) => {
  return res.json(await getStudentById(req.params.id));
})

router.route('/student/:id/courses').get(async (req, res) => {
  return res.json(await getStudentCourses(req.params.id));
})

let port = process.env.PORT || 8000;
app.listen(port);
console.log('API is runnning at ' + port);