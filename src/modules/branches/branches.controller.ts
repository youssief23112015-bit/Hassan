import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BranchsService } from './branches.service';

@ApiTags('Branchs')
@Controller('branches')
export class BranchsController {
  constructor(private readonly service: BranchsService) {}
}
