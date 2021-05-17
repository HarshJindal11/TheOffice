import {Department} from "../models/Department";
import pg from "pg";
import {ConnectionPoolProvider} from "./ConnectionPoolProvider";
import logger from "../util/logger";

export class DepartmentRepository {

    private pool;

    constructor() {
        this.pool = ConnectionPoolProvider.getConnectionPool();
    }

    fetchAllDepartments(): Promise<Department[]> {
        return new Promise<Department[]>(resolve => {
            const query = "select * from departments where active = true";
            this.pool.query(query, (err, res) => {
                const depts: Department[] = res.rows;
                resolve(depts);
            });
        });
    }

    fetchDepartmentById(id: number): Promise<Department> {
        return new Promise<Department>(resolve => {
            const query = "select * from departments where active = true and id = $1";
            this.pool.query(query, [id], (err, res) => {
                const depts: Department[] = res.rows;
                resolve(depts[0]);
            });
        });
    }

    insertDepartment(dept: Department): Promise<Department> {
        return new Promise<Department>(resolve => {
            const insertQuery = "insert into departments (name) values ($1) returning *";
            this.pool.query(insertQuery, [dept.name], (err, res) => {
                const newDept: Department = res.rows[0];
                resolve(newDept);
            });
        });
    }

    updateDepartment(dept: Department): Promise<Department> {
        return new Promise<Department>(resolve => {
            const updateQuery = "update departments set name = $1 where id = $2 and active = true returning *";
            this.pool.query(updateQuery, [dept.name, dept.id], (err, res) => {
                const newDept: Department = res.rows[0];
                resolve(newDept);
            });
        });
    }

    deleteDepartment(deptId: number): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            const query = "update departments set active = false where id = $1 and active = true";
            this.pool.query(query, [deptId], (err, res) => {
                resolve(!err && res && res.rowCount == 1);
            });
        });
    }

}