import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/Users';
import upload from '../config/upload';

interface RequestDTO {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new Error('Only authenticated users can change avatar');
    }

    if (user.avatar) {
      const useravatarFilePath = path.join(upload.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(useravatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(useravatarFilePath);
      }
    }
    user.avatar = avatarFilename;
    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
