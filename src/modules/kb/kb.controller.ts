import { Controller, Get, Post, Put, Body, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { KbService } from './kb.service';

@ApiTags('Knowledge Base')
@ApiBearerAuth('JWT')
@Controller('kb')
export class KbController {
  constructor(private readonly service: KbService) {}

  @Post('categories')
  @Roles('super_admin', 'hr', 'branch_manager')
  @ApiOperation({ summary: 'Create KB category' })
  createCategory(@Body() dto: any) {
    return this.service.createCategory(dto);
  }

  @Get('categories')
  @Roles('super_admin', 'hr', 'branch_manager', 'teacher', 'sales', 'finance')
  @ApiOperation({ summary: 'List KB categories' })
  findCategories(@Query() query: any) {
    return this.service.findCategories(query);
  }

  @Post('articles')
  @Roles('super_admin', 'hr', 'branch_manager', 'teacher')
  @ApiOperation({ summary: 'Create KB article' })
  createArticle(@Body() dto: any, @CurrentUser() user: any) {
    return this.service.createArticle(dto, user.userId);
  }

  @Get('articles')
  @Roles('super_admin', 'hr', 'branch_manager', 'teacher', 'sales', 'finance')
  @ApiOperation({ summary: 'List KB articles' })
  findArticles(@Query() query: any) {
    return this.service.findArticles(query);
  }

  @Get('articles/:id')
  @Roles('super_admin', 'hr', 'branch_manager', 'teacher', 'sales', 'finance')
  @ApiOperation({ summary: 'Get KB article' })
  findOneArticle(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findOneArticle(id);
  }

  @Put('articles/:id')
  @Roles('super_admin', 'hr', 'branch_manager', 'teacher')
  @ApiOperation({ summary: 'Update KB article' })
  updateArticle(@Param('id', ParseUUIDPipe) id: string, @Body() dto: any, @CurrentUser() user: any) {
    return this.service.updateArticle(id, dto, user.userId);
  }
}
