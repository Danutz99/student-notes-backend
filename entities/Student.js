import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Student = db.define("Student", 
{
    StudentId:
    {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
    StudentName: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    StudentEmail: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    StudentSchool:
    {
        type: Sequelize.STRING,
        allowNull: true
    }
});

export default Student;