import express from "express";
import {DepartmentService} from "../service/DepartmentService";
import logger from "../util/logger";
import {Department} from "../models/Department";

const router = express.Router();
const departmentService = new DepartmentService();

/*
 * Get All Departments
 */
router.get("/", (req, res) => {
    departmentService.getAllDepartments()
        .then(depts => {
            res.send(depts);
        });
});

/*
 * Get Department By Id
 */
router.get("/:deptId", (req, res) => {
    departmentService.getDepartmentById(+req.params.deptId)
        .then(dept => {
            res.send(dept);
        });
});

/*
 * Add Department
 */
router.post("/", (req, res) => {
    const dept: Department = req.body;
    departmentService.addDepartment(dept)
        .then(d => {
            if (d) {
                res.send(dept);
            } else {
                res.status(400);
                res.send({error: "An error occurred while adding the department"});
            }
        });
});

/*
 * Update Department
 */
router.put("/:deptId", (req, res) => {
    const dept: Department = req.body;
    dept.id = +req.params.deptId;
    departmentService.updateDepartment(dept)
        .then(dept => {
            if (dept) {
                res.send(dept);
            } else {
                res.status(400);
                res.send({error: "An error occurred while updating the department"});
            }
        });
});

/*
 * Delete Department
 */
router.delete("/:deptId", (req, res) => {
    const deptId = +req.params.deptId;
    departmentService.deleteDepartment(deptId)
        .then(success => {
            res.status(success ? 200 : 400);
            res.send({success: success});
        });
});

export = router;