import { join } from 'path';

import { getFileFromBuffer } from './get-file-from-buffer';

export const getFileMock = async () => {
  const { buffer, stream } = await getFileFromBuffer(
    join(__dirname, 'monza.jpeg'),
  );

  const photo = {
    fieldname: 'monza-novo',
    originalname: 'monza-novo.jpg',
    encoding: 'encoding',
    mimetype: 'mimetype',
    size: 120,
    stream,
    destination: './upload',
    filename: 'monza-novo-123.jpg',
    path: './upload',
    buffer,
  };

  return photo;
};
