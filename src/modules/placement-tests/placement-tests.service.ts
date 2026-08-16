import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlacementTest } from '../../shared/entities/placement-test.entity';

@Injectable()
export class PlacementTestsService {
  constructor(
    @InjectRepository(PlacementTest)
    private readonly repo: Repository<PlacementTest>,
  ) {}
}
