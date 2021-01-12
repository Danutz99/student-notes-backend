import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const StudyGroup = db.define("StudyGroup", 
{
    StudyGroupId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    StudyGroupName: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    StudyGroupDescription:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    CourseId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
});

export default StudyGroup;