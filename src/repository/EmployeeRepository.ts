import {Employee} from "../models/Employee";
import pg from "pg";
import {ConnectionPoolProvider} from "./ConnectionPoolProvider";
import logger from "../util/logger";

export class EmployeeRepository {

    private pool;

    constructor() {
        this.pool = ConnectionPoolProvider.getConnectionPool();
    }

    fetchAllEmployees(): Promise<Employee[]> {
        return new Promise<Employee[]>(resolve => {
            const query = "select * from employees where active = true";
            this.pool.query(query, (err, res) => {
                logger.error(err);
                const employees: Employee[] = res.rows;
                resolve(employees);
            });
        });
    }

    fetchEmployeeById(id: number): Promise<Employee> {
        return new Promise<Employee>(resolve => {
            const query = "select * from employees where active = true and id = $1";
            this.pool.query(query, [id], (err, res) => {
                logger.error(err);
                const employees: Employee[] = res.rows;
                resolve(employees[0]);
            });
        });
    }

    insertEmployee(emp: Employee): Promise<Employee> {
        return new Promise<Employee>(resolve => {
            const insertQuery = "insert into employees (firstName, lastName, email, departmentId) values ($1, $2, $3, $4) returning *";
            this.pool.query(insertQuery, [emp.firstName, emp.lastName, emp.email, emp.departmentId], (err, res) => {
                logger.error(err);
                logger.info(res);
                const newEmp: Employee = res.rows[0];
                resolve(newEmp);
            });
        });
    }

    updateEmployee(emp: Employee): Promise<Employee> {
        return new Promise<Employee>(resolve => {
            const updateQuery = "update employees set firstName = $1, lastName = $2, email = $3, departmentId = $4 where id = $5 and active = true returning *";
            this.pool.query(updateQuery, [emp.firstName, emp.lastName, emp.email, emp.departmentId, emp.id], (err, res) => {
                const newEmp: Employee = res.rows[0];
                resolve(newEmp);
            });
        });
    }

    deleteEmployee(empId: number): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            const query = "update employees set active = false where id = $1 and active = true";
            this.pool.query(query, [empId], (err, res) => {
                resolve(!err && res && res.rowCount == 1);
            });
        });
    }

    searchEmployees(filter: { firstName?: string, lastName?: string, departmentId?: number }): Promise<Employee[]> {
        return new Promise<Employee[]>(resolve => {
            let query = "select * from employees where";
            const params = [];
            let paramIndex: number = 1;

            Object.keys(filter).forEach(f => {
                if (filter[f]) {
                    if (paramIndex > 1)
                        query += " and";
                    query += ` ${f} = $${paramIndex}`;
                    params.push(filter[f]);
                    paramIndex++;
                }
            });

            logger.info("Query: " + query);
            logger.info("Params: " + params);

            this.pool.query(query, params, (err, res) => {
                logger.error(err);
                resolve(res.rows);
            });

        });
    }
}