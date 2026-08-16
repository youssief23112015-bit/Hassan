import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './notifications.service';

@ApiTags('Users')
@Controller('notifications')
export class UsersController {
  constructor(private readonly service: UsersService) {}
}
