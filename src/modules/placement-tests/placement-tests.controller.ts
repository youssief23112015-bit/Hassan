import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlacementTestsService } from './placement-tests.service';

@ApiTags('PlacementTests')
@Controller('placement-tests')
export class PlacementTestsController {
  constructor(private readonly service: PlacementTestsService) {}
}
