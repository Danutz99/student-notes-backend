import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const StudyGroupStudent = db.define("StudyGroupStudent", 
{
    StudyGroupId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
    StudentId: 
    {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    }     
});

export default StudyGroupStudent;