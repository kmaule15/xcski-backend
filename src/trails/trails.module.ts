import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrailsService } from './trails.service';
import { Trail } from './entities/trails.entity';
import { TrailsController } from './trails.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Trail])],
  controllers: [TrailsController],
  providers: [TrailsService],
  exports: [TrailsService, TypeOrmModule],
})
export class TrailsModule {}
