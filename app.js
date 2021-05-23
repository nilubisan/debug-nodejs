require("dotenv").config();
const express = require("express");
const app = express();
const { sequelize } = require("./db");
const user = require("./controllers/userController");
const game = require("./controllers/gameController");
const validateSession = require("./middleware/validate-session");
sequelize.sync();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/auth", user);
app.use(validateSession);
app.use("/api/game", game);
app.listen(process.env.CONNECT_PORT, () =>
  console.log("App is listening on 4000")
);
