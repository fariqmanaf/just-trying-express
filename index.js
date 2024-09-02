const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


const { notFound, errorHandler } = require("./src/utils/handler/errorHandler");
const auth = require("./src/app/auth/auth.controller");
const users = require("./src/app/users/user.controller");
const projects = require("./src/app/project/project.controller");
const tasks = require("./src/app/task/task.controller");

app.use("/auth", auth);
app.use("/users", users);
app.use("/projects", projects, tasks);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening Port ${port}`);
});