import { Controller, Get, Post, Body, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ActivitiesService } from './activities.service';

@ApiTags('Activities')
@ApiBearerAuth('JWT')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly service: ActivitiesService) {}

  @Post()
  @Roles('super_admin', 'branch_manager')
  @ApiOperation({ summary: 'Create activity' })
  create(@Body() dto: any, @CurrentUser() user: any) {
    return this.service.create(dto, user.userId);
  }

  @Get()
  @Roles('super_admin', 'branch_manager', 'teacher', 'student')
  @ApiOperation({ summary: 'List activities' })
  findAll(@Query() query: any, @CurrentUser() user: any) {
    return this.service.findAll(query, user);
  }

  @Get(':id')
  @Roles('super_admin', 'branch_manager', 'teacher', 'student')
  @ApiOperation({ summary: 'Get activity' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findOne(id);
  }

  @Post('registrations')
  @Roles('student', 'super_admin', 'branch_manager', 'sales')
  @ApiOperation({ summary: 'Register for activity' })
  register(@Body() dto: any) {
    return this.service.register(dto);
  }

  @Post('photos')
  @Roles('super_admin', 'branch_manager', 'teacher')
  @ApiOperation({ summary: 'Add activity photo' })
  addPhoto(@Body() dto: any, @CurrentUser() user: any) {
    return this.service.addPhoto(dto, user.userId);
  }
}
