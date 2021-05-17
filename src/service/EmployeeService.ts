import {EmployeeRepository} from "../repository/EmployeeRepository";
import {Employee} from "../models/Employee";

export class EmployeeService {

    private empRepo: EmployeeRepository;

    constructor() {
        this.empRepo = new EmployeeRepository();
    }

    getAllEmployees(): Promise<Employee[]> {
        return this.empRepo.fetchAllEmployees();
    }

    getEmployeeById(id: number): Promise<Employee> {
        return this.empRepo.fetchEmployeeById(id);
    }

    searchEmployees(filters: {firstName?: string, lastName?: string, departmentId?: number}): Promise<Employee[]> {
        return this.empRepo.searchEmployees(filters);
    }

    addEmployee(dept: Employee): Promise<Employee> {
        return this.empRepo.insertEmployee(dept);
    }

    updateEmployee(dept: Employee): Promise<Employee> {
        return this.empRepo.updateEmployee(dept);
    }

    deleteEmployee(id: number): Promise<boolean> {
        return this.empRepo.deleteEmployee(id);
    }

}