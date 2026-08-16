import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WaitlistsService } from './waitlists.service';

@ApiTags('Waitlists')
@Controller('waitlists')
export class WaitlistsController {
  constructor(private readonly service: WaitlistsService) {}
}
