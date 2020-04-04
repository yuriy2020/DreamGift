const express = require("express");
const useMiddleware = require("./middleware");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const useErrorHandlers = require("./middleware/error-handlers");

const app = express();

useMiddleware(app);

// Подключаем импортированные маршруты с определенным url префиксом.
app.use("/", indexRouter);
app.use("/", usersRouter);
app.use("/", require('./routes/userFoto'));

useErrorHandlers(app);

module.exports = app;
