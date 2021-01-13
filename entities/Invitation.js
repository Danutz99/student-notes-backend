import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Invitation = db.define("Invitation", 
{
    InvitationId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    StudentId:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    InviterId: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    InviterName: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    StudyGroupId:
    {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    StudyGroupName:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
});

export default Invitation;