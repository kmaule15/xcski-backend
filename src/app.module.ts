import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './Authentication/auth.module';
import { CommentModule } from './Community/Comments/comment.module';
import { PassportModule } from '@nestjs/passport';
import { TrailsModule } from './trails/trails.module';
import { EmailModule } from './email/email.module';
import { TrailUpdatesModule } from './trailupdates/trailupdates.module';
import { TrailRatingsModule } from './ratings/trailratings.module';
import { PostModule } from './Community/Posts/post.module';
import { EventsModule } from './Community/events/event.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CommentModule,
    TrailsModule,
    EmailModule,
    TrailUpdatesModule,
    PostModule,
    EventsModule,
    TrailRatingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
