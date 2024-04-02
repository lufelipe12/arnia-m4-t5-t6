import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,

    private userService: UsersService,
  ) {}

  async create(createEventDto: CreateEventDto) {
    try {
      const event = this.eventRepository.create(createEventDto);
      await this.eventRepository.save(event);

      return event;
    } catch (error) {
      throw new HttpException(
        {
          message: error?.message ?? 'Bad Request',
        },
        error?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async partipate(eventId: number, userId: number) {
    try {
      // verificar se o evento existe
      const event = await this.findOne(eventId);

      // verificar se o usuario existe
      const user = await this.userService.findOne(userId);

      // verificar se o usuario já está no evento
      if (
        event.participants.find((participant) => participant.id === user.id)
      ) {
        throw new ConflictException('Already joined the event');
      }

      // inserir o usuario no evento
      event.participants.push(user);
      this.eventRepository.save(event);

      return event;
    } catch (error) {
      throw new HttpException(
        {
          message: error?.message ?? 'Bad Request',
        },
        error?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll() {
    return `This action returns all events`;
  }

  async findOne(id: number) {
    try {
      const event = await this.eventRepository.findOneOrFail({
        where: {
          id,
        },
        relations: {
          participants: true,
        },
      });

      return event;
    } catch (error) {
      throw new NotFoundException('Event not found');
    }
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
