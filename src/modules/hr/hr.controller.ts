import { Controller, Get, Post, Put, Body, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { HrService } from './hr.service';

@ApiTags('HR')
@ApiBearerAuth('JWT')
@Controller('hr')
export class HrController {
  constructor(private readonly service: HrService) {}

  @Post('employees')
  @Roles('super_admin', 'hr')
  @ApiOperation({ summary: 'Create employee record' })
  createEmployee(@Body() dto: any) {
    return this.service.createEmployee(dto);
  }

  @Get('employees')
  @Roles('super_admin', 'hr', 'branch_manager')
  @ApiOperation({ summary: 'List employees' })
  findEmployees(@Query() query: any) {
    return this.service.findEmployees(query);
  }

  @Get('employees/:id')
  @Roles('super_admin', 'hr', 'branch_manager')
  @ApiOperation({ summary: 'Get employee' })
  findOneEmployee(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findOneEmployee(id);
  }

  @Post('documents')
  @Roles('super_admin', 'hr')
  @ApiOperation({ summary: 'Add employee document' })
  addDocument(@Body() dto: any) {
    return this.service.addDocument(dto);
  }

  @Get('employees/:id/documents')
  @Roles('super_admin', 'hr', 'branch_manager')
  @ApiOperation({ summary: 'List employee documents' })
  findDocuments(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findDocuments(id);
  }

  @Post('availabilities')
  @Roles('super_admin', 'hr', 'teacher')
  @ApiOperation({ summary: 'Set teacher availability' })
  setAvailability(@Body() dto: any) {
    return this.service.setAvailability(dto);
  }

  @Get('employees/:id/availabilities')
  @Roles('super_admin', 'hr', 'teacher', 'academic')
  @ApiOperation({ summary: 'Get teacher availability' })
  findAvailability(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findAvailability(id);
  }

  @Post('leaves')
  @Roles('super_admin', 'hr', 'teacher', 'employee')
  @ApiOperation({ summary: 'Request leave' })
  requestLeave(@Body() dto: any) {
    return this.service.requestLeave(dto);
  }

  @Get('leaves')
  @Roles('super_admin', 'hr', 'branch_manager')
  @ApiOperation({ summary: 'List leave requests' })
  findLeaves(@Query() query: any) {
    return this.service.findLeaves(query);
  }

  @Put('leaves/:id/approve')
  @Roles('super_admin', 'hr', 'branch_manager')
  @ApiOperation({ summary: 'Approve leave' })
  approveLeave(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('note') note: string,
    @CurrentUser() user: any,
  ) {
    return this.service.approveLeave(id, user.userId, note);
  }

  @Post('payroll-periods')
  @Roles('super_admin', 'hr', 'finance')
  @ApiOperation({ summary: 'Create payroll period' })
  createPeriod(@Body() dto: any) {
    return this.service.createPeriod(dto);
  }

  @Post('payroll-entries')
  @Roles('super_admin', 'hr', 'finance')
  @ApiOperation({ summary: 'Create payroll entry' })
  createPayrollEntry(@Body() dto: any) {
    return this.service.createPayrollEntry(dto);
  }

  @Get('payroll-periods/:id/entries')
  @Roles('super_admin', 'hr', 'finance')
  @ApiOperation({ summary: 'List payroll entries' })
  findPayrollEntries(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findPayrollEntries(id);
  }
}
