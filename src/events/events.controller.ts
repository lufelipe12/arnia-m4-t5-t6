import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CurrentUserDto } from 'src/decorators/dto/current-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post(':id/participate')
  partipate(@Param('id') id: string, @CurrentUser() user: CurrentUserDto) {
    return this.eventsService.partipate(+id, user.sub);
  }

  @Post(':id/upload-photo')
  @UseInterceptors(
    FileInterceptor('photo', {
      limits: {
        fileSize: 1024 * 1024, // tamanho maximo
      },
      storage: diskStorage({
        destination: './uploads', // onde salvar
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          // validação de tipo
          return cb(null, false);
        }
        return cb(null, true);
      },
    }),
  )
  uploadPhoto(
    @Param('id') id: string,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.eventsService.uploadPhoto(+id, file);
  }

  @Get('/photo/:filename')
  getPhoto(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(filename, { root: './uploads' });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
