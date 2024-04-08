import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { EventPhoto } from './entities/event-photo.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,

    @InjectRepository(EventPhoto)
    private eventPhotoRepository: Repository<EventPhoto>,

    private configService: ConfigService,

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

  async uploadPhoto(eventId: number, file: Express.Multer.File) {
    try {
      // buscar o evento
      const event = await this.findOne(eventId);

      // criar a imagem
      const photo = this.eventPhotoRepository.create();

      const imageLink = `${this.configService.get('BASE_URL')}/events/photo/${file.filename}`;

      photo.imageLink = imageLink;

      // fazer o relacionamento
      photo.event = event;

      // salvar
      await this.eventPhotoRepository.save(photo);

      return photo;
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
    return this.eventRepository.find();
  }

  async findOne(id: number) {
    try {
      const event = await this.eventRepository.findOneOrFail({
        where: {
          id,
        },
        relations: {
          participants: true,
          photos: true,
        },
      });

      return event;
    } catch (error) {
      throw new NotFoundException('Event not found');
    }
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    try {
      const { affected } = await this.eventRepository.update(
        id,
        updateEventDto,
      );

      if (affected === 0) {
        throw new NotFoundException('Event not found');
      }

      return this.findOne(id);
    } catch (error) {
      throw new HttpException(
        {
          message: error?.message ?? 'Internal Server Error',
        },
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
