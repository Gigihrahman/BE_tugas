import {Sequelize} from "sequelize";

const db = new Sequelize("ngadoKado2", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;