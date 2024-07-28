import {Sequelize} from "sequelize";

const db = new Sequelize("ngadoKado", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;