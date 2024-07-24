import {Sequelize} from "sequelize";

const db = new Sequelize("testing13", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;