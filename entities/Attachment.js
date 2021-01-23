import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Attachment = db.define("Attachment", 
{
    AttachmentId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    AttachmentContent: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    AttachmentName: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    AttachmentType: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    AttachmentSize: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    NoteId: 
    {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    StudentId:
    {
        type: Sequelize.STRING,
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

export default Attachment;