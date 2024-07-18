import { Sequelize } from "sequelize";

const db = new Sequelize("gabunganproject", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
