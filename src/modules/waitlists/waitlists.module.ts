import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Waitlist } from '../../shared/entities/waitlist.entity';
import { WaitlistsController } from './waitlists.controller';
import { WaitlistsService } from './waitlists.service';

@Module({
  imports: [TypeOrmModule.forFeature([Waitlist])],
  controllers: [WaitlistsController],
  providers: [WaitlistsService],
  exports: [WaitlistsService],
})
export class WaitlistsModule {}
