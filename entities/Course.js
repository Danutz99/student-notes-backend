import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Course = db.define("Course", 
{
    CourseId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    CourseName: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    CourseTag:
    {
        type: Sequelize.STRING,
        allowNull: true
    }
});

export default Course;