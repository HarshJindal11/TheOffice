import {DepartmentRepository} from "../repository/DepartmentRepository";
import {Department} from "../models/Department";

export class DepartmentService {

    private deptRepo: DepartmentRepository;

    constructor() {
        this.deptRepo = new DepartmentRepository();
    }

    getAllDepartments(): Promise<Department[]> {
        return this.deptRepo.fetchAllDepartments();
    }

    getDepartmentById(id: number): Promise<Department> {
        return this.deptRepo.fetchDepartmentById(id);
    }

    addDepartment(dept: Department): Promise<Department> {
        return this.deptRepo.insertDepartment(dept);
    }

    updateDepartment(dept: Department): Promise<Department> {
        return this.deptRepo.updateDepartment(dept);
    }

    deleteDepartment(id: number): Promise<boolean> {
        return this.deptRepo.deleteDepartment(id);
    }

}