import { extname } from 'path';

export const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() =>
      Math.random()
        .toString(36)
        .substring(2, 16 + 2),
    )
    .join('');
  callback(null, `${randomName}${fileExtName}`);
};
