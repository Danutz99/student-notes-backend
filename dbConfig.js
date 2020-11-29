import Sequelize from 'sequelize';

const db = new Sequelize({
    dialect: 'mssql',
    database: 'StudentNotes',
    username: 'sa',
    host: 'localhost',
    port: '55892',
    password: 'danutz100',  
    validateBulkLoadParameters: true,
    define: {
    timestamps: false,
    freezeTableName: true
    }  
})

export default db;