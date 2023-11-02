import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrailUpdatesService } from './trailupdates.service';
import { TrailUpdate } from './entities/trailupdates.entity';
import { TrailUpdatesController } from './trailupdates.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TrailUpdate])],
  controllers: [TrailUpdatesController],
  providers: [TrailUpdatesService],
  exports: [TrailUpdatesService],
})
export class TrailUpdatesModule {}
