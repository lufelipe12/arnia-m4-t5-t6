import { ReadStream, createReadStream } from 'fs';

export const getFileFromBuffer = async (filename: string) => {
  const readStream = createReadStream(filename);

  const chunks = [];

  return new Promise<{ buffer: Buffer; stream: ReadStream }>(
    (resolve, reject) => {
      readStream.on('data', (chunk) => chunks.push(chunk));

      readStream.on('error', (err) => reject(err));

      readStream.on('close', () => {
        resolve({
          buffer: Buffer.concat(chunks),
          stream: readStream,
        });
      });
    },
  );
};
