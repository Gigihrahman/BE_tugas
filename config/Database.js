import {Sequelize} from "sequelize";

const db = new Sequelize("testing12", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;