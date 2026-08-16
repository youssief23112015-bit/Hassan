import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../../shared/entities/employee.entity';
import { EmployeeDocument } from '../../shared/entities/employee-document.entity';
import { TeacherAvailability } from '../../shared/entities/teacher-availability.entity';
import { LeaveRequest } from '../../shared/entities/leave-request.entity';
import { PayrollPeriod } from '../../shared/entities/payroll-period.entity';
import { PayrollEntry } from '../../shared/entities/payroll-entry.entity';
import { LeaveStatus } from '../../common/enums/leave-status.enum';
import { PayrollEntryStatus } from '../../common/enums/payroll-entry-status.enum';

@Injectable()
export class HrService {
  constructor(
    @InjectRepository(Employee) private empRepo: Repository<Employee>,
    @InjectRepository(EmployeeDocument) private docRepo: Repository<EmployeeDocument>,
    @InjectRepository(TeacherAvailability) private availRepo: Repository<TeacherAvailability>,
    @InjectRepository(LeaveRequest) private leaveRepo: Repository<LeaveRequest>,
    @InjectRepository(PayrollPeriod) private periodRepo: Repository<PayrollPeriod>,
    @InjectRepository(PayrollEntry) private entryRepo: Repository<PayrollEntry>,
  ) {}

  // Employees
  async createEmployee(dto: any) {
    return this.empRepo.save(this.empRepo.create(dto));
  }

  async findEmployees(query: any) {
    const qb = this.empRepo.createQueryBuilder('e')
      .leftJoinAndSelect('e.user', 'user');
    if (query.status) qb.andWhere('e.status = :status', { status: query.status });
    if (query.department) qb.andWhere('e.department = :dept', { dept: query.department });
    return qb.getMany();
  }

  async findOneEmployee(id: string) {
    const emp = await this.empRepo.findOne({ where: { id }, relations: ['user'] });
    if (!emp) throw new NotFoundException('Employee not found');
    return emp;
  }

  // Documents
  async addDocument(dto: any) {
    return this.docRepo.save(this.docRepo.create(dto));
  }

  async findDocuments(employeeId: string) {
    return this.docRepo.find({ where: { employee_id: employeeId } });
  }

  // Availability
  async setAvailability(dto: any) {
    return this.availRepo.save(this.availRepo.create(dto));
  }

  async findAvailability(employeeId: string) {
    return this.availRepo.find({
      where: { employee_id: employeeId },
      order: { day_of_week: 'ASC' },
    });
  }

  // Leave Requests
  async requestLeave(dto: any) {
    return this.leaveRepo.save(this.leaveRepo.create(dto));
  }

  async findLeaves(query: any) {
    const qb = this.leaveRepo.createQueryBuilder('l')
      .leftJoinAndSelect('l.employee', 'employee')
      .leftJoinAndSelect('employee.user', 'user');
    if (query.status) qb.andWhere('l.status = :status', { status: query.status });
    if (query.employee_id) qb.andWhere('l.employee_id = :eid', { eid: query.employee_id });
    return qb.getMany();
  }

  async approveLeave(id: string, approverId: string, note?: string) {
    const leave = await this.leaveRepo.findOne({ where: { id } });
    if (!leave) throw new NotFoundException('Leave request not found');
    leave.status = LeaveStatus.APPROVED;
    leave.approved_by = approverId;
    leave.approved_at = new Date();
    leave.approval_note = note;
    return this.leaveRepo.save(leave);
  }

  // Payroll
  async createPeriod(dto: any) {
    return this.periodRepo.save(this.periodRepo.create(dto));
  }

  async createPayrollEntry(dto: any) {
    const emp = await this.empRepo.findOne({ where: { id: dto.employee_id } });
    if (!emp) throw new NotFoundException('Employee not found');

    let total = 0;
    if (emp.salary && emp.salary > 0) {
      total = emp.salary + (dto.bonus || 0) - (dto.deductions || 0);
    } else if (emp.hourly_rate && emp.hourly_rate > 0) {
      total = (dto.hours_worked || 0) * emp.hourly_rate + (dto.bonus || 0) - (dto.deductions || 0);
    }

    const entry = this.entryRepo.create({
      ...dto,
      base_amount: emp.salary || 0,
      hourly_rate: emp.hourly_rate,
      total_amount: total,
      status: PayrollEntryStatus.DRAFT,
    });
    return this.entryRepo.save(entry);
  }

  async findPayrollEntries(periodId: string) {
    return this.entryRepo.find({
      where: { payroll_period_id: periodId },
      relations: ['employee', 'employee.user'],
    });
  }
}
