import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InventoryItemsService } from './inventory.service';

@ApiTags('InventoryItems')
@Controller('inventory')
export class InventoryItemsController {
  constructor(private readonly service: InventoryItemsService) {}
}
