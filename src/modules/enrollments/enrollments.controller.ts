import { Controller, Get, Post, Put, Body, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentStatusDto } from './dto/update-enrollment-status.dto';

@ApiTags('Enrollments')
@ApiBearerAuth('JWT')
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly service: EnrollmentsService) {}

  @Post()
  @Roles('super_admin', 'branch_manager', 'sales', 'finance')
  @ApiOperation({ summary: 'Create enrollment' })
  create(@Body() dto: CreateEnrollmentDto, @CurrentUser() user: any) {
    return this.service.create(dto, user.userId, user.branchId);
  }

  @Get()
  @Roles('super_admin', 'branch_manager', 'sales', 'finance', 'academic')
  @ApiOperation({ summary: 'List enrollments' })
  findAll(@Query() query: any, @CurrentUser() user: any) {
    return this.service.findAll(query, user);
  }

  @Get(':id')
  @Roles('super_admin', 'branch_manager', 'sales', 'finance', 'academic')
  @ApiOperation({ summary: 'Get enrollment' })
  findOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: any) {
    return this.service.findOne(id, user);
  }

  @Put(':id/status')
  @Roles('super_admin', 'branch_manager', 'sales', 'finance')
  @ApiOperation({ summary: 'Update enrollment status' })
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateEnrollmentStatusDto,
    @CurrentUser() user: any,
  ) {
    return this.service.updateStatus(id, dto, user.userId);
  }

  @Post(':id/transfer')
  @Roles('super_admin', 'branch_manager', 'academic')
  @ApiOperation({ summary: 'Transfer enrollment to another group' })
  transfer(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('group_id', ParseUUIDPipe) groupId: string,
    @CurrentUser() user: any,
  ) {
    return this.service.transfer(id, groupId, user.userId);
  }
}
