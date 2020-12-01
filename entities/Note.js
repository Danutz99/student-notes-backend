import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Note = db.define("Note", 
{
    NoteId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    NoteContent: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    StudentId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
    CourseId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
});

export default Note;