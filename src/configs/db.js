const { Sequelize, DataTypes } = require("sequelize");
const CONFIG = require('./config');

const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, {
    host: "localhost", 
    logging: false,
    dialect: 'mysql',
    port: 3306,
})

    try {
        sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        });
      
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }

  


const db = {};

db.sequelize = sequelize
db.Sequelize = Sequelize

db.users = require("../models/user")(sequelize, DataTypes);


/// uncomment below line to add models to db. 
sequelize.sync({ force: false, alter: false });

module.exports = db