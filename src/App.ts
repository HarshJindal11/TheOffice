import express from "express";
import bodyParser from "body-parser";
import logger from "./util/logger";
import employeeRouter from "./router/EmployeeRouter";
import departmentRouter from "./router/DepartmentRouter";
import swaggerRouter from "./router/SwaggerRouter";
import uuid from "uuid";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging and Transaction ID middleware
app.use("/", (req, res, next) => {
    const transactionId = req.get("X-OFFICE-TRANSACTION-ID") ? req.get("X-OFFICE-TRANSACTION-ID") : uuid.v1();
    res.set("X-OFFICE-TRANSACTION-ID", transactionId);
    logger.info("Request received", {transactionId, requestURI: req.url, httpMethod: req.method, requestBody: req.body});
    next();
});

app.use("/", swaggerRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/departments", departmentRouter);

app.use("/health/check", (req, res, next) => {
   res.send("Healthy");
});

logger.info("Starting application...");

export default app;
