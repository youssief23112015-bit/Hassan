import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClassroomsService } from './classrooms.service';

@ApiTags('Classrooms')
@Controller('classrooms')
export class ClassroomsController {
  constructor(private readonly service: ClassroomsService) {}
}
