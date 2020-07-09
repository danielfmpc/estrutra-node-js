import { getRepository } from 'typeorm';
import User from '../models/Users';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  /**
   * execute
   */
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);
    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });
    if (checkUserExists) {
      throw new Error('Email addres already used.');
    }

    const user = usersRepository.create({
      name,
      email,
      password,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;