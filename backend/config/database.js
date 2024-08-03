import { Sequelize } from "sequelize";

const db = new Sequelize("gabunganproject", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Nonaktifkan logging
});

export default db;
