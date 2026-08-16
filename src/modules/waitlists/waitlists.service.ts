import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Waitlist } from '../../shared/entities/waitlist.entity';

@Injectable()
export class WaitlistsService {
  constructor(
    @InjectRepository(Waitlist)
    private readonly repo: Repository<Waitlist>,
  ) {}
}
