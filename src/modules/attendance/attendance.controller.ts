import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AttendancesService } from './attendance.service';

@ApiTags('Attendances')
@Controller('attendances')
export class AttendancesController {
  constructor(private readonly service: AttendancesService) {}
}
