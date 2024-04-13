import { getFileToBuffer } from './get-file-buffer';

export const getPhotoMock = async (): Promise<Express.Multer.File> => {
  const filename = __dirname + '/test.png';
  const { buffer, stream } = await getFileToBuffer(filename);

  return {
    destination: './uploads',
    fieldname: 'photo',
    filename: 'event-photo.jpg',
    originalname: 'event-photo.jpg',
    path: '/uploads',
    size: 1000000,
    buffer,
    stream,
    encoding: '7bit',
    mimetype: 'image/jpeg',
  };
};
