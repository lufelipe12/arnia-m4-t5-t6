import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event } from './entities/event.entity';
import { EventPhoto } from './entities/event-photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventPhoto]), UsersModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
