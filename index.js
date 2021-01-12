import express from 'express';
import bodyParser from 'body-parser';
import db from './dbConfig.js';
import Course from './entities/Course.js';
import Student from './entities/Student.js';
import CourseStudent from './entities/CourseStudent.js';
import Note from './entities/Note.js';
import StudyGroup from './entities/StudyGroup.js';
import StudyGroupStudent from './entities/StudyGroupStudent.js';



let app = express();
let router = express.Router();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
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
  Course.belongsToMany(Student, {through: "CourseStudent", as: "Students", foreignKey: "CourseId"});

  Student.hasMany(Note, {as: "Notes", foreignKey: "StudentId"});
  Note.belongsTo(Student, {foreignKey: "StudentId"});

  Course.hasMany(Note, {as: "Notes", foreignKey: "CourseId"});
  Note.belongsTo(Course, {foreignKey: "CourseId"});

  Student.belongsToMany(StudyGroup, {through: "StudyGroupStudent", as: "StudyGroups", foreignKey: "StudentId"});
  StudyGroup.belongsToMany(Student, {through: "StudyGroupStudent", as: "Students", foreignKey: "StudyGroupId"});

  async function createCourse(course){
      return await Course.create(course);
  }

  async function createStudent(student){
    return await Student.create(student);
  }

  async function createStudyGroup(studyGroup){
    return await StudyGroup.create(studyGroup);
}

  async function createNote(note){
    return await Note.create(note);
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

  async function associateStudyGroupStudent(studyGroupStudent){
    return await StudyGroupStudent.create(studyGroupStudent);
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

async function getStudyGroupStudents(studyGroupId){
  return await StudyGroup.findByPk(studyGroupId, {
    include: [
        {
            model: Student,
            as: "Students"
        }
    ]
})
}

async function getStudentStudyGroups(studentId){
  return await Student.findByPk(studentId, {
    include: [
        {
            model: StudyGroup,
            as: "StudyGroups"
        }
    ]
})
}

async function getStudentCourseNotes(studentId, courseId){
  return await Note.findAll({ where: { StudentId: studentId, CourseId: courseId } });
}

async function getStudentCourseNote(studentId, courseId, noteId){
  return await Note.findOne({ where: {NoteId: noteId, StudentId: studentId, CourseId: courseId } });
}

async function updateStudentCourseNote(studentId, courseId, noteId, updatedContent){
  let note =  await Note.findOne({ where: {NoteId: noteId, StudentId: studentId, CourseId: courseId } });
  return await note.update({NoteContent: updatedContent});
}

async function deleteNote(studentId, courseId, noteId){
  let note = await Note.findOne({ where: {NoteId: noteId, StudentId: studentId, CourseId: courseId } });

  if (!note){
    console.log("This element does not exist, so it cannot be deleted");
    return;
  }  

  try{
      return await note.destroy();
  }catch(e){
      throw(e);  
  }
}

  router.route('/courses').post(async (req, res) => {
    return res.json(await createCourse(req.body));
  })

  router.route('/studyGroups').post(async (req, res) => {
    return res.json(await createStudyGroup(req.body));
  })

  router.route('/courses').get( async (req, res) => {
    return res.json(await getCourse());
})

  router.route('/courseStudent').post(async (req, res) => {
  return res.json(await associateCourseStudent(req.body));
})

router.route('/studyGroupStudent').post(async (req, res) => {
  return res.json(await associateStudyGroupStudent(req.body));
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

router.route('/studyGroup/:id/students').get(async (req, res) => {
  return res.json(await getStudyGroupStudents(req.params.id));
})

router.route('/student/:id/studyGroups').get(async (req, res) => {
  return res.json(await getStudentStudyGroups(req.params.id));
})

router.route('/note').post( async (req, res) => {
  return res.json(await createNote(req.body));
})

router.route('/student/:studentId/course/:courseId/notes').get(async (req, res) => {
  return res.json(await getStudentCourseNotes(req.params.studentId, req.params.courseId));
})

router.route('/student/:studentId/course/:courseId/note/:noteId').get(async (req, res) => {
  return res.json(await getStudentCourseNote(req.params.studentId, req.params.courseId, req.params.noteId));
})

router.route('/student/:studentId/course/:courseId/note/:noteId').put(async (req, res) => {
  return res.json(await updateStudentCourseNote(req.params.studentId, req.params.courseId, req.params.noteId, req.body.NoteContent));
})

router.route('/student/:studentId/course/:courseId/note/:noteId').delete(async (req, res) => {
  return res.json(await deleteNote(req.params.studentId, req.params.courseId, req.params.noteId));
})

let port = process.env.PORT || 8000;
app.listen(port);
console.log('API is runnning at ' + port);