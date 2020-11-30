import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const CourseStudent = db.define("CourseStudent", 
{
    CourseId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
    StudentId: 
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    }     
});

export default CourseStudent;