import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrailsController } from './trails.controller';
import { TrailsService } from './trails.service';
import { Trail } from './entities/trails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trail])],
  controllers: [TrailsController],
  providers: [TrailsService],
  exports: [TrailsService],
})
export class TrailsModule {}
