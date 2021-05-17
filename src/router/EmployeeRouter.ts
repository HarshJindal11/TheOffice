import express from "express";
import { EmployeeService } from "../service/EmployeeService";
import {Employee} from "../models/Employee";

const router = express.Router();
const employeeService = new EmployeeService();

/*
 * Get All Employees
 */
router.get("/", (req, res) => {
    employeeService.getAllEmployees()
        .then(emps => {
            res.send(emps);
        });
});

/*
 * Get Employee By Id
 */
router.get("/:empId", (req, res) => {
    employeeService.getEmployeeById(+req.params.empId)
        .then(emp => {
            res.send(emp);
        });
});

/*
 * Search Employees
 */
router.post("/search", (req, res) => {
    const filters: {firstName?: string, lastName?: string, departmentId?: number} = req.body;
    if (Object.keys(filters).length == 0) {
        res.status(400);
        res.send({error: "At least one filtering criteria is required in the request body"});
    } else {
        employeeService.searchEmployees(filters)
            .then(emp => {
                res.send(emp);
            });
    }
});

/*
 * Add Employee
 */
router.post("/", (req, res) => {
    const emp: Employee = req.body;
    employeeService.addEmployee(emp)
        .then(e => {
            if (e) {
                res.send(e);
            } else {
                res.status(400);
                res.send({error: "An error occurred while adding the employee"});
            }
        });
});

/*
 * Update Employee
 */
router.put("/:empId", (req, res) => {
    const emp: Employee = req.body;
    emp.id = +req.params.empId;
    employeeService.updateEmployee(emp)
        .then(e => {
            if (e) {
                res.send(e);
            } else {
                res.status(400);
                res.send({error: "An error occurred while updating the employee"});
            }
        });
});

/*
 * Delete Employee
 */
router.delete("/:empId", (req, res) => {
    const empId = +req.params.empId;
    employeeService.deleteEmployee(empId)
        .then(success => {
            res.status(success ? 200 : 400);
            res.send({success: success});
        });
});

export = router;