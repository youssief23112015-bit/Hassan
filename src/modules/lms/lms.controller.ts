import { Controller, Get, Post, Put, Body, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { LmsService } from './lms.service';

@ApiTags('LMS')
@ApiBearerAuth('JWT')
@Controller('lms')
export class LmsController {
  constructor(private readonly service: LmsService) {}

  // Modules
  @Post('modules')
  @Roles('super_admin', 'academic', 'teacher')
  @ApiOperation({ summary: 'Create module' })
  createModule(@Body() dto: any, @CurrentUser() user: any) {
    return this.service.createModule(dto, user.userId);
  }

  @Get('modules')
  @Roles('super_admin', 'academic', 'teacher', 'student')
  @ApiOperation({ summary: 'List modules for group' })
  findModules(@Query('group_id', ParseUUIDPipe) groupId: string) {
    return this.service.findModules(groupId);
  }

  // Lessons
  @Post('lessons')
  @Roles('super_admin', 'academic', 'teacher')
  @ApiOperation({ summary: 'Create lesson' })
  createLesson(@Body() dto: any) {
    return this.service.createLesson(dto);
  }

  @Get('lessons')
  @Roles('super_admin', 'academic', 'teacher', 'student')
  @ApiOperation({ summary: 'List lessons for module' })
  findLessons(@Query('module_id', ParseUUIDPipe) moduleId: string) {
    return this.service.findLessons(moduleId);
  }

  // Resources
  @Post('resources')
  @Roles('super_admin', 'academic', 'teacher')
  @ApiOperation({ summary: 'Add resource' })
  createResource(@Body() dto: any) {
    return this.service.createResource(dto);
  }

  // Assignments
  @Post('assignments')
  @Roles('super_admin', 'academic', 'teacher')
  @ApiOperation({ summary: 'Create assignment' })
  createAssignment(@Body() dto: any, @CurrentUser() user: any) {
    return this.service.createAssignment(dto, user.userId);
  }

  @Get('assignments')
  @Roles('super_admin', 'academic', 'teacher', 'student')
  @ApiOperation({ summary: 'List assignments' })
  findAssignments(@Query('group_id', ParseUUIDPipe) groupId: string) {
    return this.service.findAssignments(groupId);
  }

  @Post('submissions')
  @Roles('student')
  @ApiOperation({ summary: 'Submit assignment' })
  submitAssignment(@Body() dto: any, @CurrentUser() user: any) {
    return this.service.submitAssignment(dto, user.userId);
  }

  @Put('submissions/:id/grade')
  @Roles('super_admin', 'academic', 'teacher')
  @ApiOperation({ summary: 'Grade submission' })
  gradeSubmission(@Param('id', ParseUUIDPipe) id: string, @Body() dto: any, @CurrentUser() user: any) {
    return this.service.gradeSubmission(id, dto, user.userId);
  }

  // Quizzes
  @Post('quizzes')
  @Roles('super_admin', 'academic', 'teacher')
  @ApiOperation({ summary: 'Create quiz' })
  createQuiz(@Body() dto: any, @CurrentUser() user: any) {
    return this.service.createQuiz(dto, user.userId);
  }

  @Get('quizzes')
  @Roles('super_admin', 'academic', 'teacher', 'student')
  @ApiOperation({ summary: 'List quizzes' })
  findQuizzes(@Query('group_id', ParseUUIDPipe) groupId: string) {
    return this.service.findQuizzes(groupId);
  }

  @Post('quizzes/:id/start')
  @Roles('student')
  @ApiOperation({ summary: 'Start quiz attempt' })
  startAttempt(@Param('id', ParseUUIDPipe) quizId: string, @CurrentUser() user: any) {
    return this.service.startAttempt(quizId, user.userId);
  }

  @Put('attempts/:id/submit')
  @Roles('student')
  @ApiOperation({ summary: 'Submit quiz attempt' })
  submitAttempt(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: { answers: any; time_spent_seconds: number },
  ) {
    return this.service.submitAttempt(id, dto.answers, dto.time_spent_seconds);
  }

  // Gradebook
  @Post('gradebook/categories')
  @Roles('super_admin', 'academic', 'teacher')
  @ApiOperation({ summary: 'Create gradebook category' })
  createCategory(@Body() dto: any, @CurrentUser() user: any) {
    return this.service.createCategory(dto, user.userId);
  }

  @Post('gradebook/entries')
  @Roles('super_admin', 'academic', 'teacher')
  @ApiOperation({ summary: 'Add gradebook entry' })
  addEntry(@Body() dto: any, @CurrentUser() user: any) {
    return this.service.addEntry(dto, user.userId);
  }

  @Get('gradebook')
  @Roles('super_admin', 'academic', 'teacher', 'student')
  @ApiOperation({ summary: 'Get gradebook for group' })
  getGradebook(@Query('group_id', ParseUUIDPipe) groupId: string) {
    return this.service.getGradebook(groupId);
  }

  // Evaluations & Surveys
  @Post('evaluations')
  @Roles('super_admin', 'academic', 'teacher')
  @ApiOperation({ summary: 'Create teacher evaluation' })
  createEvaluation(@Body() dto: any) {
    return this.service.createEvaluation(dto);
  }

  @Post('surveys')
  @Roles('student')
  @ApiOperation({ summary: 'Submit student survey' })
  createSurvey(@Body() dto: any) {
    return this.service.createSurvey(dto);
  }
}
